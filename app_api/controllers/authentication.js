const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const PasswordToken = require('../models/resetPasswordToken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const BCRYPT_SALT = process.env.BCRYPT_SALT;

const sendEmail = require('../utils/sendEmail');

const register = async(req, res) => {

    try{
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.role = req.body.role;
        user.study_deck = [];
        user.quiz_results = [];
        user.setPassword(req.body.password);
    
        const token = user.generateJwt();
        
        await user.save();
        res.status(200).json({token});
    }catch(err){
        res.status(400).json(err);
    }
};

const login = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            return res.status(404).json(err);
        };
        if(user){
            const token = user.generateJwt();
            res.status(200).json({token});
        }else{
            res.status(401).json(info);
        }
    })(req, res);
};

const deleteUserAccount = async(req, res) => {
    await User.findOneAndDelete({email: req.body.user.email})
    .then( response => {
        res.status(200).send(response)
    })
    .catch(err => {
        res.status(404).send(err);
    })
}

const getUser = async(req, res, callback) => {
    if(req.auth && req.auth.email){
        try{
            const user = await User.findOne({email: req.auth.email}).exec();

            if(!user){
                return res.status(404).json({message: 'User not found'});
            }

            callback(req, res, user.name);
        }catch(err){
            return res.status(404).json({message: 'Something went wrong. Try again.'});
        }
    }
};

const generateNewJWT = async(req, res) => {
    console.log('params:', req.params)
    await User.findOne({
       'email': req.params.email}).exec()
    .then(user => {
        if(user){
            const token = user.generateJwt();
            res.status(200).json({token});
        }
    })
    .catch(err => {
        return res.status(401).send(err)
    })
}

const requestPasswordReset = async(req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(404).json({msg: "Email does not exist"});     
    };

    let token = await PasswordToken.findOne({userId: user._id});
    if(token){
        await token.deleteOne();
    };

    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(BCRYPT_SALT));
    
    await new PasswordToken({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    }).save()

    let client_url = process.env.CLIENT_URL;
    if(process.env.NODE_ENV === 'development'){
        client_url = process.env.CLIENT_URL_DEV;
    };

    const link = `${client_url}/reset-password?token=${resetToken}&id=${user._id}`;
    sendEmail(
        user.email,
        "Password Reset Request",
        {name: user.name, link: link},
        "./emailTemplates/requestPasswordReset.hbs"
    );
    return res.status(200).json({userId: user._id, token: resetToken});
};

const resetPassword = async(req, res) => {
    let userId = req.body.userId;
    let token = req.body.token;
    let password = req.body.password;

    let passwordResetToken = await PasswordToken.findOne({userId: userId});

    if(!passwordResetToken){
        return res.status(400).json({msg: "Invalid or expired reset token"});
    };

    const isValid = await bcrypt.compare(token, passwordResetToken.token);

    if(!isValid){
        return res.status(400).json({msg: "Invalid or expired reset token"});
    };

    const user = await User.findById({_id: userId});

    const hash = crypto.pbkdf2Sync(password, user.salt,
        1000, 64, 'sha512').toString('hex');

    await User.updateOne(
        {_id: userId},
        {$set: {hash: hash}},
        {new: true}
    );
    
    sendEmail(
        user.email,
        "Password Reset Successfully",
        {name: user.name},
        "./emailTemplates/passwordReset.hbs"
    );

    await passwordResetToken.deleteOne();

    return res.status(200).json({msg: "Password reset was successful"});
}

module.exports = {
    login,
    register,
    deleteUserAccount,
    generateNewJWT,
    requestPasswordReset,
    resetPassword,
    getUser
}
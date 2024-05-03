const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = async(req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        return res.status(400).json({message: 'All fields required.'})
    };

    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    const token = user.generateJwt();

    try{
        const newUser = await user.save();
        res.status(200).json({token});
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }
};

const login = (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({message: 'All fields required.'});
    }
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

module.exports = {
    login,
    register,
    getUser
}
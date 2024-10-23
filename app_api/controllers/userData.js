const User = require('../models/users');
const auth = require('./authentication');

const addQuizResult = async(req, res) => {
    await User.findOneAndUpdate({email: req.body.user.email}, {$push: {quiz_results: req.body.result}})
    .then(user => {
       return res.status(200).send(user.quiz_results)
    })
    .catch(err => {
        return res.status(404).send(err)
    })

};


module.exports = {
    addQuizResult
}
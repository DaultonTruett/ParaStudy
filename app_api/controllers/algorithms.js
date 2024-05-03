const mongoose = require('mongoose');
const Algorithm = mongoose.model('algorithms');
const auth = require('../controllers/authentication');

const getAlgorithms = async(req, res) => {
    const getAlgorithms = await Algorithm.find({}).exec();

    if(!getAlgorithms){
        return res.status(404).json({message: `No algorithms found found with category: ${req.body.category}`});
    };

    return res.status(200).json(getAlgorithms);
};


const addAlgorithm = async(req, res) => {
    await auth.getUser(req, res, (req, res) => {
        Algorithm.create({
            category: req.body.category,
            name: req.body.name,
            algorithm: req.body.algorithm
        })
        .then(algorithm => {
            if(!algorithm){
                return res.status(404).json({message: 'Not found'});
            };
        
            res.send(algorithm);
        })
        .catch(err => {
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: 'Algorithm not created'
                });
            }
            return res.status(500).json(err);
        });
    })
};



module.exports = {
    getAlgorithms,
    addAlgorithm
}
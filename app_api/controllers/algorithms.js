const Algorithm = require('../models/algorithms');

const getAlgorithms = async(req, res) => {
    const getAlgorithms = await Algorithm.find({}).exec();

    if(!getAlgorithms){
        return res.status(404).json({message: `No meds found with category: ${req.body.category}`});
    };

    return res.status(200).json(getAlgorithms);
};


const addAlgorithm = async(req, res) => {
    const addAlgorithm = await Algorithm.create({
        category: req.body.category,
        name: req.body.name,
        algorithm: req.body.algorithm
    })
    .catch(err => {
        return res.status(500).json(err);
    });

    if(!addAlgorithm){
        return res.status(404).json({message: 'Not found'});
    };

    res.send(addAlgorithm);
};


module.exports = {
    getAlgorithms,
    addAlgorithm
}
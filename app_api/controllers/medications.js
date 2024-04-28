const mongoose = require('mongoose');

const Med = require('../models/medications');

const getMedsByCategory = async(req, res) => {
    const getMeds = await Med.find({
        'category': req.body.category
    })
    .exec();

    if(!getMeds){
        return res.status(404).json({message: `No meds found with category: ${req.body.category}`});
    };

    return res.status(200).json(getMeds);
}

const addMedication = async(req, res) => {
    const addMed = await Med.create({
        category: req.body.category,
        name: req.body.name,
        age: req.body.age,
        dose: req.body.dose,
        indications: req.body.indications,
        contraindications: req.body.contraindications,
        sideEffects: req.body.sideEffects,
        notes: req.body.notes
    }).catch(err => {
        return res.status(500).json(err);
    })
    
    if(!addMed){
        return res.status(404).json({message: 'Not found'});
    }

    res.send(addMed);
} 


module.exports = {
    addMedication,
    getMedsByCategory
}
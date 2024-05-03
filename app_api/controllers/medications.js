const Med = require('../models/medications');
const auth = require('../controllers/authentication');

const getMedsByCategory = async(req, res) => {
    const getMeds = await Med.find({
        'category': req.params.category
    })
    .exec();

    if(!getMeds){
        return res.status(404).json({message: `No meds found with category: ${req.body.category}`});
    };

    return res.status(200).json(getMeds);
}

const addMedication = async(req, res) => {
    await auth.getUser(req, res, (req, res) => {
        Med.create({
            category: req.body.category,
            name: req.body.name,
            age: req.body.age,
            dose: req.body.dose,
            indications: req.body.indications,
            contraindications: req.body.contraindications,
            sideEffects: req.body.sideEffects,
            actions: req.body.actions,
            notes: req.body.notes
    }).then(med => {
        if(!med){
            return res.status(404).json({message: 'Not found'});
        }
        res.send(med);
    }).catch(err => {
        return res.status(500).json(err);
    })
    });
};


module.exports = {
    addMedication,
    getMedsByCategory
}
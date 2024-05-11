const Med = require('../models/medications');
const auth = require('../controllers/authentication');

const getMedications = async(req, res) => {
    const getMeds = await Med.find({}).exec();

    if(!getMeds){
        return res.status(404).json({message: 'No medications found.'})
    };

    return res.status(200).json(getMeds);
};

const getMedicationById = async(req, res) => {
    const getMed = await Med.find({
        '_id': req.params._id
    }).exec();

    if(!getMed){
        return res.status(404).json({message: 'Medication not found'});
    };

    return res.status(200).json(getMed);
};

const getMedsByCategory = async(req, res) => {
    const getMeds = await Med.find({
        'category': req.params.category
    })
    .exec();

    if(!getMeds){
        return res.status(404).json({message: `No meds found with category: ${req.body.category}`});
    };

    return res.status(200).json(getMeds);
};

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

const updateMedication = async(req, res) => {
    await auth.getUser(req, res, (req, res) => {
        Med.findOneAndUpdate(
            {'_id': req.body._id},{
                category: req.body.category,
                name: req.body.name,
                age: req.body.age,
                dose: req.body.dose,
                indications: req.body.indications,
                contraindications: req.body.contraindications,
                sideEffects: req.body.sideEffects,
                actions: req.body.actions,
                notes: req.body.notes
            }, {new: true})
        .then(med => {
            if(!med){
                return res.status(404).send({message: 'Not found'});
            }
            res.send(med);
        }).catch(err => {
            return res.status(500).json(err);
        })
    });
};

const deleteMedication = async(req, res) => {
    await auth.getUser(req, res, (req, res) => {
        Med.findByIdAndDelete(
            {'_id': req.params._id})
            .then(res.send({message: 'OK'}))
            .catch(err => {
                if(err.kind === 'ObjectId'){
                    return res
                        .status(404)
                        .send({message: "Medication not found with id: " + req.params._id});
                }
                return res.status(500).json(err);
            });
    });
};



module.exports = {
    getMedications,
    getMedicationById,
    getMedsByCategory,
    addMedication,
    updateMedication,
    deleteMedication
}
const Med = require('../models/medications');
const auth = require('../controllers/authentication');

const getMedications = async(req, res) => {
    let sortedMedications = {name: 1};

    const getMeds = await Med.find({}).sort(sortedMedications).exec();

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
        const med = new Med({
            classification: req.body.classification,
            name: req.body.name,
            age: req.body.age,
            indications_dose: [{
                indication: req.body.indication,
                dose_and_route: [{
                    dose: req.body.dose,
                    mu: req.body.mu,
                    route: req.body.route
                }]
            }],
            contraindications: req.body.contraindications,
            side_effects: req.body.side_effects,
            actions: req.body.actions,
            notes: req.body.notes,
        });

        try{
            med.save()
            res.status(200).send(med)
        }catch(error){
            res.status(400).send(error)
        }
    });
};

/*
    await auth.getUser(req, res, (req, res) => {
        Med.create({
            category: req.body.category,
            name: req.body.name,
            age: req.body.age,
            indications_dose: [[req.body.indications, req.body.dose]],
            mu: req.body.mu,
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
*/

const updateMedication = async(req, res) => {
    await auth.getUser(req, res, (req, res) => {
        Med.findOneAndUpdate(
            {'_id': req.body._id},
            {
                category: req.body.category,
                name: req.body.name,
                age: req.body.age,
                indications_dose:{},
                contraindications: req.body.contraindications,
                sideEffects: req.body.sideEffects,
                actions: req.body.actions,
                notes: req.body.notes
            },
            Med.indications_dose.set(req.body.indications, req.body.dose),
            {new: true})
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

const addMedicationIndication = async(req, res) => {
    await auth.getUser(req, res, (req, res) => {
       Med.updateOne(
            {_id: req.body.medication_id},
            {$push: {indications_dose: {
                indication: req.body.indication,
                dose_and_route: [{
                    dose: req.body.dose,
                    mu: req.body.mu,
                    route: req.body.route
                }]
            }}})
        .then(med => {
            if(!med){
                return res.status(404).send({message: 'Not found'});
            };
            return res.status(200).send(med);
        }).catch(err => {
            return res.status(500).json(err);
        });
    });
};

const updateMedicationIndication = async(req, res) => {
    await auth.getUser(req, res, (req, res) => {
        Med.updateOne({
            _id: req.body.medication_id,
        },
        {$set: {
            "indications_dose.$[id].indication": req.body.indication

        }},
        {
            "arrayFilters": [
                {
                    "id._id": req.body.indication_id
                }
            ]
        },
        {new: true}
    )
    .then(med => {
        if(!med){
            return res.status(404).send({message: "Not found"});
        };
        return res.status(200).send(med);
    }).catch(err => {
        return res.status(500).json(err);
    })
    });
};

const deleteMedicationIndication = async(req, res) => {
    await auth.getUser(req, res, (req, res) => {
        Med.updateOne({
            _id: req.body.medication_id,
            "indications_dose._id": req.body.indication_id
        },
        {$pull: {
            indications_dose: {
                _id: req.body.indication_id
            }
        }}
    )
    .then(med => {
        if(!med){
            return res.status(404).send({message: 'Not found'});
        };
        return res.status(200).send(med);
    })
    .catch(err => {
        return res.status(500).json(err);
    })
    });
};

const addMedicationDose = async(req, res) => {
    await auth.getUser(req, res, (req, res) => {
        Med.updateOne({
            _id: req.body.medication_id,
            "indications_dose._id": req.body.indication_id
        },
        {$push: {
            "indications_dose.$[id].dose_and_route":
                {
                    "dose": req.body.dose,
                    "mu": req.body.mu,
                    "route": req.body.route
                }
            }
        },
        {
            "arrayFilters": [
                {"id._id": req.body.indication_id}
            ]
        })
        .then(med => {
            if(!med){
                return res.status(404).send({message: 'Not found'});
            };
            console.log(med)
            return res.status(200).send(med);
        }).catch(err => {
            return res.status(500).json(err)
        });
    });
};

const updateMedicationDose = async(req, res) => {
    await auth.getUser(req, res, (req, res) => {
        Med.updateOne({
            _id: req.body.medication_id,
            "indications_dose": {
                $elemMatch: {
                    _id: req.body.indication_id,
                    "dose_and_route._id": req.body.dose_id
                }
            }
        },
        {$set: {
            "indications_dose.$[indicationID].dose_and_route.$[doseID]": {
                "dose": req.body.dose,
                "mu": req.body.mu,
                "route": req.body.route
            }
        }
        },
        {
            "arrayFilters": [
                {"indicationID._id": req.body.indication_id},
                {"doseID._id": req.body.dose_id}
            ]
        },
        {new: true})
        .then(med => {
            if(!med){
                return res.status(404).send({message: "Not found"});
            };
            return res.status(200).send(med);
        }).catch(err => {
            return res.status(500).json(err);
        })
    });
};

const deleteMedicationDose = async(req, res) => {
    await auth.getUser(req, res, (req, res) => {
        Med.updateOne({
            _id: req.body.medication_id,
            "indications_dose": {
                $elemMatch: {
                    _id: req.body.indication_id,
                    "dose_and_route._id": req.body.dose_id
                }
            }
        },
        {$pull: {
            "indications_dose.$[id].dose_and_route":
            {
                _id: req.body.dose_id
            }
        }
    },
    {
        "arrayFilters": [
            {"id._id": req.body.indication_id}
        ]
    })
    .then(med => {
        if(!med){
            return res.status(404).send({message: 'Not found'});
        };
        console.log(med)
        return res.status(200).send(med);
    }).catch(err => {
        return res.status(500).json(err)
    });
    });
};


module.exports = {
    getMedications,
    getMedicationById,
    getMedsByCategory,
    addMedication,
    updateMedication,
    deleteMedication,
    addMedicationIndication,
    updateMedicationIndication,
    deleteMedicationIndication,
    addMedicationDose,
    updateMedicationDose,
    deleteMedicationDose,
}
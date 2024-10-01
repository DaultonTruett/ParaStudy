const mongoose = require('mongoose');


const medicationSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        index: true
    },
    age: {
        type: String,
        required: true,
        index: true
    },
    indications_dose: {
        type: Map,
        required: true
    },
    mu: {
        type: String,
        required: true
    },
    contraindications: {
        type: String,
        required: true
    },
    sideEffects: {
        type: String,
        required: true
    },
    actions: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    }
});

const Medication = mongoose.model('medications', medicationSchema);

module.exports = Medication;
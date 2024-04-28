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
    dose: {
        type: String,
        required: true,
        
    },
    indications: {
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
    notes: String

});

const Medication = mongoose.model('medications', medicationSchema);

module.exports = Medication;
const mongoose = require('mongoose');

const doseAndRouteSchema = new mongoose.Schema({
    dose: {
        type: String,
        required: true
    },
    mu: {
        type: String,
        required: true
    },
    route: {
        type: String,
        required: true
    }
});


const indicationSchema = new mongoose.Schema({
    indication: {
        type: String,
        required: true
    },
    dose_and_route: [doseAndRouteSchema]
})


const medicationSchema = new mongoose.Schema({
    classification: {
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
    indications_dose: [indicationSchema],

    contraindications: {
        type: String,
        required: true
    },
    side_effects: {
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
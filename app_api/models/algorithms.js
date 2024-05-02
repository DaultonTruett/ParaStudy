const mongoose = require('mongoose');

/*
const stepsSchema = new mongoose.Schema({
    sceneSizeUp: 
})
*/

const algorithmSchema = new mongoose.Schema({
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
    algorithm: {
        type: String,
        required: true
    }
});

const Algorithm = mongoose.model('algorithms', algorithmSchema);

module.exports = Algorithm;
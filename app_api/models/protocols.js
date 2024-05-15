const mongoose = require('mongoose');

/*
const stepsSchema = new mongoose.Schema({
    sceneSizeUp: 
})
*/

const protocolSchema = new mongoose.Schema({
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
    protocol: {
        type: String,
        required: true
    }
});

const Protocol = mongoose.model('protocols', protocolSchema);

module.exports = Protocol;
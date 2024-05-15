const mongoose = require('mongoose');
const Protocol = mongoose.model('protocols');
const auth = require('./authentication');

const getProtocols = async(req, res) => {
    const getProtocols = await Protocol.find({}).exec();

    if(!getProtocols){
        return res.status(404).json({message: `No algorithms found found with category: ${req.body.category}`});
    };

    return res.status(200).json(getProtocols);
};

const getProtocolsByCategory = async(req, res) => {
    const getProtocols = await Protocol.find({"category": req.params.category}).exec();

    if(!getProtocols){
        return res.status(404).json({message: `No algorithms found found with category: ${req.body.category}`});
    };

    return res.status(200).json(getProtocols);
};


const addProtocol = async(req, res) => {
    await auth.getUser(req, res, (req, res) => {
        Protocol.create({
            category: req.body.category,
            name: req.body.name,
            protocol: req.body.protocol
        })
        .then(protocol => {
            if(!protocol){
                return res.status(404).json({message: 'Not found'});
            };
        
            res.send(protocol);
        })
        .catch(err => {
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: 'protocol not created'
                });
            }
            return res.status(500).json(err);
        });
    })
};



module.exports = {
    getProtocols,
    getProtocolsByCategory,
    addProtocol
}
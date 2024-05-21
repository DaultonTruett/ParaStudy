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

const getProtocolsById = async(req, res) => {
    const getProtocol = await Protocol.find({'_id': req.params._id}).exec();

    if(!getProtocol){
        return res.status(400).json({message: 'Protocol not found.'})
    };

    return res.status(200).json(getProtocol);
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

const updateProtocol = async(req, res) =>{
    await auth.getUser(req, res, (req, res) => {
        Protocol.findOneAndUpdate(
            {'_id': req.body._id},
            {
                category: req.body.category,
                name: req.body.name,
                protocol: req.body.protocol
            }, {new: true}
        ).then(protocol => {
            if(!protocol){
                return res.status(404).send({message: "Not found."});
            }
            res.send(protocol)
        }).catch(err => {
            return res.status(500).json(err);
        });
    });
};

const deleteProtocol = async(req, res) => {
    await auth.getUser(req, res, (req, res) => {
        Protocol.findByIdAndDelete(
            {'_id': req.params._id})
            .then(res.send({message: 'OK'}))
            .catch(err => {
                if(err.kind === 'ObjectId'){
                    return res.status(404).send({message: "Protocol not found with id: " + req.params._id})
                };
                return res.status(500).json(err);
            });
    });
};



module.exports = {
    getProtocols,
    getProtocolsByCategory,
    getProtocolsById,
    addProtocol,
    updateProtocol,
    deleteProtocol
}
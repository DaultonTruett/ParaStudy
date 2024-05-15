
const endpoint = 'http://localhost:3000/api';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

const cardiacProtocols = async(req, res) => {
    await fetch(`${endpoint}/cardiac/protocols/cardiac`, options)
    .then(res => res.json())
    .then(protocol => {

        let msg = null;

        if( !(protocol instanceof Array) ){
            msg = 'API error';
            protocol = [];
        }else{
            if(!protocol.length){
                msg = 'No protocols found.'
            };
        };

        res.render('protocols', {
            title: 'Protocols',
            pageName: "Cardiac Protocols",
            protocol
        })
    })
    .catch(err => res.status(500).send(err.message));
};

const medicalProtocols = async(req, res) => {
    await fetch(`${endpoint}/medical/protocols/medical`, options)
    .then(res => res.json())
    .then(protocol => {
        let msg = null;

        if( !(protocol instanceof Array)) {
            msg = 'API error';
            protocol = [];
        }else{
            if(!protocol.length){
                msg = 'No protocols found'
            };
        }

        res.render('protocols', {
            title: 'Protocols',
            pageName: 'Medical Protocols',
            protocol
        })
    })
    .catch(err => res.status(500).send(err.message));
};

const traumaProtocols = async(req, res) => {
    await fetch(`${endpoint}/trauma/protocols/trauma`, options)
    .then(res => res.json())
    .then(protocol => {
        let msg = null;

        if( !(protocol instanceof Array)) {
            msg = 'API error';
            protocol = [];
        }else{
            if(!protocol.length){
                msg = 'No protocols found'
            };
        }

        res.render('protocols', {
            title: 'Protocols',
            pageName: 'Trauma Protocols',
            protocol
        })
    })
    .catch(err => res.status(500).send(err.message));
};

module.exports = {
    cardiacProtocols,
    medicalProtocols,
    traumaProtocols
};
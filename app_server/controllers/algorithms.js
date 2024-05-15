
const endpoint = 'http://localhost:3000/api';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

const cardiacAlgorithms = async(req, res) => {
    await fetch(`${endpoint}/cardiac/algorithms/cardiac`, options)
    .then(res => res.json())
    .then(protocol => {

        let msg = null;

        if( !(protocol instanceof Array) ){
            msg = 'API error';
            protocol = [];
        }else{
            if(!protocol.length){
                msg = 'No algorithms found.'
            };
        };

        res.render('algorithms', {
            title: 'Algorithms',
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

        res.render('algorithms', {
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

        res.render('algorithms', {
            title: 'Protocols',
            pageName: 'Trauma Protocols',
            protocol
        })
    })
    .catch(err => res.status(500).send(err.message));
};

module.exports = {
    cardiacAlgorithms,
    medicalProtocols,
    traumaProtocols
};
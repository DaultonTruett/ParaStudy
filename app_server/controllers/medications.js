
const endpoint = 'http://localhost:3000/api';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

const allMedications = async(req, res) => {
    await fetch(`${endpoint}/medications`, options)
    .then(res => res.json())
    .then(medications => {
        let msg = null;
        if( !(medications instanceof Array)){
            msg = 'API error';
            medications = [];
        }else{
            if(!medications.length){
                msg = 'No medications found.'
            };
        }

        res.render('medications', {
            title: 'Medications',
            pageName: 'Medications',
            medications
        });
    })
    .catch(err => res.status(500).send(err.message));
}

const cardiacMedications = async(req, res) => {
    await fetch(`${endpoint}/cardiac/medications/cardiac`, options)
    .then(res => res.json())
    .then(medications => {

        let msg = null;

        if( !(medications instanceof Array)){
            msg = 'API error';
            medications = [];
        }else{
            if(!medications.length){
                msg = 'No medications found.'
            };
        }

        console.log(medications);

        res.render('medications', {
                title: 'Medications',
                pageName: 'Cardiac Medications',
                medications
        });
    })
    .catch(err => res.status(500).send(err.message));
};

const medicalMedications =  async(req, res) => {
    await fetch(`${endpoint}/medical/medications/medical`, options)
    .then(res => res.json())
    .then(medications => {
        let msg = null;

        if( !(medications instanceof Array)){
            meg = 'API Error';
            medications = [];
        }else{
            if(!medications.length){
                msg = 'No medical medications found';
            };
        }

        res.render('medications', {
            title: 'Medications',
            pageName: 'Medical Medications',
            medications
        })
    })
};

const traumaMedications =  async(req, res) => {
    await fetch(`${endpoint}/trauma/medications/trauma`, options)
    .then(res => res.json())
    .then(medications => {
        let msg = null;

        if( !(medications instanceof Array)){
            meg = 'API Error';
            medications = [];
        }else{
            if(!medications.length){
                msg = 'No medical medications found';
            };
        }

        res.render('medications', {
            title: 'Medications',
            pageName: 'Trauma Medications',
            medications
        })
    })
}

module.exports = {
    allMedications,
    cardiacMedications,
    medicalMedications,
    traumaMedications
}
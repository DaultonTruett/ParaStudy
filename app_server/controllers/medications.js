
const endpoint = 'http://localhost:3000/api/cardiac/medications/cardiac';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

const medications = async(req, res) => {
    await fetch(endpoint, options)
    .then(res => res.json())
    .then(json => {

        let msg = null;

        if( !(json instanceof Array)){
            msg = 'API error';
            json = [];
        }else{
            if(!json.length){
                msg = 'No medications found.'
            };
        }

        console.log(json);

        res.render('medications', {
            title: 'Medications',
            pageName: 'Cardiac Medications',
            json
        });
    })
    .catch(err => res.status(500).send(err.message));

};

module.exports = medications;

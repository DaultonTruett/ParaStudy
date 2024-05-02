
const endpoint = 'http://localhost:3000/api/cardiac/algorithms';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

const algorithms = async(req, res) => {
    await fetch(endpoint, options)
    .then(res => res.json())
    .then(algorithm => {

        let msg = null;

        if( !(algorithm instanceof Array)){
            msg = 'API error';
            algorithm = [];
        }else{
            if(!algorithm.length){
                msg = 'No medications found.'
            };
        };

        res.render('algorithms', {
            title: 'Algorithms',
            pageName: "Treatment Algorithms",
            algorithm
        })
    })
    .catch(err => res.status(500).send(err.message));

};

module.exports = algorithms;
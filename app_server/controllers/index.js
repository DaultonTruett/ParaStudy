/*
quickInfo = {
    name: "Vital Signs: Normal Ranges",
    vitals: [{
        age: 'Adult', 
        bp: "120/80", 
        HR: "60 - 100", 
        rr: "12 - 20",
        spo2: "94% - 100%",
        capnography: "35 - 45",
        ph: "7.35 - 7.45",
        bgl: "90 - 130 mm/dL"
    }, {
        age: "Pediatric",
        bp: "",
        HR: "",
        rr: "",
        bgl: "",
    }]
}
*/

const index = (req, res) => {
    res.render('index', {
        title: 'ParaStudy',
        pageName: 'Home',
    })
};


module.exports = index;
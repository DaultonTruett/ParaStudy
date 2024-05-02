
quickLinks = [
    {
        name: "Cardiac Arrest",
        image: ""
    },
    {
        name: "Vital Signs: Normal ranges",
        image: ""
    },
    {
        name: "Patient Assesment: General",
        image: ""
    }
];


const index = (req, res) => {
    res.render('index', {
        title: 'ParaStudy',
        pageName: 'Home',
        quickLinks
    })
};


module.exports = index;
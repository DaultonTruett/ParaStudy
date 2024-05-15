
traumaTopics = [
    {
    name: "Medications",
    image: 'med_2.png',
    link: "/trauma/medications"
},
{
    name: "Trauma Protocols",
    image: 'medical.png',
    link: '/trauma/protocols'
}
]


const trauma = (req, res) => {
    res.render('trauma', {
        title: 'Trauma',
        pageName: 'TRAUMA',
        traumaTopics
    })
};

module.exports = trauma;
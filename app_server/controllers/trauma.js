
traumaTopics = [
    {
    name: "Medications",
    image: 'med_2.png',
    link: "/trauma/medications"
},
{
    name: "Injury Management",
    image: 'medical.png',
    link: '/trauma/assessments'
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
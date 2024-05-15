
medicalTopics = [
    {
    name: "Medications",
    image: 'vial_2.png',
    link: "/medical/medications"
},
{
    name: "Common Conditions",
    image: 'stethoscope.png',
    link: '/medical/conditions'
}
]


const medical = (req, res) => {
    res.render('medical', {
        title: 'Medical',
        pageName: 'MEDICAL',
        medicalTopics
    })
};

module.exports = medical;

medicalTopics = [
    {
    name: "Medications",
    image: 'vial_2.png',
    link: "/medical/medications"
},
{
    name: "Medical Protocols",
    image: 'stethoscope.png',
    link: '/medical/algorithms'
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
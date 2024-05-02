
topics = [
    {
        name: "Medications",
        image: 'med.png',
        link: "/cardiac/medications"
    },
    {
        name: "Treatment Algorithms",
        image: 'qrs.png',
        link: '/cardiac/algorithms'
    },
    {
        name: "Anatomy & Physiology",
        image: "heart.png",
        link: '/cardiac/anatomy'
    }
]

const cardiac = (req, res) => {
    res.render('cardiac', {
        title: "Cardiac",
        pageName: 'CARDIAC',
        topics
    });
};


module.exports = cardiac;
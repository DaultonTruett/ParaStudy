
cardiacTopics = [
    {
        name: "Medications",
        image: 'med_5.png',
        link: "/cardiac/medications"
    },
    {
        name: "Treatment Algorithms",
        image: 'qrs.png',
        link: '/cardiac/algorithms'
    },
    /*{
        name: "Anatomy & Physiology",
        image: "heart.png",
        link: '/cardiac/anatomy'
    }*/
]

const cardiac = (req, res) => {
    res.render('cardiac', {
        title: "Cardiac",
        pageName: 'CARDIAC',
        cardiacTopics
    });
};


module.exports = cardiac;
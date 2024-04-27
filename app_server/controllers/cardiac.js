
conditions = [
    {
        name: "SVT",
        presents: "HR > 100 bpm"
    },
    {
        name: "Bradycardia",
        presents: "HR < 60 bpm"
    }
]

const cardiac = (req, res) => {
    res.render('cardiac', {
        title: "Cardiac",
        pageName: 'CARDIAC',
        conditions
    });
};


module.exports = cardiac;
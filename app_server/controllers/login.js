


const login = (req, res) => {
    res.render('login', {
    title: 'Login',
    pageName: 'Login',
    })
}



module.exports = { 
    login
}
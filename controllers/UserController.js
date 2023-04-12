const getHome = (req, res) => {
    res.render('index')
}
const getRedirectProfile = (req, res) => {
    res.redirect('/api/v1/signin')
}

const getProfile = (req, res) => {
    res.render('profile', {
        id: req.params.id,
    })
}

const getSignUp = (req, res) => {
    res.render('signup')
}

const getSignIn = (req, res) => {
    res.render('signin')
}

const getLogout = (req, res) => {
    res.redirect('/api/v1')
}

module.exports = {
    getHome,
    getRedirectProfile,
    getProfile,
    getSignIn,
    getSignUp,
    getLogout,
}

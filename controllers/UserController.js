const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')

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

// Cette fonction est exécutée lorsqu'un utilisateur soumet le formulaire d'inscription.
// Elle récupère l'email et le mot de passe, crée un nouvel utilisateur avec l'email récupéré,
// hash le mot de passe en utilisant bcrypt, enregistre l'utilisateur en base de données,
// puis redirige l'utilisateur vers la page de connexion.
const postSignUp = (req, res) => {
    const { email, password } = req.body

    const newUser = new UserModel({
        email,
    })

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err // Si une erreur survient lors de la création du hash, on la lance avec throw err.
        newUser.password = hash // On stocke le hash du mot de passe dans l'objet newUser, qui représente l'utilisateur à enregistrer.
        newUser.save()
        res.redirect('/api/v1/signin')
    })
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
    postSignUp,
}

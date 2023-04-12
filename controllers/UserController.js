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
const postSignUp = async (req, res) => {
    const { email, password } = req.body

    const checkUser = await UserModel.findOne({ email }) // Il faut utiliser `findOne` plutôt que `find`, car `find` renvoie un tableau et non un objet unique.

    console.log({
        checkUser,
        email,
    })

    // On vérifie si l'objet checkUser existe
    if (checkUser) {
        res.render('signup', {
            response: 'Cet email existe déjà',
        })
    } else {
        const newUser = new UserModel({
            email,
        })
        const hash = await bcrypt.hash(password, 10) // On utilise `await` pour que le hash soit créé avant de poursuivre l'enregistrement.
        newUser.password = hash // On stocke le hash du mot de passe dans l'objet newUser, qui représente l'utilisateur à enregistrer.
        await newUser.save() // On utilise `await` pour que la sauvegarde soit complétée avant de poursuivre.
        res.redirect('/api/v1/signin')
    }
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

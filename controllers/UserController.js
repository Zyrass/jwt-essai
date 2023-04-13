const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getHome = (req, res) => res.render('index')
const getRedirectProfile = (req, res) => res.redirect('/api/v1/signin')

const getProfile = (req, res) => {
    console.log(req.user)
    res.render('profile', {
        id: req.params.id,
        email: req.user.email,
    })
}

const getSignUp = (req, res) => {
    // console.log('getSignup, req.cookies.userID : ', req.cookies.userID)
    if (req.cookies.access_token)
        res.redirect(`/api/v1/profile/${req.cookies.userID}`)
    else res.render('signup')
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

const postSignIn = async (req, res) => {
    const { email, password } = req.body
    // Recherche l'utilisateur dans la base de données
    const checkUser = await UserModel.findOne({ email })

    if (checkUser !== null) {
        // Vérifie que le mot de passe correspond à celui stocké dans la base de données
        const matchPassword = await bcrypt.compare(password, checkUser.password)

        if (matchPassword) {
            // Si le mot de passe correspond, génère un token JWT et le stocke dans un cookie nommé "access_token"
            const tokenJWT = jwt.sign(
                {
                    _id: checkUser._id,
                    email: checkUser.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h',
                },
            )
            res.cookie('access_token', tokenJWT)
            // Redirige vers la page de profil de l'utilisateur
            res.redirect(`/api/v1/profile/${checkUser._id}`)
        } else {
            // Si le mot de passe ne correspond pas, renvoie une erreur 401 et affiche un message d'erreur
            res.status(401).render('signin', {
                response: 'Mot de passe incorrect',
            })
        }
    } else {
        // Si l'utilisateur n'existe pas, renvoie une erreur 401 et affiche un message d'erreur
        res.status(401).render('signin', {
            response: 'Utilisateur inexistant',
        })
    }
}

const getSignIn = (req, res) => {
    // console.log('getSignin, req.cookies.userID : ', req.cookies.userID)
    if (req.cookies.access_token)
        res.redirect(`/api/v1/profile/${req.cookies.userID}`)
    else res.render('signin')
}

const getLogout = (req, res) => {
    res.clearCookie('userID')
    res.clearCookie('access_token')
    delete req.cookies.userID
    delete req.cookies.access_token
    // res.send('Vous êtes maintenant déconnecté')
    res.redirect('/api/v1')
}
module.exports = {
    getHome,
    getRedirectProfile,
    getProfile,
    getLogout,
    getSignIn,
    getSignUp,
    getLogout,
    postSignUp,
    postSignIn,
}

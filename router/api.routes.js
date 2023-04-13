const router = require('express').Router()
const UserController = require('../controllers/UserController')
const check = require('../utils/jwt/authenticated')

router.get('/', UserController.getHome)
router.get('/signin', UserController.getSignIn)
router.get('/signup', UserController.getSignUp)
router.get('/profile', UserController.getRedirectProfile)
router.get('/profile/:id', check.authenticated, UserController.getProfile)
router.get('/logout', UserController.getHome)

router.post('/signup', UserController.postSignUp)
router.post('/signin', UserController.postSignIn)

module.exports = router

const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.get('/', UserController.getHome)
router.get('/signin', UserController.getSignIn)
router.get('/signup', UserController.getSignUp)
router.get('/profile', UserController.getRedirectProfile)
router.get('/profile/:id', UserController.getProfile)
router.get('/logout', UserController.getHome)

module.exports = router

const router = require('express').Router()
const UserController = require('./UserController')

router.get('/', (req, res) => {
    res.send('Welcome to the home page')
})

router.get("/login", UserController.getLogin)
router.post('/login', UserController.postLogin)
router.get('/users', UserController.getAllUsers)


module.exports = router

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const users = require('./users.json')

const secret = process.env.SECRET
const saltRounds = process.env.SALT_ROUNDS

const getLogin = (req, res) => {
    res.render('index', {
        password: req.body.password,
        pseudo: req.body.username
    })
}

const postLogin = async (req, res) => {
    const { username, password } = req.body
    const user = users.find(
        (u) => u.username === username && u.password === password,
    )
    if (!user) return res.status(401).send('Invalid credentials')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).send('Invalid credentials')
    const token = jwt.sign({ sub: user.id }, secret)
    res.send({ token })
}

const getAllUsers = (req, res) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).send('Missing authorization header')
    console.log(authHeader)
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, secret)
        const authorizedUser = users.find((u) => u.id === decoded.sub)
        if (!authorizedUser) return res.status(401).send('Invalid token')

        const allUsers = users.map((u) => ({ id: u.id, username: u.username }))
        res.send(allUsers)
    } catch (error) {
        res.status(401).send('Invalid token')
    }
}

module.exports = { getLogin, postLogin, getAllUsers }

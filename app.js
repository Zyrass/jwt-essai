require('dotenv').config()
require('./database/db')

const express = require('express')
const morgan = require('morgan')
const apiRoutes = require('./router/api.routes')

const app = express()

app.set('view engine', 'pug')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get(['/', '/api'], (_, res) => {
    res.redirect('/api/v1')
})
app.use('/api/v1', apiRoutes)

app.listen(3000, () =>
    console.log(`Serveur démarrer sur cette url: http://localhost:3000`),
)

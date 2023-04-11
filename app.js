const express = require('express')
const app = express()

const routerAPI = require('./router.routes')

app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((err, req, res, next) => {
    console.log(err.message)
    console.log(err.stack)
    res.status(500).send('Connexion cassé')
})

app.use('/api/', routerAPI)

app.listen(3000, () => {
    return console.log('start on http://localhost:3000/api')
})

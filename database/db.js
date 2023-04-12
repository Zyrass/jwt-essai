const mongoose = require('mongoose')

const PSEUDO = process.env.MONGODB_PSEUDO
const PASSWORD = process.env.MONGODB_PASSWORD
const CLIENT_NAME = process.env.MONGODB_CLIENT_NAME
const DATABASE_NAME = process.env.MONGODB_DATABASE_NAME

mongoose
    .connect(
        `mongodb+srv://${PSEUDO}:${PASSWORD}@${CLIENT_NAME}.d51otgm.mongodb.net/${DATABASE_NAME}`,
        {},
    )
    .then(() => console.log('connecté à la base de donnée'))
    .catch((error) => {
        console.log(error.message)
        console.log(error.stack)
    })

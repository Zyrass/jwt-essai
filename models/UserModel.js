const mongoose = require('mongoose')
const COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model(COLLECTION_NAME, UserSchema)

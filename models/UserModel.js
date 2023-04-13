const mongoose = require('mongoose')
const USER_COLLECTION_NAME = process.env.MONGODB_USER_COLLECTION_NAME

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model(USER_COLLECTION_NAME, userSchema)

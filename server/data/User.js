/**
 * Created by boris on 7/2/2017.
 */
const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'
const encryption = require('../utilities/encryption')
let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: REQUIRED_VALIDATION_MESSAGE,
        unique: true
    },
    salt: {
        type: String,
        required: REQUIRED_VALIDATION_MESSAGE
    },
    hashedPassword: {
        type: String,
        required: REQUIRED_VALIDATION_MESSAGE
    },
    roles: [String]
})
userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPassword
    }
})
let User = mongoose.model('User', userSchema)
module.exports = User
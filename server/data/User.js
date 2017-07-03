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
    firstName:{
        type:String,
        required: REQUIRED_VALIDATION_MESSAGE
    },
    lastName:{
        type:String,
        required: REQUIRED_VALIDATION_MESSAGE
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
module.exports.seedAdminUser = ()=>{
    User.find({}).then(users=>{
        if(users.length===0){
            let salt = encryption.generateSalt()
            let hashedPassword = encryption.generateHashedPassword(salt,'eWlydGhqbzRtdzc5NTM2eTd2MzRudDg3d3lcZ0ZCV1QmdDR2OGhcbTg5MnU1bTM4djU4OTQyaiZUKiZAJF5VSlRnZnNk')
            User.create({
                username:'admin',
                firstName:'admin',
                lastName:'admin',
                salt:salt,
                hashedPassword:hashedPassword,
                roles:['Admin']
            })
        }
    })
}
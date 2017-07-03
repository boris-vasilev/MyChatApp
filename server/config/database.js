/**
 * Created by boris on 7/2/2017.
 */
const mongoose = require('mongoose')
const User = require('../data/User')
mongoose.Promise = global.Promise
module.exports = (settings) => {
    mongoose.connect(settings.db)
    let db = mongoose.connection
    db.once('open', (err) => {
        if (err) {
            throw err
        }
        console.log('MongoDB ready!')
    })
    db.on('error', (err) => {
        console.log(`Database error: ${err}`)
    })
    User.find({}).then(()=>{
        User.seedAdminUser()
    })
}
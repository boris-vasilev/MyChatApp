/**
 * Created by boris on 7/2/2017.
 */
function hasEmptyProps(obj){
    for (let prop in obj){
        if(!obj[prop]){
            return true
        }
    }
    return false
}
const User = require('mongoose').model('User')
const encryption = require('../utilities/encryption')
module.exports = {
    registerGet: (req, res)=>{
        res.render('user/register')
    },
    registerPost:(req,res)=>{
        // let reqUser = req.body
        // if(hasEmptyProps(reqUser)){
        //     res.render('user/register',{globalError:`Please provide all the information`})
        //     return
        // }
        // User.findOne({username:req.username}).then((user)=>{
        //     if(user){
        //         res.render('user/register',{globalError:`User ${req.username} already exists`})
        //         return
        //     }
        // })
        // if(reqUser.password||reqUser.password!==reqUser.confirmPass){
        //     res.render('user/register',{globalError:`Passwords don't match`})
        //     return
        // }
        // User.create({
        //     username:reqUser.username,
        //     firstName:reqUser.firstName,
        //     lastName:reqUser.lastName,
        //     salt:encryption.generateSalt(),
        //     hashedPassword:encryption.generateHashedPassword(this.salt,reqUser.password)
        // })
        // res.redirect('/')
        let reqUser = req.body
        console.log(reqUser)
        // // Add validations!

        let salt = encryption.generateSalt()
        let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)
        User.findOne({username:reqUser.username}).then((user)=>{
            if(user){
                res.render('user/register', {globalError: `User ${reqUser.username} already exists`})
                return
            }
            if(hasEmptyProps(reqUser)){
                res.render('user/register',{globalError:`Please provide all the information`})
                return
            }
            if(reqUser.password!==reqUser.confirmPassword){
                res.render('user/register',{globalError:`Passwords don't match`})
                return
            }
            User.create({
                username: reqUser.username,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                salt: salt,
                hashedPassword: hashedPassword
            }).then(user => {
                req.logIn(user, (err, user) => {
                    if (err) {
                        res.locals.globalError = err
                        res.render('user/register', user)
                    }
                    res.locals.curre
                    res.redirect('/')
                })
            })
        })
    },
    logout:(req,res)=>{
        req.logout()
        res.redirect('/')
    }
}
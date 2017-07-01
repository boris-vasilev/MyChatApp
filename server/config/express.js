/**
 * Created by boris on 7/2/2017.
 */
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const handlebars = require('express-handlebars')
module.exports = (app) => {
    app.engine('handlebars', handlebars({
        defaultLayout: 'main'
    }))
    app.set('view engine', 'handlebars')
    app.use(cookieParser())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(session({
        secret: 'ygu5h476t478ti3gDij87943tu853o8uSAGYDop[/\';f.grh5',
        resave: false, saveUninitialized: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user
        }
        next()
    })
    app.use('/public', express.static('public'))
}
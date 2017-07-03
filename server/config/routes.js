/**
 * Created by boris on 7/2/2017.
 */
const controllers = require('../controllers')
const auth = require('./auth')
module.exports = (app) => {
    app.get('/', controllers.home.indexGet)
    app.get('/user/register', controllers.user.registerGet)
    app.post('/user/register', controllers.user.registerPost)
    app.post('/user/logout', controllers.user.logout)
    app.get('/user/login', controllers.user.loginGet)
    app.post('/user/login', controllers.user.loginPost)
    app.get('/chatroom/new', auth.isAuthenticated, controllers.chatroom.newGet)
    app.post('/chatroom/new', auth.isAuthenticated, controllers.chatroom.newPost)
    app.get('/chatroom/chat/:id', auth.isAuthenticated, controllers.chatroom.chatGet)
}
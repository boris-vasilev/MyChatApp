/**
 * Created by boris on 7/2/2017.
 */
const controllers = require('../controllers')
module.exports=(app)=>{
    app.get('/',controllers.home.indexGet)
    app.get('/user/register',controllers.user.registerGet)
    app.post('/user/register',controllers.user.registerPost)
    app.post('/user/logout',controllers.user.logout)
}
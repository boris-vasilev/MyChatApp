/**
 * Created by boris on 7/2/2017.
 */
const controllers = require('../controllers')
module.exports=(app)=>{
    app.get('/',controllers.home.indexGet)
}
/**
 * Created by boris on 7/2/2017.
 */
let env = process.env.NODE_ENV||'development'
let settings = require('./server/config/settings')[env]
const app = require('express')()
require('./server/config/database')(settings)
require('./server/config/express')(app)
require('./server/config/routes')(app)
require('./server/config/passport')()
app.listen(settings.port,(err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log(`Server running on port ${settings.port}...`)
})
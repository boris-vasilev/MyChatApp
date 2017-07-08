let env = process.env.NODE_ENV||'development'
let settings = require('./server/config/settings')[env]
const app = require('express')()
require('./server/config/database')(settings)
require('./server/config/express')(app)
require('./server/config/routes')(app)
require('./server/config/passport')()
/**
 * Created by boris on 7/2/2017.
 */
const controllers = require('./server/controllers')
const auth = require('./server/config/auth')
const server = app.listen(settings.port,(err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log(`Server running on port ${settings.port}...`)
})
const io = require('socket.io')(server)
io.on('connection',(socket)=>{
    console.log('User connected')
    socket.on('disconnect',()=>{
        console.log('User disconnected')
    })
})
app.post('/chatroom/chat/:id',auth.isAuthenticated,(req,res)=>{
    io.emit('sent-message',{
        user:req.user,
        message:req.body.message
    })
})
module.exports = io
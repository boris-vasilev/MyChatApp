/**
 * Created by boris on 7/2/2017.
 */
let homeController = require('./home-controller')
let userController = require('./user-controller')
let chatroomController = require('./chatroom-controller')
module.exports={
    home:homeController,
    user:userController,
    chatroom:chatroomController
}
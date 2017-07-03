/**
 * Created by boris on 7/3/2017.
 */
const mongoose = require('mongoose')
const shortid = require('shortid')
const REQUIERED_VALIDATION_MESSAGE = '{PATH} is required'
let chatroomSchema = new mongoose.Schema({
    _id:{
        type:String,
        'default': shortid.generate
    },
    title:{
        type:String,
        required:REQUIERED_VALIDATION_MESSAGE
    },
    description:{
        type:String
    },
    creator:{
        type:String,
        required:true,
        ref:'User'
    },
    participants:{
        type:[String],
        ref:'User'
    }
})
let ChatRoom = mongoose.model('ChatRoom',chatroomSchema)
module.exports=ChatRoom
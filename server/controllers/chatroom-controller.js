/**
 * Created by boris on 7/3/2017.
 */
// const ChatRoom = require('mongoose').model('ChatRoom')
const ChatRoom = require('../data/ChatRoom')
const User = require('mongoose').model('User')
const io = require('../../index')
module.exports = {
    newGet: (req, res) => {
        res.render('chatroom/new')
    },
    newPost: (req, res) => {
        let reqCR = req.body
        ChatRoom.create({
            title: reqCR.title,
            description: reqCR.description,
            creator: req.user.username,
        }).then((chatroom) => {
            chatroom.participants.push(chatroom.creator)
            User.findOne({
                username: req.user.username
            })
                .exec()
                .then((user) => {
                    user.createdChatrooms.push({
                        chatroomID: chatroom._id,
                        chatroomName: chatroom.title
                    })
                    user.participatedChatrooms.push({
                        chatroomID: chatroom._id,
                        chatroomName: chatroom.title
                    })
                    chatroom.save()
                    user.save()
                })

            res.redirect('/')
            // res.redirect(`chatroom/chat/${chatroom._id}`)
        })
    },
    chatGet: (req, res) => {
        let chatID = req.params.id
        ChatRoom.findById(chatID).then(chat => {
            if (!chat) {
                res.render('home/index', {globalError: 'Invalid chatroom'})
                return
            }
            if(!ChatRoom.isParticipant(req.user.username,chat.participants)){
                chat.participants.push(req.user.username)
                User.findOne({username:req.user.username})
                    .exec()
                    .then(user=>{
                    user.participatedChatrooms.push({
                        chatroomID:chat._id,
                        chatroomName:chat.title
                    })
                    user.save()
                })
                chat.save()
            }
            res.render('chatroom/chat', {chat:chat})
        })
    },
    chatPost:(req,res)=>{
        io.emit('sent-message',{
            user:req.user,
            message:req.body.message
        })
    },
    mychatsGet:(req,res)=>{
        User.findOne({username:req.user.username}).then(user=>{
            res.render('chatroom/mychats',{participatedCR:user.participatedChatrooms,createdCR:user.createdChatrooms})
        })
    },
    deleteGet:(req,res)=>{
        let creator
        let participants
        ChatRoom.findById(req.params.id).exec().then(chat=>{
            participants = chat.participants
            creator = chat.creator
        for(let i of participants){
                console.log(i)
            User.find({username:i}).exec().then(user=>{
                console.log(user[0].participatedChatrooms)
                let index = user[0].participatedChatrooms.findIndex(i=>i.chatroomID===req.params.id)
                user[0].participatedChatrooms.splice(index,1)
                user[0].save()
            })
        }
        User.find({username:creator}).exec().then(creator=>{
            let index = creator[0].createdChatrooms.findIndex(i=>i.chatroomID===req.params.id)
            creator[0].createdChatrooms.splice(index,1)
            creator[0].save()
        })
            chat.remove()
        })
        res.redirect('/')
    }
}
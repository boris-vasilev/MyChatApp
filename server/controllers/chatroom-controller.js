/**
 * Created by boris on 7/3/2017.
 */
// const ChatRoom = require('mongoose').model('ChatRoom')
const ChatRoom = require('../data/ChatRoom')
const User = require('mongoose').model('User')
module.exports={
    newGet:(req,res)=>{
        res.render('chatroom/new')
    },
    newPost:(req,res)=>{
        let reqCR = req.body
        ChatRoom.create({
            title:reqCR.title,
            description:reqCR.description,
            creator:req.user.username,
        }).then((chatroom)=>{
            chatroom.participants.push(chatroom.creator)
            User.findOne({
                username:req.user.username
            })
                .exec()
                .then((user)=>{
                    user.createdChatrooms.push({
                        chatroomID:chatroom._id,
                        chatroomName:chatroom.title
                    })
                    user.participatedChatrooms.push({
                        chatroomID:chatroom._id,
                        chatroomName:chatroom.title
                    })
                    chatroom.save()
                    user.save()
                })

            res.redirect('/')
            // res.redirect(`chatroom/chat/${chatroom._id}`)
        })
    }

}
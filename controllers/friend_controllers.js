const Post = require('../models/post')
const Comment = require('../models/comment')
const Like = require('../models/like')
const User = require('../models/user')
const ChatRoom = require('../models/chatRoom')
const ChatMessages = require('../models/chatMessages')

module.exports.addRemoveFriend = async function(req,res){

    let addedFriend = false;
    let friendUser = await User.findById(req.query.id);
    // console.log(req.user);
    // if (req.query.status=="Remove")
    let updated = false;
    // console.log(req.user);
    let arrayFriends = req.user.friendList;
    console.log(req.query.status);
    console.log("***** ", !arrayFriends.includes(req.query.id));
    if(req.query.status=="Add")
    {
        console.log('enter in adding area');
        // remove friend
        if(arrayFriends.includes(req.query.id))
        {
            console.log("****Removing a friend");
            updated = true;
            req.user.friendList.pull(req.query.id);
            friendUser.friendList.pull(req.user._id);
        }
        
    }else{
        console.log('enter in remove area');
        if(!arrayFriends.includes(req.query.id))
        {
            updated = true;
            console.log("****Adding a friend");
            addedFriend = true;
            // console.log(req.query.id," ",req.user.friendList); 
            req.user.friendList.push(req.query.id);
            friendUser.friendList.push(req.user._id);
            // console.log(req.query.id," ",req.user.friendList);
        }
    }
    if(updated)
    {
        console.log("update the list");
        req.user.save();
        friendUser.save();
    }
    return res.json(200, {
        message: "Request successful!",
        data: {
            id : friendUser._id,
            name : friendUser.name,
            addedFriend: addedFriend,
            updated: updated,
        }
    });
    

}

module.exports.chat = async function(req,res){
    
    let friendUser = await User.findById(req.query.id);
    var friendsList = [req.query.id,req.user._id];
    friendsList.sort();
    let chatroomName = "chatRoom-"+friendsList.join("-");
    // console.log("**********ddd ",chatroomName);
    let Chatroom = await await ChatRoom.findOne({name:chatroomName}).populate({path:"messages"});
    if(!Chatroom){
        Chatroom = await ChatRoom.create({
            name:chatroomName,
        });
    }
    // console.log("*********Friend* ", friendUser);
    return res.render('_chatroom',{
        title : "profile",
        chatUser : friendUser,
        ChatroomInfo : Chatroom,
    });

}

module.exports.chatcreate = async function(req,res) {
    console.log("*******chat creation");
    try{
        let message = req.body.message;
        let chatroomName = req.body.chatroom;
        let users = chatroomName.split("-");
        // console.log("*******88 ", req.body);
        // console.log("*******88 ", message);
        let to = users[1];
        if(to==req.user.id){
            to = users[2];
        }
        let friend = await User.findById(to);
        let friendAvatar = friend.avatar;
        let selfAvatar = req.user.avatar;
        console.log("******************* ", selfAvatar);
        console.log("******************* ", friendAvatar);
        if(req.body.selfMsg=="true")
        {
            console.log(req.body.selfMsg);
            let Chatroom = await ChatRoom.findOne({name:chatroomName});
            if(!Chatroom){
                Chatroom = await ChatRoom.create({
                    name:chatroomName,
                });
            }
            let messageCreate = await ChatMessages.create({
                from: req.user ,
                to: to,
                chatRoom: Chatroom,
                content: message,
            });
            // console.log(messageCreate);
            Chatroom.messages.push(messageCreate);
            Chatroom.save();
        }
        return res.status(200).json({
            message: "successful!",
            data: {
                friendAvatar : friendAvatar,
                selfAvatar : selfAvatar,
            }
        });


    }catch(err){
        console.log(err);
    }
}
const Post = require('../models/post')
const Comment = require('../models/comment')
const Like = require('../models/like')
const User = require('../models/user')

module.exports.addRemoveFriend = async function(req,res){

    let addedFriend = false;
    let friendUser = await User.findById(req.query.id);
    // console.log(req.user);
    // if (req.query.status=="Remove")
    if(req.user.friendList.includes(req.query.id))
    {
        console.log("****Removing a friend");
        // remove friend
        req.user.friendList.pull(req.query.id);
        friendUser.friendList.pull(req.user._id);
    }else{
        console.log("****Adding a friend");
        addedFriend = true;
        // console.log(req.query.id," ",req.user.friendList);
        req.user.friendList.push(req.query.id);
        friendUser.friendList.push(req.user._id);
        // console.log(req.query.id," ",req.user.friendList);
    }
    req.user.save();
    return res.json(200, {
        message: "Request successful!",
        data: {
            id : friendUser._id,
            name : friendUser.name,
            addedFriend: addedFriend
        }
    });

}
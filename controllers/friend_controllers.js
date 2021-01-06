const Post = require('../models/post')
const Comment = require('../models/comment')
const Like = require('../models/like')

module.exports.addRemoveFriend = function(req,res){

    let addedFriend = false;
    // console.log(req.user);
    // if (req.query.status=="Remove")
    if(req.user.friendList.includes(req.query.id))
    {
        console.log("****Removing a friend");
        // remove friend
        req.user.friendList.pull(req.query.id);
    }else{
        console.log("****Adding a friend");
        addedFriend = true;
        // console.log(req.query.id," ",req.user.friendList);
        req.user.friendList.push(req.query.id);
        // console.log(req.query.id," ",req.user.friendList);
    }
    req.user.save();
    return res.json(200, {
        message: "Request successful!",
        data: {
            addedFriend: addedFriend
        }
    });

}
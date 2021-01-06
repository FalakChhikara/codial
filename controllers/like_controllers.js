const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')
const Like = require('../models/like')

module.exports.likeContent = async function(req,res){
    try{
        let likeableThing;
        let dislike = false;

        if(req.query.tag == "Post"){
            likeableThing = await Post.findById(req.query.id);
        }else if(req.query.tag == "Comment"){
            likeableThing = await Comment.findById(req.query.id);
        }else{
            // flash msg
        }
        let likeThing = await Like.findOne({
            user: req.user._id,
            likeable: req.query.id,
            onModel: req.query.tag
        });

        if(likeThing){
            // delete that like
            console.log("******* like deleted ********"); 
            likeableThing.likes.pull(likeThing._id);
            likeableThing.save();
            likeThing.remove();
            dislike = true;
        }else{
            console.log("******* like added ********"); 
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.tag
            });
            likeableThing.likes.push(newLike._id);
            likeableThing.save();
        }
        return res.json(200, {
            message: "Request successful!",
            data: {
                dislike: dislike
            }
        })
    }catch(err){
        console.log(err);
        return;
    }
}
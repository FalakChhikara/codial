const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.createPost = function(req,res){
    console.log(req);
    // console.log("**********", res.locals.user);

    
    Post.create({
        content : req.body.content,
        user : req.user._id    ////////////////////////// doubt
    },function(err,post){
        if(err){
            console.log("error in post");
            return;
        }
        return res.redirect('back');
    });

    
}

module.exports.deletePost = function(req,res){
    // console.log(req);
    // console.log("**********", res.locals.user);

    
    Post.findById(req.params.id,function(err,post){
        if(err){
            console.log("error in deleting the post");
            return;
        }
        // .id converting objectid to string
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            });

        }
        else{
            return res.redirect('back');
        }
    });

    
}
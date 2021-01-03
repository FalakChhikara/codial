const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.createComment = function(req,res){
    console.log(req);
    // console.log("**********", res.locals.user);

    Post.findById(req.body.post,function(err,post){
        if(post)
        {
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id    ////////////////////////// doubt
            },function(err,comment){
                if(err){
                    console.log("error in post");
                    return;
                }
                console.log(comment);
                post.comment.push(comment._id);
                post.save(); // as we update
                return res.redirect('back');
            });
        }
    });
    

    
}

module.exports.deleteComment = function(req,res){
    console.log('************ falak **************');
    Comment.findById(req.params.id,function(err,comment){
        
        // .id converting objectid to string
        if(comment.user == req.user.id){
            let postid = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postid,
                {$pull: {comment:req.params.id}},
                function(err,post){
                return res.redirect('back');
            });

        }
        else{
            return res.redirect('back');
        }
    });
    
}
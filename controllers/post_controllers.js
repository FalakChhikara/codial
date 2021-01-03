const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.createPost = async function(req,res){
    // console.log(req);
    // console.log("**********", res.locals.user);

    
    // Post.create({
    //     content : req.body.content,
    //     user : req.user._id    ////////////////////////// doubt
    // },function(err,post){
    //     if(err){
    //         console.log("error in post");
    //         return;
    //     }
    //     return res.redirect('back');
    // });
    try{
        // let post = 
        await Post.create({
            content : req.body.content,
            user : req.user._id    ////////////////////////// doubt
        });
        req.flash("success", "post-created");
        return res.redirect('back');
    }catch(err){
        req.flash("error", "error in post creation");
        return res.redirect('back');
    }
    
}

module.exports.deletePost = async function(req,res){
    // console.log(req);
    // console.log("**********", res.locals.user);

    
    // Post.findById(req.params.id,function(err,post){
    //     if(err){
    //         console.log("error in deleting the post");
    //         return;
    //     }
    //     // .id converting objectid to string
    //     if(post.user == req.user.id){
    //         post.remove();
    //         Comment.deleteMany({post:req.params.id},function(err){
    //             return res.redirect('back');
    //         });

    //     }
    //     else{
    //         return res.redirect('back');
    //     }
    // });
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            req.flash("success", "post-deleted");
            return res.redirect('back');
        }
        else{
            req.flash("error", "don't do inspect element");
            return res.redirect('back');
        }
    }catch(err){
        req.flash("error", "error in post deletion");
        return res.redirect('back');
    }
    

    
}
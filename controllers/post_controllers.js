const Post = require('../models/post')

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
const Post = require('../../../models/post');

module.exports.index = async function(req,res){
    try
    {
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comment',
            populate:{
                path: 'user'
            }
        });
        return res.json(200,{
            message : "list of post",
            posts : posts,
        })
    }catch(err){
        console.log(err);
        return;
    }
}
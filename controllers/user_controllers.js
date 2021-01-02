const { response } = require('express');
const passport = require('passport');
const User = require('../models/user');
const Post = require('../models/post');;
const Comment = require('../models/comment');
const { populate } = require('../models/comment');

module.exports.profilepage = function(req,res){
    console.log(req.cookies.codial);
    // auth check in routers and user is stored in locals
    // console.log("*******", res.locals.user);
    // Post.find({},function(err,post){
    //     return res.render('profile',{
    //         title : "profile",
    //         // user : user
    //         post : post,
    //     });
    // });


    // prepopulate user with post.user
    Post.find({})
    .populate('user')
    .populate({
        path: 'comment',
        populate:{
            path: 'user'
        }
    })
    .exec(function(err,post){
        return res.render('profile',{
            title : "profile",
            // user : user
            post : post,
        });
    })


    // if(req.cookies.user_id){

    //     User.findById(req.cookies.user_id,function(err,user){
    //         if(user)
    //         {
    //             return res.render('profile',{
    //                 title : "profile",
    //                 user : user
    //             });
    //         }
    //         else{
    //             return res.redirect('/users/signup');
    //         }
    //     });
    // }
    // else{
    //     return res.redirect('/users/signup');
    // }
    // return res.render('profile',{
    //     title : "profile",
    // });
}

module.exports.create = function(req,res){
    // console.log(req.body);
    if(req.body.password != req.body.password2){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email}, function(error,user){
        if(error){
            console.log("error in signup");
            return;
        }
        if(!user){
            User.create(req.body,function(error,user){
                if(error){
                    console.log("error in creating user ");
                    console.log(error);
                    return;
                }
                return res.redirect('/users/signin');
            });
        }
        else{
            return res.redirect('/users/signin');
        }
    });
}

// manual auth
// module.exports.createSession = function(req,res){

//     User.findOne({email:req.body.email}, function(error,user){
//         if(error){
//             console.log("error in signin");
//             return;
//         }
//         if(user){
//             if(user.password == req.body.password){
//                 // cookie is sent to browser by server
//                 res.cookie('user_id',user.id);
//                 return res.redirect('/users/profile');
//             }else{
//                 return res.redirect('back');
//             }
//         }
//         else{
//             return res.redirect('back');
//         }
//     });
// }

// using passport
module.exports.createSession = function(req,res){
    console.log(req.cookies);
    console.log("falak");
    return res.redirect('/users/profile');
}

module.exports.dsetroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_signup',{
        title : "Codial : Signup",
    });
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_signin',{
        title : "Codial : signIn",
    });
}
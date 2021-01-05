const { response } = require('express');
const passport = require('passport');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.profilepage = async function(req,res){
    // console.log(req.cookies.codial);
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
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path: 'comment',
    //     populate:{
    //         path: 'user'
    //     }
    // })
    // .exec(function(err,post){
    //     User.find({},function(err,users){
    //         return res.render('profile',{
    //             title : "profile",
    //             users : users,
    //             post : post,
    //         });
    //     });
        
    // })

    // using async await
    try
    {
        let post = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comment',
            populate:{
                path: 'user'
            }
        });

        let users = await User.find({});
        
        return res.render('profile',{
            title : "profile",
            users : users,
            post : post,
        });
    }
    catch(err){
        console.log(err);
        return;
    }
    


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




module.exports.Friendprofilepage = function(req,res){
    User.findById(req.params.id, function(err,user){
       return res.render('userinfo',{
           title: "user-info",
           profile : user,
       });
    });
}

module.exports.profileUpdate = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        });
    }
    else{
        return res.status(401).send("Unauth access");
    }
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
    // console.log(req.cookies);
    // console.log("falak");
    req.flash('success','Logged in successfully');  ///////////////////////////////////doubt
    // res.locals.flash = {
    //     'success' : 'Signup page',
    // }
    req.falak = "falak";
    return res.redirect('/users/profile');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','Logout in successfully');
    
    return res.redirect('/');
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    res.locals.flash = {
        'success' : 'Signup page',
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
    res.locals.flash = {
        'success' : 'Signin page',
    }
    return res.render('user_signin',{
        title : "Codial : signIn",
    });
}
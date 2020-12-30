const { response } = require('express');
const User = require('../models/user');

module.exports.profilepage = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user)
            {
                return res.render('profile',{
                    title : "profile",
                    user : user
                });
            }
            else{
                return res.redirect('/users/signup');
            }
        });
    }
    else{
        return res.redirect('/users/signup');
    }
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

module.exports.createSession = function(req,res){

    User.findOne({email:req.body.email}, function(error,user){
        if(error){
            console.log("error in signup");
            return;
        }
        if(user){
            if(user.password == req.body.password){
                res.cookie('user_id',user.id);
                return res.redirect('/users/profile');
            }else{
                return res.redirect('back');
            }
        }
        else{
            return res.redirect('back');
        }
    });
}

module.exports.signUp = function(req,res){
    return res.render('user_signup',{
        title : "Codial : Signup",
    });
}

module.exports.signIn = function(req,res){
    return res.render('user_signin',{
        title : "Codial : signIn",
    });
}
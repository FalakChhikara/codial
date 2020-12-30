const User = require('../models/user');

module.exports.profilepage = function(req,res){
    return res.render('profile',{
        title : "profile",
    });
}

module.exports.create = function(req,res){
    console.log(req.body);
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
    // return res.render('user_signin',{
    //     title : "Codial : signIn",
    // });
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
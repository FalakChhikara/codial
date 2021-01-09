const express = require('express')
const router = express.Router()
const passport = require('passport');

const user_controllers = require('../controllers/user_controllers');


router.get('/signin',user_controllers.signIn);
router.get('/signup',user_controllers.signUp);
router.post('/create',user_controllers.create);
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect:'/signin'},
 ) ,user_controllers.createSession);
router.get('/signout',user_controllers.destroySession);


router.get('/',user_controllers.homepage);
router.get('/profile/:id',passport.checkAuthentication,user_controllers.profilepage);
router.post('/update/:id',passport.checkAuthentication,user_controllers.profileUpdate);



// router.post('/createSession',user_controllers.createSession);

// 2nd arg is middleware, use passport as middleware to auth






module.exports = router;
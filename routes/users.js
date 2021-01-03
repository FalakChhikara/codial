const express = require('express')
const router = express.Router()
const passport = require('passport');

const user_controllers = require('../controllers/user_controllers');

router.get('/profile',passport.checkAuthentication,user_controllers.profilepage);
router.get('/profile/:id',passport.checkAuthentication,user_controllers.Friendprofilepage);
router.post('/update/:id',passport.checkAuthentication,user_controllers.profileUpdate);
router.get('/signin',user_controllers.signIn);
router.get('/signup',user_controllers.signUp);
router.get('/signout',user_controllers.destroySession);
router.post('/create',user_controllers.create);
// router.post('/createSession',user_controllers.createSession);

// 2nd arg is middleware, use passport as middleware to auth
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
 ) ,user_controllers.createSession);





module.exports = router;
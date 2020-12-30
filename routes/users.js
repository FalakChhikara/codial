const express = require('express')
const router = express.Router()

const user_controllers = require('../controllers/user_controllers');

router.get('/profile',user_controllers.profilepage);
router.get('/signin',user_controllers.signIn);
router.get('/signup',user_controllers.signUp);
router.post('/create',user_controllers.create);
// router.get('/create',user_controllers.create);





module.exports = router;
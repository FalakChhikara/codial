const express = require('express')
const router = express.Router()
const passport = require('passport');

const post_controllers = require('../controllers/post_controllers');

router.post('/create',passport.checkAuthentication,post_controllers.createPost);


module.exports = router;
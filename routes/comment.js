const express = require('express')
const router = express.Router()
const passport = require('passport');

const comment_controllers = require('../controllers/comment_controllers');

router.post('/create',passport.checkAuthentication,comment_controllers.createComment);


module.exports = router;
const express = require('express')
const router = express.Router()
const passport = require('passport');

const friend_controllers = require('../controllers/friend_controllers');

router.post('/addRemoveFriend',passport.checkAuthentication,friend_controllers.addRemoveFriend);

module.exports = router;
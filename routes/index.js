const express = require('express')
const router = express.Router()

console.log("router loaded");
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./post'));
router.use('/comment', require('./comment'));
router.use('/likes', require('./like'));
router.use('/friends', require('./friend'));




module.exports = router;
var express = require('express')
var router = express.Router()

console.log("router loaded");
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);





module.exports = router;
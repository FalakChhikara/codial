const express = require('express')
const router = express.Router()

const post_api_controllers = require('../../../controllers/api/v1/post_api');

router.get('/',post_api_controllers.index);


module.exports = router;
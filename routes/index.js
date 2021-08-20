const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');


router.get('/', homeController.home);
router.use('/users',require('./users.js'));
router.use('/meet',require('./new_meeting.js'));


module.exports = router;
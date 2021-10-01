const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const compilerController = require('../controllers/compiler_controller');

router.get('/', homeController.home);
router.use('/users',require('./users.js'));
router.use('/meet',require('./new_meeting.js'));
router.use('/compile',require('./compiler.js'));
router.use('/chat',require('./chat.js'));



module.exports = router;
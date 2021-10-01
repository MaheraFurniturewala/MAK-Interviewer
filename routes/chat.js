const express = require('express');
const router = express.Router();
const messageController = require('../controllers/chat_controller');

router.post('/newMessage', messageController.createMessage);

module.exports = router;
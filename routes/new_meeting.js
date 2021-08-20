const express = require('express');
const router = express.Router();
const roomController = require('../controllers/meeting_controller');

router.get('/start-instant-meet',roomController.createRoomId);
router.get('/room/:roomId',roomController.enterRoom);


module.exports = router;
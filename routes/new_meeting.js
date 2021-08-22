const express = require('express');
const router = express.Router();
const passport = require('passport');
const roomController = require('../controllers/meeting_controller');

router.get('/start-instant-meet',roomController.createRoomId);
router.get('/room/:roomId',passport.checkAuthentication,roomController.enterRoom);


module.exports = router;
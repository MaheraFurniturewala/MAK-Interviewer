const express = require('express');
const http = require('http');
const router = express.Router();
const homeController = require('../controllers/home_controller');


router.get('/', homeController.home);
router.use('/users',require('./users.js'));


module.exports = router;
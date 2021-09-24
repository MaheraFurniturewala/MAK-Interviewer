const express = require('express');
const router = express.Router();
const compilerController = require('../controllers/compiler_controller');

router.post('/compile_code',compilerController.compile);

module.exports = router;
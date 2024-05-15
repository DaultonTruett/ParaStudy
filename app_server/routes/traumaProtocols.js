const express = require('express');
const router = express.Router();

const traumaController = require('../controllers/algorithms');

router.get('/', traumaController.traumaProtocols);

module.exports = router;
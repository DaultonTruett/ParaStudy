const express = require('express');
const router = express.Router();

const traumaController = require('../controllers/protocols');

router.get('/', traumaController.traumaProtocols);

module.exports = router;
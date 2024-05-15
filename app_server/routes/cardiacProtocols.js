const express = require('express');
const router = express.Router();

const protocolsController = require('../controllers/protocols');

router.get('/', protocolsController.cardiacProtocols);

module.exports = router;
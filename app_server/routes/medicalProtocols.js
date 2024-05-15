const express = require('express');
const router = express.Router();

const medicalController = require('../controllers/protocols');

router.get('/', medicalController.medicalProtocols);

module.exports = router;
const express = require('express');
const router = express.Router();

const medicalController = require('../controllers/algorithms');

router.get('/', medicalController.medicalProtocols);

module.exports = router;
const express = require('express');
const router = express.Router();

const medController = require('../controllers/medications');

router.get('/', medController.medicalMedications);

module.exports = router;
const express = require('express');
const router = express.Router();

const medController = require('../controllers/medications');

router.get('/', medController.cardiacMedications);

module.exports = router;
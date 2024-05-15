const express = require('express');
const router = express.Router();

const medicalController = require('../controllers/medical');


router.get('/', medicalController);

module.exports = router;
const express = require('express');
const router = express.Router();

const algorithmsController = require('../controllers/algorithms');

router.get('/', algorithmsController.cardiacAlgorithms);

module.exports = router;
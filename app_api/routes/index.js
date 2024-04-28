const express = require('express');
const router = express.Router();

// controllers
const medController = require('../controllers/medications')

// routing
router
    .route('/cardiac/medications/:category')
    .get(medController.getMedsByCategory);

router
    .route('/cardiac/medications')
    .post(medController.addMedication);





module.exports = router;
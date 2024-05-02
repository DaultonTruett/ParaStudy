const express = require('express');
const router = express.Router();

// controllers
const medController = require('../controllers/medications');
const algorithmController = require('../controllers/algorithms');

// routing
router
    .route('/cardiac/medications/:category')
    .get(medController.getMedsByCategory);
    

router
    .route('/cardiac/medications')
    .post(medController.addMedication);


router
    .route('/cardiac/algorithms')
    .get(algorithmController.getAlgorithms)
    .post(algorithmController.addAlgorithm);



module.exports = router;
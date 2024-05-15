const express = require('express');
const router = express.Router();
const {expressjwt: jwt} = require('express-jwt');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

// controllers
const authController = require('../controllers/authentication');
const medController = require('../controllers/medications');
const algorithmController = require('../controllers/algorithms');

// routing
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);


router
    .route('/medications')
    .get(medController.getMedications)
    .post(auth, medController.addMedication);


router
    .route('/medications/:_id')
    .get(medController.getMedicationById)
    .put(auth, medController.updateMedication)
    .post(auth, medController.deleteMedication);


router
    .route('/cardiac/medications/:category')
    .get(medController.getMedsByCategory);


router
    .route('/cardiac/algorithms')
    .get(algorithmController.getAlgorithms)
    .post(auth, algorithmController.addAlgorithm);

router
    .route('/medical/medications/:category')
    .get(medController.getMedsByCategory)


router
    .route('/trauma/medications/:category')
    .get(medController.getMedsByCategory)




module.exports = router;
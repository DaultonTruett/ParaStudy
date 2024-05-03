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
    .route('/cardiac/medications/:category')
    .get(medController.getMedsByCategory);
    

router
    .route('/cardiac/medications')
    .post(auth, medController.addMedication);


router
    .route('/cardiac/algorithms')
    .get(algorithmController.getAlgorithms)
    .post(auth, algorithmController.addAlgorithm);




module.exports = router;
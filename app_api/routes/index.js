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
const userDataController = require('../controllers/userData');

// Account management
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

router
    .route('/user/:email')
    .get(authController.generateNewJWT)

router
    .route('/request-password-reset')
    .post(authController.requestPasswordReset)

router
    .route('/password-reset')
    .post(authController.resetPassword)

router
    .route('/deleteUserAccount')
    .post(authController.deleteUserAccount)


// User app data
router
    .route('/addQuizResult')
    .post(userDataController.addQuizResult)

router
    .route('/deleteAllQuizResults')
    .post(userDataController.deleteAllQuizResults)

router
    .route('/addFlashcard')
    .post(userDataController.addFlashcard)

router
    .route('/removeFlashcard')
    .post(userDataController.removeFlashcard)

router
    .route('/deleteAllFlashcards')
    .post(userDataController.deleteAllFlashcards)



// Medications
router
    .route('/medications')
    .get(medController.getMedications)
    .post(auth, medController.addMedication);

router
    .route('/medications/:_id')
    .get(medController.getMedicationById)
    .put(auth, medController.updateMedication)
    .post(auth, medController.deleteMedication);

// Medication Indications
router
    .route('/medications/addIndication/:_id')
    .put(auth, medController.addMedicationIndication)

router
    .route('/medications/editIndication/:_id')
    .put(auth, medController.updateMedicationIndication)

router
    .route('/medications/deleteIndication/:_id')
    .put(auth, medController.deleteMedicationIndication)

// Medication doses
router
    .route('/medications/addMedicationDose/:_id')
    .put(auth, medController.addMedicationDose)

router
    .route('/medications/updateMedicationDose/:_id')
    .put(auth, medController.updateMedicationDose)

router
    .route('/medications/deleteMedicationDose/:_id')
    .put(auth, medController.deleteMedicationDose)


module.exports = router;
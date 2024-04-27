const express = require('express');
const router = express.Router();

const cardiacCtrl = require('../controllers/cardiac');

router.get('/', cardiacCtrl);


module.exports = router;
const express = require('express');
const router = express.Router();

const traumaController = require('../controllers/trauma');

router.get('/', traumaController);

module.exports = router;
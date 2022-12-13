const { indexView } = require('../controllers/indexController');

const express = require('express');
const router = express.Router();

router.get('', indexView);
module.exports = router;

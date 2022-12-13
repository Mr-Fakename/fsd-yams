const {registerView, loginView } = require('../controllers/loginController');

const express = require('express');
const router = express.Router();

router.get('/register', registerView);
router.get('/login', loginView);
module.exports = router;

const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');

router.post('/signup', user.createUser);
router.post('/login', user.authenticateUser);

module.exports = router;

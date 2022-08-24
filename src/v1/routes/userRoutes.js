const express = require('express');
const router = new express.Router();

const userController = require('../controllers/userController');

router.post('/signup', userController.createUser);
router.post('/login', userController.verifyUser);

module.exports = router;

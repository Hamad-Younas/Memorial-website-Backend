const express = require('express');
const { login, register, verifyUser, verifyLatestCode } = require('../controllers/auth');
const { updateUser, getUser, getUsers, deleteUser } = require('../controllers/user');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', getUser);
router.get('/confirm', verifyUser);
router.post('/verify', verifyLatestCode);
router.post('/change-password', updateUser);

module.exports = router;

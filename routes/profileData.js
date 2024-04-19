const express = require('express');
const { Add, Get, Update, Delete } = require('../controllers/profileData');

const router = express.Router();

router.post('/add', Add);
router.get('/get/:Id', Get);
router.put('/update/:Id', Update);
router.delete('/delete/:Id', Delete);

module.exports = router;

const express = require('express');
const { Add, Get } = require('../controllers/backgroundImage');

const router = express.Router();

router.post('/add', Add);
router.get('/get/:Id', Get);

module.exports = router;

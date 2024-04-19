const express = require('express');
const { Add, Get } = require('../controllers/Obituary');

const router = express.Router();

router.post('/add', Add);
router.get('/get/:Id', Get);

module.exports = router;

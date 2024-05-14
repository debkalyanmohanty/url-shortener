const express = require('express');

const router = express.Router();

const shortenUrlController = require('../controller/shortener');

router.post('/shorten' , shortenUrlController.shortenUrl);


module.exports = router;

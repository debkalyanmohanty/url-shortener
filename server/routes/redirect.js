const express = require('express');

const router = express.Router();

const redirectUrlController = require('../controller/redirect');

router.get('/redirect/:id' , redirectUrlController.redirectUrl);


module.exports = router;

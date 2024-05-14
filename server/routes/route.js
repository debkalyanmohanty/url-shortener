const express = require('express');

const router = express.Router();
const shortenerRoutes = require('./shortener');
const redirectRoutes = require('./redirect');

router.use(shortenerRoutes);
router.use(redirectRoutes);

module.exports = router;




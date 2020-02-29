
const router = require('express').Router();
const carsRouter = require('./carsRouter')

router.use('/cars', carsRouter);

module.exports = router;
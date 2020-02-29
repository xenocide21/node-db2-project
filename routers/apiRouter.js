
const router = require('express').Router();
const carsRouter = require('./carsRouter')
const carRouter = require('./carRouter')

router.use('/cars', carsRouter);
router.use('/car', carRouter )

module.exports = router;
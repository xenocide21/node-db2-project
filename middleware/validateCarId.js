
const Car = require('../data/helpers/carModel')

const validateCarId = (req, res, next) => {
    const ResId = req.params.id;
    Car
        .get(ResId)
        .then( r => {
            r ? next() : res.status(400).json({ message: 'Invalid resource ID' })
        })
        .catch( err => {
            res.status(500).json({err, message: 'Something went wrong' })
        })
}
module.exports = validateCarId
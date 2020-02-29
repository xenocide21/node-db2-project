
const express = require('express');
const router = express.Router();
const Cars = require('../data/helpers/carsModel');
const validateCarsId = require('../middleware/validateCarsId')

router.use(validateCarsId)

router.get('/', (req, res) => {
    Cars
        .get()
        .then(car => {
            console.log("Cars Router", car);
            res.status(200).json(car);
        })
})

router.get('/:id', validateCarsId, (req, res) => {
    Cars
        .get(req.params.id)
        .then(car => {
            console.log("cars Router", car);
            res.status(200).json(car);
        })
})

router.post('/', (req, res) => {
    // const carsId = req.body.car_id;
    // if (!carsId) { return res.status(400).json({ errorMessage: "There is no id for this car." }) }
    Cars
        .insert(req.body)
        .then(newCar => {
            res.status(201).json(newCar);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Error creating new post." })
        })
})

router.put('/:id', validateCarsId, (req, res) => {
    Cars
        .update(req.params.id, req.body)
        .then(updatedCar => {
            res.status(200).json(updatedCar);
        })
        .catch(err => res.status(500).json({ errorMessage: "Error updating resource." }))
})

router.delete('/:id', validateCarsId, (req, res) => {
    Cars
        .remove(req.params.id)
        .then(info => res.status(200).json(info))
        .catch(err => res.status(500).json(err, { errorMessage: "Error deleting the car." }))
})

module.exports = router;
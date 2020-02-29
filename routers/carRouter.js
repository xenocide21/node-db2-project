const express = require('express');
const router = express.Router();
const Car = require('../data/helpers/carModel');
const validateCarId = require('../middleware/validateCarId')

router.use(validateCarId)

router.get('/', (req, res) => {
    Car
        .get()
        .then(act => {
            console.log("Car Router", act);
            res.status(200).json(act);
        })
})

router.get('/:id', validateCarId, (req, res) => {
    Car
        .get(req.params.id)
        .then(act => {
            console.log("Actions Router", act);
            res.status(200).json(act);
        })
})

router.post('/', (req, res) => {
    const carsId = req.body.cars_id;
    if (!carsId) { return res.status(400).json({ errorMessage: "There is no post id for this car" }) }
    Car
        .insert(req.body)
        console.log(req.body)
        .then(newCar => {
            res.status(201).json(newCar);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Error creating new post." })
        })
})

router.put('/:id', validateCarId, (req, res) => {
    Car
        .update(req.params.id, req.body)
        .then(updatedProject => {
            res.status(200).json(updatedProject);
        })
        .catch(err => res.status(500).json({ errorMessage: "Error updating resource." }))
})

router.delete('/:id', validateCarId, (req, res) => {
    Car
        .remove(req.params.id)
        .then(info => res.status(200).json(info))
        .catch(err => res.status(500).json(err, { errorMessage: "Error deleting the project." }))
})

module.exports = router;
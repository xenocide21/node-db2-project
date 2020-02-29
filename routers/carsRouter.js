//
// const express = require('express');
// const router = express.Router();
// const Cars = require('../data/helpers/carsModel');
// const validateCarsId = require('../middleware/validateCarsId')
//
// router.use(validateCarsId)
//
// router.get('/', (req, res) => {
//     Cars
//         .get()
//         .then(car => {
//             console.log("Cars Router", car);
//             res.status(200).json(car);
//         })
// })
//
// router.get('/:id', validateCarsId, (req, res) => {
//     Cars
//         .get(req.params.id)
//         .then(cars => {
//             console.log("cars Router", cars);
//             res.status(200).json(cars);
//         })
// })
//
// router.post('/', (req, res) => {
//     const carsId = req.body.cars_id;
//     if (!carsId) { return res.status(400).json({ errorMessage: "There is no id for this car." }) }
//     Cars
//         .insert(req.body)
//         .then(newCar => {
//             res.status(201).json(newCar);
//         })
//         .catch(err => {
//             res.status(500).json({ errorMessage: "Error creating new post." })
//         })
// })
//
// router.put('/:id', validateCarsId, (req, res) => {
//     Cars
//         .update(req.params.id, req.body)
//         .then(updatedCar => {
//             res.status(200).json(updatedCar);
//         })
//         .catch(err => res.status(500).json({ errorMessage: "Error updating resource." }))
// })
//
// router.delete('/:id', validateCarsId, (req, res) => {
//     Cars
//         .remove(req.params.id)
//         .then(info => res.status(200).json(info))
//         .catch(err => res.status(500).json(err, { errorMessage: "Error deleting the car." }))
// })
//
// module.exports = router;

const express = require('express');
const router = express.Router();
const Cars = require('../data/helpers/carsModel');
const validateCarsId = require('../middleware/validateCarsId')

router.use(validateCarsId)

router.get('/', (req, res) => {
    Cars
        .get()
        .then(cars => {
            console.log("Cars Router", cars);
            res.status(200).json(cars);
        })
})

router.get('/:id', validateCarsId, (req, res) => {
    Cars
        .get(req.params.id)
        .then(cars => {
            if (!cars) {
                return res.status(404).json({ message: "No cars matching that id in database" })
            }
            console.log("Projects Router", cars);
            res.status(200).json(cars);
        })
})

router.post('/', (req, res) => {
    Cars
        .insert(req.body)
        .then(newCars => {
            res.status(201).json(newCars);
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong with your post." })
        })
})

router.put('/:id', validateCarsId, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Cars
        .update(id, changes)
        .then(updateCars => {
            if (!updateCars) {
                return res.status(400).json({ message: "There is no cars matching that id in the database." })
            } res.status(200).json(updateCars);
        })
        .catch(err => res.status(500).json({ errorMessage: "Something went wrong with your update." }))
})

router.delete('/:id', validateCarsId, (req, res) => {
    const { id } = req.params;
    Cars
        .remove(id)
        .then(removed => {
            res.status(200).json(id)
        })
        .catch(error => {
            res.status(500).json({ message: "There was an error deleting info" })
        })
})

module.exports = router;
module.exports = {
    intToBoolean,
    booleanToint,
    carsToBody,
    carToBody,
};

function intToBoolean(int) {
    return int === 1 ? true : false;
}

function booleanToint(bool) {
    return bool === true ? 1 : 0;
}

function carsToBody(car) {
    const result = {
        ...car,
        completed: intToBoolean(car.completed),
    };

    if (car.cars) {
        result.cars = car.cars.map(c => ({
            ...c,
            completed: intToBoolean(c.completed),
        }));
    }

    return result;
}

function carToBody(car) {
    return {
        ...car,
        completed: intToBoolean(car.completed),
    };
}

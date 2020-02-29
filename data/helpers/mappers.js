module.exports = {
    intToBoolean,
    booleanToInt,
    carsToBody,
    carToBody,
};

function intToBoolean(int) {
    return int === 1;
}

function booleanToInt(bool) {
    return bool === true ? 1 : 0;
}

function carsToBody(cars) {
    const result = {
        ...cars,
        Inspected: intToBoolean(cars.Inspected),
    };

    if (cars.car) {
        result.car = cars.car.map(c => ({
            ...c,
        }));
    }

    return result;
}

function carToBody(car) {
    return {
        ...car,
    };
}

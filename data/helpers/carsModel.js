const db = require("../dbConfig.js");
const mappers = require("./mappers");

module.exports = {
    get,
    insert,
    update,
    remove,
    getCarInfo: getCarInfo,
};
function get(id) {
    let query = db("cars as c");

    if (id) {
        query.where("c.id", id).first();

        const promises = [query, this.getCarInfo(id)]; // [ cars, car ]

        return Promise.all(promises).then(function(results) {
            let [cars, car] = results;

            if (cars) {
                cars.car = car;

                return mappers.carsToBody(cars);
            } else {
                return null;
            }
        });
    } else {
        return query.then(cars => {
            return cars.map(car => mappers.carsToBody(car));
        });
    }
}

function insert(car) {
    return db("cars")
        .insert(car, "id")
        .then(([id]) => this.get(id));
}

function update(id, changes) {
    return db("cars")
        .where("id", id)
        .update(changes)
        .then(count => (count > 0 ? this.get(id) : null));
}

function remove(id) {
    return db("cars")
        .where("id", id)
        .del();
}

function getCarInfo(carId) {
    return db("car")
        .where("cars_id", carId)
        .then(car => car.map(c => mappers.carToBody(c)));
}
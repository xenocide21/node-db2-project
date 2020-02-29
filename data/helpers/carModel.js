
const db = require("../dbConfig.js");
const mappers = require("./mappers");

module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
};
function get(){
    return db('car')
}

function getById(id) {
    let query = db("car");

    if (id) {
        return query
            .where("id", id)
            .first()
            .then(car => {
                if (car) {
                    return mappers.carToBody(car);
                } else {
                    return null;
                }
            });
    } else {
        return query.then(cars => {
            return cars.map(car => mappers.carToBody(car));
        });
    }
}

function insert(car) {
    return db("car")
        .insert(car)
        .then(([id]) => this.get(id));
}

function update(id, changes) {
    return db("car")
        .where("id", id)
        .update(changes)
        .then(count => (count > 0 ? this.get(id) : null));
}

function remove(id) {
    return db("car")
        .where("id", id)
        .del();

}
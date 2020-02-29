const db = require("../dbConfig.js");
const mappers = require("./mappers");

module.exports = {
    get,
    insert,
    update,
    remove,
    getCarSales: getCarSales,
};
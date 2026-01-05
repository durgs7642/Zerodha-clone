const {model} = require("mongoose");

const {OrdersSchema} = requiere("../schemas/OrdersSchema");

const OrdersModel = new model("order", OrdersSchema);

module.exports = {OrdersModel};
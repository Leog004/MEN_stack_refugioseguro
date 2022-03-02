var mongoose = require("mongoose");


var SubscribeScheme = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    createdAt: { type: Date, default: Date.now }

});


module.exports = mongoose.model("Subscribers", SubscribeScheme);
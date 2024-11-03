const mongoose = require("mongoose");

const food = new mongoose.Schema({
    url: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
},
{timestamps: true});

module.exports = mongoose.model("foods", food);

// validateSchema.js
const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    }
});

module.exports = mongoose.model("foodData", foodSchema);

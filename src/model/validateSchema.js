// validateSchema.js
const mongoose = require("mongoose");

const validateSchema = new mongoose.Schema({
    isValidate: {
        type: Boolean,
        // default: false, // Optional: Set a default value if needed
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Validate", validateSchema);

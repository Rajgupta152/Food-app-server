const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URL } = process.env;

// Connected to db
exports.connect = () => {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Database connected successfully"))
        .catch((err) => {
            console.error("Connection failed:", err.message);
            process.exit(1); // Exit the process if the connection fails
        });
};

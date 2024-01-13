const express = require("express");
require("dotenv").config();
require("./src/connect/database").connect();
const getData = require("./src/router/getData");
const addData = require("./src/router/addData");
const login = require("./src/router/login");
const verifyUser = require("./src/router/verifyUser");
const addValidateLogin = require("./src/router/addValidateLogin");
const updateValidation =require("./src/router/updateValidateLogin");
const getLoginValidation = require("./src/router/getLoginValidation");

//Food api
const getFoodItem = require("./src/router/FoodApi/getFood")
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
}));
app.use(cookieParser());

app.get('/', (req,res) => {
    res.send("Hello this is home page");
})

app.use('/api',getData);
app.use('/api',addData);
app.use('/api',login);
app.use('/api',verifyUser);
app.use('/api',addValidateLogin);
app.use('/api',updateValidation);
app.use('/api',getLoginValidation);

// food api
app.use('/api',getFoodItem);

const PORT = process.env.PORT;
app.listen(PORT,() => {
    console.log("Server is running on port", PORT);
})

const express = require("express");
const schema = require("../model/userSchema");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const createSecretToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_KEY, {expiresIn: '300s'});
};

const comparePassword = async function(pass, comparePass) {
    try {
        const isPass = await bcrypt.compare(pass, comparePass);
        return isPass;
    } catch (error) {
        throw error;
    }
};

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.send({message: "All fields are required"});
    }

    try {
        const user = await schema.findOne({email: email});
        console.log(user);

        if (!user) {
            return res.send({message: "Invalid email or password"});
        }

        const pass = await comparePassword(password, user.password);
        console.log(pass);

        if (!pass) {
            return res.send({message: "Invalid email or password"});
        }

        const token = createSecretToken(user.id);

        res.cookie("token",token,{
            withCredentials: true,
            httpOnly: true,
        })
  
        res.status(200).send({status: true, message: "logged in", user: user, token: token});
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).send({status: false,message: "Internal Server Error"});
    }
});

module.exports = router;

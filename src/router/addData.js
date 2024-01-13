const express = require("express");
const schema = require("../model/userSchema");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createSecretToken = (id) => {
    return jwt.sign({id},process.env.TOKEN_KEY,{expiresIn: '300s'})
}

router.post('/addData',async(req,res) => {
    const{name,email,password} = req.body;
    const existingUser = await schema.findOne({email: email});
    console.log("existing user",existingUser);
    if(existingUser){
        return res.send({message: "User aleready exists"});
    }
    try{
        const data = await new schema({
            name,
            email,
            password
        });
        data.save();
        const token = createSecretToken(data.id);
        res.cookie("token",token,{
            withCredentials: true,
            httpOnly: false,
        })

        res.status(200).send({status: 'Success', msg: 'User registered succesfully', data: data});
    } catch(err){
        console.log(err);
        res.status(500).send({error: "Internal server error"});
    }
})

module.exports = router;
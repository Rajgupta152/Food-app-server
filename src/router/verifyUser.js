const express = require("express");
const schema = require("../model/userSchema");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
require("dotenv").config();

router.post('/verify',async (req,res) => {

    try{
        const token = req.cookies.token;
        jwt.verify(token, process.env.TOKEN_KEY,async (err,data) => {
            if(err){
                return res.send({error: "token expires"})
            } else{
                const user = await schema.findOne({id: data.id});
                console.log("user",user);
            }
        })
        res.status(200).send({msg: "Success"})
    } catch(err){
        console.log("err",err)
        res.status(500).send({error:"Internal server error"})
    }
})

module.exports = router;
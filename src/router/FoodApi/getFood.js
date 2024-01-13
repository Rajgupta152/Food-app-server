const express = require("express");
const schema = require("../../model/foodSchema");
const router = express.Router();

router.get('/getFoodItem',async(req,res) => {
    try{
        const data = await schema.find({});
        console.log(data);
        res.status(200).send({status: 'Success', msg: 'Data retrieved', data: data});
    } catch(err){
        console.log(err);
        res.status(500).send({error: "Internal server error"});
    }
})

module.exports = router;
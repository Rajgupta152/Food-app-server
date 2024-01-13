// routes.js (or wherever you handle routes)
const express = require("express");
const router = express.Router();
const Validate = require("../model/validateSchema");

router.get("/getLoginValidation", async (req, res) => {
    try {
        const data = await Validate.find({});
        // Save the document to the database
        console.log(data)
    
        res.status(200).json({
            status: "Success",
            message: "Validation updated successfully",
            data: data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;

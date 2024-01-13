// routes.js (or wherever you handle routes)
const express = require("express");
const router = express.Router();
const Validate = require("../model/validateSchema");

router.post("/addValidation", async (req, res) => {
    try {
        console.log("Request body",req.body);
        // Assuming the boolean value comes from the request body
        // const {isValidate} = req.body;

        // Create a new document
        const validationDocument = new Validate({
            isValidate: req.body.isValidate,
        });
        console.log("isValidate",validationDocument.isValidate);
        // Save the document to the database
        const savedDocument = await validationDocument.save();
        res.status(200).json({
            status: "Success",
            message: "Validation document added successfully",
            data: savedDocument,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;

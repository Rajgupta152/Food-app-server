// routes.js (or wherever you handle routes)
const express = require("express");
const router = express.Router();
const Validate = require("../model/validateSchema");
const { ObjectId } = require("mongodb");

router.put("/updateValidation", async (req, res) => {
    const {_id} = new ObjectId("657aa8a9662cdf39913a3476")
    const {isValidate} = req.body;

    try {
        const validationDocument = {
            isValidate
        };
        console.log("isValidate",validationDocument.isValidate);
        // Save the document to the database
        const updateValidation = await Validate.findByIdAndUpdate({_id: _id,},validationDocument,{new: true})
        res.status(200).json({
            status: "Success",
            message: "Validation updated successfully",
            data: updateValidation,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user = mongoose.Schema({
    id:{
        type: String,
        default: Math.random().toString()
    },
    name:{
        type: String,
        required: [true, "name is required"]
    },
    email:{
        type: String,
        required: [true, "email address is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "password is required"]
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});

user.pre("save", async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
      } catch (error) {
        return next(error);
      }
})

module.exports = mongoose.model("userData", user);
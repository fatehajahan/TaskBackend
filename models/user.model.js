const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email:{
        type: String
    },
    password:{
        type: String
    }
})

module.exports = mongoose.model("User", userSchema)
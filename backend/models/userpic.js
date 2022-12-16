const validator = require("validator");
const mongoose = require('mongoose');
const {ObjectId}= mongoose.Schema.Types

const Userpicschema = new mongoose.Schema({
    uppic: {
        type: String,
        required :true,
    },
    postedBy:{
        type:ObjectId,
        ref:"Register"
    }
})


const Userprofilepic = new mongoose.model("Userprofilepic",Userpicschema);

module.exports = Userprofilepic;
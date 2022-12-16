const validator = require("validator");
const mongoose = require('mongoose');
const {ObjectId}= mongoose.Schema.Types

const PhotoSchema = new mongoose.Schema({
    title: {
        type: String,
        required :true,
        minlenght:3,
    },
    description: {
        type: String,
        required :true,
        minlenght:3,
    },
    image:{
        type:String,
        required :true,
    },
    likes:[{type:ObjectId,ref:"Register"}],
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"Register"}
    }],
    postedBy:{
        type:ObjectId,
        ref:"Register"
    }
})


const Userphoto = new mongoose.model("Userphoto",PhotoSchema);

module.exports = Userphoto;
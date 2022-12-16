const validator = require("validator");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {ObjectId}= mongoose.Schema.Types

const UserSchema= new mongoose.Schema({
    Firstname: {
        type: String,
        required :true,
        minlenght:3,
    },
    Lastname: {
        type: String,
        required :true,
        minlenght:3,
    },
    email:{
        type:String,
        unique:[true,"email id already present"],
        require:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("email incorrect");
            }
        }   
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    confirmpassword:{
        type:String,
        require:true
    },
    phoneno :{
        type:Number,
        min:10,
        require:true,
    },
    address:{
        type:String,
        required:true,
    },
    // photo:{
    //     type:ObjectId,
    //     ref:"Register"
    // },
    // photo:{
    //     type:String,
    //     required:true,
    // },
    // gender:{
    //     type:String,
    //     required:true
    // },
    // terms:{
    //     type:String,
    //     required:true
    // },
    date:{
        type:Date,
        default:Date.now
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    followers:[{type:ObjectId,ref:"Register"}],
    following:[{type:ObjectId,ref:"Register"}],

})

UserSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        // console.log(token);
        // console.log("hii");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        res.send("the error is"+ error);     
    }
}


UserSchema.pre("save",async function(next) {
    if(this.isModified("password")){
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password,10);
        console.log(`the updated password is ${this.password}`);
        this.confirmpassword = await bcrypt.hash(this.password,10);
    }
    next();
})


const Register = new mongoose.model("Register",UserSchema);

module.exports = Register;

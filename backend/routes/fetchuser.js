const express = require("express");
// const  bodyParser =  require("body-parser");
const route = express.Router();
const Register = require("../models/register");
const Userphoto = require("../models/photo");
require("../db");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const { Router } = require("express");
// const cookieparser = require("cookie-parser");

// route.use(cookieparser());

route.post("/registration",async (req,res)=>{
    try{
        const {Firstname,Lastname,email,age,password,confirmpassword,phoneno,address,gender,terms}= req.body;
        const userexist = await Register.findOne({email});
        if(userexist){
            res.status(422).json({error:"email already exists"});
            return;
        }
        if(password != confirmpassword){
            res.status(422).json({error:"password not matching"});
            return;
        }
        if(password === confirmpassword){
            const newuser = new Register({Firstname,Lastname,email,age,password,confirmpassword,phoneno,address,gender,terms})

            // console.log(newuser);

            const token = await newuser.generateAuthToken();
            // console.log(token);
            
            res.cookie("jwt",token);
            // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmZmNmU0ZTMyZGVmOTdkZDNkMWZiNTQiLCJpYXQiOjE2NjA5MDcwODZ9.NnkA7QgZZKgYNbXklGw_HshKENurU8uA4Y5mCL-ZU9g

            const registered = await newuser.save();
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

route.post("/login",async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({email});

        console.log(useremail);

        if (!useremail) {
            errors.email = "User not found";
            res.status(404).json({ errors });
            // console.log("hii")
            return;
        }
        const ismatch = await bcrypt.compare(password,useremail.password);
        // console.log(ismatch);

        const token = await useremail.generateAuthToken();
        // console.log(token);
        
        res.cookie("jwt",token);
        
        if(ismatch){
            // res.status(201).redirect("/");
            res.json({useremail});
            // console.log(user);
        }
    } catch (error) {
       res.status(400).send("invalid details"); 
    }
})

// route.get("/logout",auth,async(req,res)=>{
//     try {
//         res.clearCookie("jwt");

//         req.user.tokens = req.user.tokens.filter((current)=>{
//             return current.token != req.token;
//         })

//         console.log("logout successfully");
//         await req.user.save();
//         res.redirect("login");

//     } catch (error) {
//         res.send(401).send(error);
//     }
// })

route.get("/secret",auth,(req,res)=>{
    res.send(req.user);
    // res.render("secret");
})

route.get("/getdata",auth,(req,res)=>{
    res.send(req.user);
    // const {uppic} = req.body
    // console.log(uppic);
    // Register.findByIdAndUpdate(req.user._id,{
    //     $push:{photo:uppic}
    // },{
    //     new:true
    // }).exec((err,result)=>{
    //     if(err){
    //         return res.status(422).json({error:err});
    //     }
    //     else{
    //         res.json(result);
    //     }
    // })
})


route.get("/logout",(req,res)=>{
    res.clearCookie("jwt");
    res.status(200).send("user logout");
})

module.exports = route;
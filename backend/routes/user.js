const express = require("express");
const route = express.Router();
const Register = require("../models/register");
const Userphoto = require("../models/photo");
require("../db");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const { Router } = require("express");
route.get("/profile/:id",auth,(req,res)=>{
    Register.findOne({_id:req.params.id})
    .select("-password").
    then(user=>{
        Userphoto.find({postedBy:req.params.id}).
        populate("postedBy","_id Firstname")
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,posts})
        })
    }).catch(err=>{
        return res.status(422).json({error:"user not found"});
    })
})


route.put("/follow",auth,(req,res)=>{
    Register.findByIdAndUpdate(req.user._id,{
        $push:{following:req.body.followId}
    },{new:true},
    (err=>{
        if(err){
            return res.status(422).json({error:err})
        }
        Register.findByIdAndUpdate(req.body.followId,{
            $push:{followers:req.user._id}
        },{new:true}).select("-password").then(user=>{
            Userphoto.find({postedBy:req.params.id})
            .exec((err,posts)=>{
                if(err){
                    return res.status(422).json({error:err})
                      
                }
                res.json({user,posts})
            })
        })
    }));
})
route.put("/unfollow",auth,(req,res)=>{
    Register.findByIdAndUpdate(req.user._id,{
        $pull:{following:req.body.unfollowId}
    },{new:true},
    (err=>{
        if(err){
            return res.status(422).json({error:err})
        }
        Register.findByIdAndUpdate(req.body.unfollowId,{
            $pull:{followers:req.user._id}
        },{new:true}).select("-password").then(user=>{
            Userphoto.find({postedBy:req.params.id})
            .exec((err,posts)=>{
                if(err){
                    return res.status(422).json({error:err})    
                }
                res.json({user,posts})
            })
        })
    }));
})

module.exports = route;

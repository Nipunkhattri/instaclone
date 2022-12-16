const express = require("express");
// const  bodyParser =  require("body-parser");
const route = express.Router();
const Register = require("../models/register");
const Userphoto = require("../models/photo");
const Userprofilepic = require("../models/userpic");
require("../db");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const cloudinary = require("../middleware/cloudinary")
const { Router } = require("express");
const formidable = require("formidable");
const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var stream = require('stream');


// route.put('/:id', upload.single('photo'), function(req, res, next) {
//     var upload_stream = cloudinary.v2.uploader.upload_stream(function(err,photo) {   
//     res.send(photo.secure_url);
//   });
//   console.log(upload_stream);



route.get("/allpost",auth,(req,res)=>{
    Userphoto.find()
    .populate("postedBy","_id Firstname email")
    .populate("comments.postedBy","_id Firstname").
    then(posts=>{
        res.json({posts})
    }).catch(error=>{
        console.log(error);
    })
})
route.get("/uploadedimg",auth,(req,res)=>{
    Userprofilepic.find()
    .populate("postedBy","_id Firstname email")
    then(pic=>{
        res.json({pic})
    }).catch(error=>{
        console.log(error);
    })
})

route.post("/uploadimg",auth,async(req,res)=>{
    try {
        const {uppic} = req.body;
        // console.log(uppic);
        if(!uppic){
            res.status(422).json({error:"fill data"});
            return;
        }
        const newupload = await new Userprofilepic({
            uppic,
            postedBy:req.user
        })

        await newupload.save();

        return res.status(200).json(JSON.stringify(
            // data: 'Okay',
            // success:true,
            newupload
        ));
    } catch (error) {
        res.status(400).send(error);
    }
})

route.post("/createpost",auth,async (req,res)=>{
    try {
        const {title,description,image} = req.body;
        // console.log(image);
        // console.log(title);
        // console.log(description);
        if(!title || !description || !image){
            res.status(422).json({error:"fill data"});
            return;
        }
        req.user.password = undefined;
        // // const newpost = new Userphoto({title,description,photo,postedBy:req.user});
        const newpost = await new Userphoto({
            title,
            description,
            image,
            postedBy:req.user
        });
        // const userpostdata = await Register.findOne({title});

        // const Newtoken = await userpostdata.generateAuthToken();
        // console.log(Newtoken);
        
        // res.cookie("photojwt",Newtoken);
        await newpost.save();
        // // console.log(newpost);
        return res.status(200).json(JSON.stringify({
            data: 'Okay',
            success:true,
            newpost
        }));
        // next();
    } catch (error) {
        res.status(400).send(error);
    }
})

route.get("/mypost",auth,(req,res)=>{
        Userphoto.find({postedBy:req.userid})
        .populate("postedBy","_id Firstname email")
        .then(mypost=>{
            res.json({mypost})
        }).catch(error=>{
            console.log(error);
        })
})

route.put("/likes",auth,(req,res)=>{
    Userphoto.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.userid}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err});
        }
        else{
            res.json(result);
        }
    })
})
route.put("/comment",auth,(req,res)=>{
    const comment={
        text:req.body.text,
        postedBy:req.user
    }
    Userphoto.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id Firstname")
    .populate("postedBy","_id Firstname")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err});
        }
        else{
            res.json(result);
        }
    })
})
route.put("/unlikes",auth,(req,res)=>{
    Userphoto.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.userid}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err});
        }
        else{
            res.json(result);
        }
    })
})


route.delete('/deletepost/:postId',auth,(req,res)=>{
    Userphoto.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.userid.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})

module.exports = route;





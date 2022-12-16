const jwt = require("jsonwebtoken");
const photojwt = require("jsonwebtoken");
const Register = require("../models/register");

const auth = async (req,res,next)=>{
    console.log("hii");
    try {
        const token = req.cookies.jwt;
        // const Newtoken = req.cookies.photojwt;
        // console.log(token);
        const verifyuser = jwt.verify(token,process.env.SECRET_KEY);
        // const verifynewpost = jwt.verify(Newtoken,process.env.SECRET_KEY);
        // console.log(verifyuser);
        
        const user = await Register.findOne({_id:verifyuser._id});
        // const userpost = await Userphoto.findOne({_id:verifynewpost._id});
        // console.log(token);

        req.token=token;
        req.user=user;
        req.userid= user._id;
        next();
    } catch (error) {
        res.status(401).send("no token ..");
        console.log(error);
    }
}

module.exports = auth;


// "proxy": {
//     "/auth/google": {
//       "target": "localhost:5000"
//     }
//   }
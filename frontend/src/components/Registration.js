import React, { useState} from 'react';
import {useNavigate} from "react-router-dom";
import myimage from "../Instaphoto.jpg"

const Registration = () => {

  const history = useNavigate();

  const[user,setuser]=useState({
  Firstname:"",Lastname:"",email:"",age:"",password:"",confirmpassword:"",phoneno:"",address:""
  })

  let name,value;

  const handleinputs=(e)=>{
    // console.log(e);
    name= e.target.name;
    value = e.target.value;

    setuser({...user,[name]:value})
  }

  const postdata = async (e)=>{
    e.preventDefault();
    const {Firstname,Lastname,email,age,password,confirmpassword,phoneno,address} = user;
    // console.log(user.Firstname);
    // console.log(user.photo);


    const res = await fetch("/registration",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        Firstname,Lastname,email,age,password,confirmpassword,phoneno,address
      })
    });

    // console.log(res);
    
    const data = await res.json();
    // console.log(data.photo);

    if(data.status === "422"|| !data){
      window.alert("invalid registration")
    }

      window.alert("succesfully register");
      history("/login");
    
  }

  return (
    <>
      <section id="register">
{/* <h1 className="now">Register Now!!</h1> */}
<div className="container reg-box">
    <div className="row box">
        <div className="col-lg-6 col-md-12 col-sm-12 reg-left">
            <img className="img-reg"  src={myimage} alt=""/>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 reg-right">
        <form className="input-text"> 
            <div className="row first">
                <div className="col-lg-6 col-md-6">
                    <input type="text" name="Firstname" className="form-control firstinput" placeholder="First name"
                    value={user.Firstname}
                    onChange={handleinputs}/>
                </div>
                <div className="col-lg-6 col-md-6">
                <input type="text" name="Lastname" className="form-control" placeholder="Last name"
                value={user.Lastname}
                onChange={handleinputs}/>
                </div>
            </div>
            <div className="row second">
                <div className="col-lg-6 col-md-6">
                <input type="email" name="email" className="form-control secoundinput" placeholder="Email" id="inputEmail4"
                value={user.email}
                onChange={handleinputs}/>
                </div>
                <div className="col-lg-6 col-md-6">
                <input type="number" name="age" className="form-control" placeholder="age" id="inputage"
                value={user.age}
                onChange={handleinputs}/>
                </div>
            </div>
            <div className="row third">
                <div className="col-lg-6 col-md-6">
                <input type="password" name="password"  className="form-control thirdinput" placeholder="Password" id="inputpassword"
                value={user.password}
                onChange={handleinputs}/>
                </div>
                <div className="col-lg-6 col-md-6">
                <input type="password" name="confirmpassword" className="form-control" placeholder="confirmpassword" id="confirmpassword"
                value={user.confirmpassword}
                onChange={handleinputs}/>
                </div>
            </div>
            <div className="form-group adress">
    <input type="text" className="form-control" id="inputAddress" name="address" placeholder="Address"
    value={user.address}
    onChange={handleinputs}/>
  </div>
  <div className="row four">
   <div className="form-group col-md-4 col-md-6">
      <input type="number" name="phoneno" placeholder="phoneno" className="form-control" id="inputphone"
      value={user.phoneno}
      onChange={handleinputs}/>
    </div>
    {/* <div className="form-group col-md-4 col-md-6">
      <label for="male">Male</label>
        <input type="radio" name="gender" id="male" value="male" checked
        onChange={handleinputs}/>
        <label for="female">Female</label>
        <input type="radio" name="gender" id="female"
        value="female"
        onChange={handleinputs}/>
    </div> */}
  </div>
  {/* <input type="checkbox"name="terms"
  value="true"
  onChange={handleinputs}/>
  <label for="vehicle1"> I accept terms and conditions..</label><br/> */}
        <button type="submit" value="Register" className="btn btn-primary" onClick={postdata}>Register</button>
        </form>
        </div>
    </div>
</div>
</section>
    </>
  )
}

export default Registration

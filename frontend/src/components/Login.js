import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {

  const {state,dispatch} = useContext(UserContext);
  const history = useNavigate();
  const [email , setEmail]=useState("");
  const [password , setPassword]=useState("");

  const userlogin= async (e)=>{
    e.preventDefault();
    
    const res = await fetch("/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,password
      })
    });

    // const responseClone = res.clone(); 

    const data = await res.json();
    // console.log(data);

    if(data.status === "404"|| !data){
      window.alert("invalid login")
    }
    else{
      localStorage.setItem("useremail",JSON.stringify(data.useremail))
      window.alert("succesfully logged");
      dispatch({type:"USER",payload:true});
      history("/");
    }
  }
  return (
    <>
      <div className="text-center logininput ">
        {/* <img className="mb-4 imglogin img-loginimg" src="loginimg.jpg" alt="" height="12" width="72" /> */}
        <form className="form-signin" id="form-signin-id" methord="post">
          {/* <h4
            id="email-error"
            style={{ display: "none;", color: "red", fontsize: "12pt;" }}
          >
            Invalid Email!!
          </h4>
          <h4
            id="password-error"
            style={{ display: "none;", color: "red", fontsize: "12pt;" }}
          >
            Password blank!!
          </h4> */}
          <h1 className="h3 mb-3 instafont font-weight-normal">Instagram</h1>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <button
            type="button"
            value="login"
            className="btn-login btn-primary"
            onClick={userlogin}
          >
            Login
          </button>
          <p className="mt-2 mb-3 text-muted">© 2022</p>
          <div>
            Don't have account-<a href="/registration">Register Now..</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

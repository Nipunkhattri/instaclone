import React from 'react'
import  {useContext,useEffect} from "react";
import  {useNavigate}  from "react-router-dom";
import { UserContext } from "../App";
const Logout = () => {

  const {state,dispatch} = useContext(UserContext);
const history = useNavigate();
useEffect(()=>{
    fetch("/logout",{
        method: "GET",
        headers: {
            Accept: "appllication/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
      }).then((res)=>{
        history("https://spontaneous-puppy-e977d7.netlify.app/login");
        dispatch({type:"USER",payload:false});
        if(res.status!==200){
            const error = new Error(res.error);
            throw error;
        }
      }).catch((err)=>{
        console.log(err);
      })
});
  return (
    <div>
    </div>
  )
}

export default Logout

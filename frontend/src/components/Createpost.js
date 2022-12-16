import axios from 'axios';
import React from 'react'
import {useContext , useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { UserContext } from "../App";

const Createpost = () => {
  const history = useNavigate();
  const {state,dispatch} = useContext(UserContext);
  const userpostPage = async () =>{
    try {
      const res = await fetch("/getdata", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          });
          const data = await res.json();
          //   setusername(data.Firstname+data.Lastname);
          
          if (!res.status === "200") {
            const error = new Error(res.error);
            throw error;
          }else{
            dispatch({type:"USER",payload:true});
            history("/createpost");
          }
        } catch (error) {
          history("/login");
        }
      }
      
      useEffect(() => {
        userpostPage();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
      
      // console.log(image);


const [image,setImage] = useState("")
const [title,setTitle] = useState("")
const [description,setdescription] = useState("")


const handlefile = async (e)=>{
  const file = e.target.files[0];
  const base64 = await previewFiles(file);
  // console.log(base64);
  // console.log(typeof(base64));
  setImage( ...image, base64);
}

const previewFiles=(file)=>{
  return new Promise((resolve, reject) => {
    const reader = new FileReader();  
    reader.readAsDataURL(file);   
    reader.onload=()=>{
      resolve(reader.result);
    }
    reader.onerror = (error)=> {
      reject(error)
    };
  });
}

const Createnewpost = async (e)=>{
    e.preventDefault();

    const res = await fetch("/createpost",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        title,description,image
      })
    });
    const data = await res.json();
    // console.log(data);
    // console.log("hello");

    if(data.status === "400"|| !data){
      window.alert("invalid post")
    }
    else{
      window.alert("succesfully posted");
      // console.log("hii");
    //   dispatch({type:"USER",payload:true});
      history("/");
    }
  }

  // useEffect(() => {
  //     Createnewpost();
  //   }, []); // eslint-disable-line react-hooks/exhaustive-deps



  // useEffect(()=>{
  //     if(url){
  //      fetch("/createpost",{
  //          method:"post",
  //          headers:{
  //              "Content-Type":"application/json",
  //          },
  //          body:JSON.stringify({
  //              title,
  //              description,
  //              photo:url
  //          })
  //      }).then(res=>res.json())
  //      .then(data=>{

  //       if(data.status === "400"|| !data){
  //               window.alert("invalid post")
  //             }
  //             else{
  //               window.alert("succesfully posted");
  //             //   dispatch({type:"USER",payload:true});
  //               history("/");
  //             }
  //      }).catch(err=>{
  //          console.log(err)
  //      })
  //  }
  //  },[url])

  // const postdetails=()=>{
  //   const data = new FormData()
  //   data.append("file",image)
  //   data.append("upload_preset","Insta-clone")
  //   data.append("CLOUD_NAME","dnqnpv9dq")
  //   data.append("API_KEY","435758926969971")
  //   data.append("API_SECRET","KFCDPBN7qHVHyjcpbsmwOt1tWz0")
  //   axios.post("https://api.cloudinary.com/v1_1/dnqnpv9dq/image/upload",data)
  //   .then((res)=>{
  //     console.log(res);
  //   })
  // } 

  return (
    <>
    <div className="text-center logininput container">
      <form className="form-signin" id="form-signin-id" methord="post">
          <h1 className="h3 mb-3 font-weight-normal">Create Post..</h1>
          <input
            type="text"
            id="inputText"
            className="form-control"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}/>
          <input
            type="text"
            id="textarea"
            className="form-control"
            placeholder="Description"
            name="description"
            value={description}
            onChange={(e)=>setdescription(e.target.value)}
          />
          <label for="myfile">Select a photo:</label>.
          <input type="file" id="myfile" name='file' onChange={handlefile}/>
          <button
            type="submit"
            className="btn-post btn-primary"
            onClick={Createnewpost}
          >
            Post
          </button>
        </form>
    </div>
    <div class="text-center  p-3" style={{"background-color": "black","position":"absolute",
    "width": "100%",
    "bottom": "0",
    "position":"fixed"}}>
      <a class="text-light" href="https://github.com/Nipunkhattri">Made by Nipun Khatri</a>
    </div>
    </>
  )
}

export default Createpost

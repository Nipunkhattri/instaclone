import React from 'react'
import myimage from "../nipunimg.png"
import { useEffect, useState,useContext } from "react";
import  {useNavigate}  from "react-router-dom";
import { UserContext } from "../App";

const Profile = () => {
  // window.location.reload(false);
    const {state,dispatch} = useContext(UserContext);
    const history = useNavigate();
    const [username,setusername] = useState("");
    const [following,setfollowing] = useState("");
    const [followers,setfollowers] = useState("");
    const [photo,setphoto] = useState("");
    const [mypics,setpic] = useState([]);
    // console.log(state);
    
    const userprofilePage = async () =>{
        // e.preventDefault();
      try {
        const res = await fetch("/getdata", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        // console.log(data);
        setfollowing(data.following.length)
        setfollowers(data.followers.length)
        setusername(data.Firstname+data.Lastname);
        // setuppic(data.photo);
        if (!res.status === "200") {
            const error = new Error(res.error);
            throw error;
        }else{
            dispatch({type:"USER",payload:true});
            history("/profile");
        }
      } catch (error) {
        history("/login");
      }
    }
  
    useEffect(() => {
      userprofilePage();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
      fetch("/mypost",{
      }).then(res=>res.json())
      .then(result=>{
        setpic(result.mypost)
      })
    })

    
    const [uppic,setuppic] = useState("");

    
    const uploadimage = async (e)=>{
      const file = e.target.files[0];
      console.log(file);
      const base64 = await previewFiles(file);
      setuppic( ...uppic, base64);
      // console.log(uppic)
    }

    const previewFiles =(file)=>{
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


  
const upload = async ()=>{
  const res = await fetch("/uploadimg",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      uppic
    })
  });

  const data = await res.json();
  console.log(data);
  // console.log(data)
  if(data.status === "400"|| !data){
    window.alert("not uploaded")
  }
  else{
    window.alert("successfully uploaded");
  //   dispatch({type:"USER",payload:true});
    // history("/");
  }
}

const [imgpic,setimgpic] = useState({});
useEffect(()=>{
  fetch("/uploadedimg",{
    method:"GET", 
  }).then(res=>res.json())
  .then(result=>{
    // console.log(result);
    setimgpic(result.pic)
  })
},[])

  
  return (
    <>
     <div className="container profilebox">
        <div className="row header">
            <div  className="col-lg-4 col-sm-6 lefthead">
                <img id='imageup' src={imgpic.uppic?imgpic.uppic:"https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt="" className='profileimg'/>
                {/* <input type="file"  onChange={uploadimage}/>
                <button type="button" onClick={upload} class="btn btn-primary">upload</button> */}
            </div>
            <div className="col-lg-8 col-lg-6 righthead">
            <h3>{username}</h3>
            <div style={{margintop:"19px"}}>
            <ul className='textarea1'>
                <li>{mypics.length} posts</li>
                <li>{followers}followers</li>
                <li>{following}Following</li>
            </ul>
            </div>
            <div>
            <ul className='textarea2'>
                <li>{username}</li>
                <li>jssaten</li>
            </ul>
            </div>
            </div>
        </div>  
        <br />
    <hr />
    <div className="row">
      {
        mypics.map(item=>{
          return(
        <div className="col-lg-4 col-sm-6 profilecard">
          <img className="imagesposted" src={item.image} alt="" />
        </div>
          )
        })
      }
    </div>
    </div> 
    </>
  )
}

export default Profile

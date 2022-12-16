import React from "react";
import myimage from "../nipunimg.png";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
// import { initialstate } from '../reducer/userreducer';
import axios from "axios";
const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [post, setPost] = useState([]);
  // const [item, setItems] = useState([]);
  const [userfollow, setfollowuser] = useState({});
  const { state, dispatch } = useContext(UserContext);
  const history = useNavigate();
  const [username, setusername] = useState("");
  const [showfollow, setshowfollow] = useState(true);
  const [regid, setregid] = useState("");
  const { userid } = useParams();
  console.log(userid);
  const [bl, setBl] = useState(false);
  const userprofilePage = async () => {
    // e.preventDefault();
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data)
      setusername(data.Firstname + data.Lastname);
      setregid(data._id);
      
      if (!res.status === "200") {
        const error = new Error(res.error);
        throw error;
      }
      else if(userid){
        dispatch({ type: "USER", payload: true });
        history(`/profile/${userid}`);
      }
      else{
        dispatch({ type: "USER", payload: true });
        history('/profile/');
      }
    } catch (error) {
      history("/login");
    }
  };
// let prof={};
  useEffect(() => {
    userprofilePage();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  
  const anotheruserprofile = async (e) => {
    // e.preventDefault();
    
    axios
    .get(`/profile/${userid}`)
    .then((response) => {
      console.log(response.data);
        setProfile({... response.data.user})
        setPost([... response.data.posts])
      })
      .catch(error => 
        console.error(`${error}`)
        );
      };
      
      useEffect(() => {
          anotheruserprofile();
        }, []); // eslint-disable-line react-hooks/exhaustive-deps
        
      //   // anotheruserprofile();
      //   console.log(profile)
      //   console.log(post.length)
  //     let len=0;
  //     let len1=0;
  //  async function follows()
  // {
  //   len=await profile.followers.length;
  //   len1=await profile.following.length;
  //     console.log("helo",len,len1);
    
  // }
  // useEffect(() => {
    
  //   console.log(prof);
  //   console.log("OOr bhai")
    
  //   if (prof) {
  //     setProfile(prof.user);

  //     setPost(prof.posts);
      
  //     // console.log(profile.followers.length);
      
  //   }
    
    
  // }, [username]);
  
  
  

  const followuser=()=>{
    fetch(`/follow`,{
      method:"put",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        followId:userid
      })
    }).then(res=>res.json())
    .then(result=>{
      console.log(result)
      if(result){
        setProfile(result.user);
        // setPost(result.posts);
        localStorage.setItem("profile",JSON.stringify(result))
        // console.log(profile)
        console.log("hii")
      }
      else{
        const profile = JSON.parse(localStorage.getItem('profile'));
        console.log(profile);
        if (profile) {
         setProfile(profile.user);
        //  setPost(profile.posts);
        }
      }
      // dispatch({ type: "UPDATE", payload:{following:result.following,followers:result.followers}});
      setshowfollow(false)
    })
  }
  const unfollowuser=()=>{
    fetch(`/unfollow`,{
      method:"put",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        unfollowId:userid
      })
    }).then(res=>res.json())
    .then(result=>{
      console.log(result)
      if(result){
        setProfile(result.user);
        // setPost(result.posts);
        localStorage.setItem("profile",JSON.stringify(result))
        // console.log(profile)
        console.log("hii")
      }
      else{
        const profile = JSON.parse(localStorage.getItem('profile'));
        console.log(profile);
        if (profile) {
         setProfile(profile.user);
        //  setPost(profile.posts);
        }
      }
      // dispatch({ type: "UPDATE", payload:{following:result.following,followers:result.followers}});
      setshowfollow(true);
    })
  }
  console.log(showfollow);


  return (
    <>
      <div className="container profilebox">
        <div className="row header">
          <div className="col-lg-4 lefthead">
            <img src={myimage} alt="" className="profileimg" />
          </div>
          <div className="col-lg-8 righthead">
            <h3>{profile.Firstname}</h3>
            <div style={{ margintop: "19px" }}>
              <ul className="textarea1">
                {/* {console.log({profile})} */}
                <li>{post.length} posts</li>
                <li>{profile.followers?.length} followers</li> 
                <li>{profile.following?.length} Following</li>
              </ul>
            </div>
            <div>
              <ul className="textarea2">
                <li>{profile.Firstname}</li>
                <li>jssaten</li>
              </ul>
            </div>
            {console.log(regid)}
            {console.log(profile.followers)}
            {console.log(profile.followers?.includes(regid))}
            {profile.followers?.includes(regid)?<button onClick={unfollowuser} type="button" class="btn btn-primary">unfollow</button>:<button onClick={followuser} type="button" class="btn btn-primary">follow</button>}
            {/* {showfollow?<button onClick={followuser} type="button" class="btn btn-primary">follow</button>:<button onClick={unfollowuser} type="button" class="btn btn-primary">unfollow</button>} */}
          </div>
        </div>
        <hr />
        <div className="row">
      {
        post.map(item=>{
          return(
        <div className="col-lg-4 profilecard">
          <img className="imagesposted" src={item.image} alt="" />
        </div>
          )
        })
      }
    </div>
      </div>
</>
  );
};

export default UserProfile;

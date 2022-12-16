import React, { useEffect, useState,useContext } from "react";
import { UserContext } from "../App";
import { initialstate } from "../reducer/userreducer";
import {Link} from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  {useNavigate}  from "react-router-dom";
import "../App.css"


const Home = () => {
  const [username, setusername] = useState("");
  const [State, setState] = useState(initialstate);
  // const [title, settitle] = useState("");
  // const [photo, setphoto] = useState("");
  // const [description, setdescription] = useState("");
  // var postarr = [];
  const history = useNavigate();
  const {state,dispatch} = useContext(UserContext);
  const userHomePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
      setusername(data.Firstname);
      setState(data);
      
      if (!res.status === "200") {
        const error = new Error(res.error);
        throw error;
      }else{
        dispatch({type:"USER",payload:true});
        // history("/registration");
      }
    } catch (error) {
      history("/registration");
    }
  };

  useEffect(() => {
    userHomePage();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  
  const [data , setdata]= useState([]);
  useEffect(()=>{
    fetch("/allpost",{
      method:"GET",
    }).then(res=>res.json())
    .then(result=>{
      // console.log(result);
      setdata(result?.posts)
    })
  },[])

  // const userpostdata = async () => {
  //   try {
  //     const res = await fetch("/getpostdata", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = await res.json();
  //     postarr.append(data);
  //     settitle(data.title);
  //     setphoto(data.photo);
  //     setdescription(data.description);
  //     console.log(postarr);

  //     if (!res.status === "200") {
  //       const error = new Error(res.error);
  //       throw error;
  //     }
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   userpostdata();
  // }, []);
 
  // const elem = document.getElementsByClassName("fa-heart")
  const likePost = (id)=>{
    fetch("/likes",{
      method:"put",
      headers:{
        "Content-Type":"application/json"
      },body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json()).then(result=>{
      const newdata = data.map(item=>{
        // console.log(item._id);
        // console.log(result);
      if(item._id===result._id){
        return result;
      }else{
        return item;
      }
    })
    setdata(newdata);
  }).catch(err=>{
    console.log(err);
  })
  }
  const unlikePost = (id)=>{
    fetch("/unlikes",{
      method:"put",
      headers:{
        "Content-Type":"application/json"
      },body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json()).then(result=>{
      const newdata = data.map(item=>{
        // cout{<<item._id;
        if(item._id===result._id){
          return result;
        }else{
          return item;
        }
      })
      setdata(newdata);
    }).catch(err=>{
      console.log(err);
    })
  }
  // console.log(state);
  const makecomment = (text,postId)=>{
    fetch("/comment",{
      method:"put",
      headers:{
        "Content-Type":"application/json"
      },body:JSON.stringify({
        postId,text
      })
    }).then(res=>res.json()).then(result=>{
      // console.log(result);
      const newdata = data.map(item=>{
        if(item._id===result._id){
          return result;
        }else{
          return item;
        }
      })
      setdata(newdata);
    }).catch(err=>{
      console.log(err);
    })
  }


  const deletePost = (postid)=>{
    fetch(`/deletepost/${postid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.filter(item=>{
            return item._id !== result._id
        })
        setdata(newData)
    })
}

  return (
    <div id="whole">
      <div id="home">
        <div className="home-text container">
          <h2 className="text instafont">Insta Clone</h2>
        </div>
      </div>
      <h1 className="text-center reg-home"> wellcome back!!{username}</h1>
      {
        data.map(item=>{
          return(
      <div className="container code-content" key={item._id}>
        <div className="row">
          <div
            className="card homecard"
            // style={{
            //   width: "57%",
            //   height: "693px",
            //   display: "block",
            //   boxShadow:"1px 1px 6px 1px",
            //   margin: " 19px auto",
            //   border: "2px solid black",
            // }}
          >
            {/* {console.log(JSON.stringify(Object.values({username})).slice(5,2))} */}
            {console.log(State._id)}
            {console.log(item.postedBy._id)}  
            <h5 style={{cursor:"pointer"}}><Link to={item.postedBy._id !== State._id?"/profile/"+item.postedBy._id:"/profile"}>{item.postedBy.Firstname}</Link>{item.postedBy._id==State._id &&  <i class="fa fa-trash" style={{
                              float:"right"
                            }}
                            onClick={()=>deletePost(item._id)}
                            ></i>
                          }</h5>
            <img src={item.image} class="card-img-top homeimg" alt="..." />
            <div class="card-body">
            {item.likes.includes(State._id)
              ?<i class="fa-sharp fa-solid fa-heart fillred"  icon={["fas", "coffee"]} onClick={()=>{unlikePost(item._id)}} style={{marginLeft:"11px"}}></i>
              :<i class="fa-regular fa-heart" onClick={()=>{likePost(item._id)}} style={{marginLeft:"11px"}}></i>}
              <h6>{item.likes.length}  </h6>
              <h5 class="card-title title">{item.title}</h5>
              <p class="card-text des">{item.description}</p>

              {/* {console.log(item.postedBy.Firstname)} */}
              <div className="comment-div">
              {
                item.comments.map(record=>{
                  console.log(record.postedBy.Firstname)
                  return(
                    <h5><span style={{fontWeight:"500"}}>{record.postedBy.Firstname}</span> {record.text}</h5>
                )
                })
              }
              </div>
                      <form onSubmit={(e)=>{
                        e.preventDefault()
                        makecomment(e.target[0].value,item._id);
                      }}>
                          <input type="text" style={{width:"100%"}} placeholder="Add a comment…"></input>
                          </form>
          
              {/* <i class="fa-solid fa-heart" onClick={()=>{likePost(item._id)}}></i> */}
              {/* {console.log(item.likes.includes(state._id))} */}
              {/* {console.log(item.likes.includes(item.postedBy._id))} */}
            </div>
          </div>
        </div>
      </div>
        )
        })
      }
    </div>
  );
};

export default Home;

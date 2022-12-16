import React from "react";
import {NavLink} from "react-router-dom";
import  {useEffect} from "react";
import  {useNavigate}  from "react-router-dom";

const Secret = () => {
    const history = useNavigate();
    const callaboutpage = async ()=>{
        try {
            const res = await fetch("/secret", {
          method: "GET",
          headers: {
              Accept: "appllication/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await res.json();
        console.log(data);
        
        if (!res.status === "200") {
            const error = new Error(res.error);
            throw error;
        }
    } catch (error) {
        // window.alert("login...");
        history("/login");
    }
};
useEffect(() => {
callaboutpage();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div>
      <div id="home">
        <div class="home-text container">
          <h1 class="text">ShareCode</h1>
          <h3 class="text2">excess globally...</h3>
        </div>
      </div>
      <div class="container code-content">
        <div class="row">
          <div class="col-lg-4">
            <div class="card " style={{ width: "18rem" }}>
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <NavLink to="/" class="btn-code-primary">
                  Go somewhere
                </NavLink>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card " style={{ width: "18rem" }}>
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <NavLink to="/" class="btn-code-primary">
                  Go somewhere
                </NavLink>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card" style={{ width: "18rem" }}>
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <NavLink to="/" class="btn-code-primary">
                  Go somewhere
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container code-content">
        <div class="row">
          <div class="col-lg-4">
            <div class="card " style={{ width: "18rem" }}>
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <NavLink to="/" class="btn-code-primary">
                  Go somewhere
                </NavLink>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card " style={{ width: "18rem" }}>
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <NavLink to="/" class="btn-code-primary">
                  Go somewhere
                </NavLink>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card" style={{ width: "18rem" }}>
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <NavLink to="/" class="btn-code-primary">
                  Go somewhere
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Secret;

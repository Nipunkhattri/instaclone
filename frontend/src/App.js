import './App.css';
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Login from "./components/Login"
import Registration from "./components/Registration"
import Secret from "./components/Secret"
import Logout from "./components/Logout"
import Profile from "./components/Profile"
import {Routes,Route} from "react-router-dom";
import { createContext, useReducer } from 'react';
import {initialstate,reducer} from "../src/reducer/userreducer" 
import Createpost from './components/Createpost';
import Userprofile from './components/Userprofile';

export const UserContext = createContext();

function App() {


  const [state,dispatch]= useReducer(reducer,initialstate);

  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
    <Navbar/>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/registration" element={<Registration />} />
      <Route exact path="/secret" element={<Secret />} />
      <Route exact path="/logout" element={<Logout />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/createpost" element={<Createpost />} />
      <Route  path="/profile/:userid" element={<Userprofile />} />
    </Routes>
    </UserContext.Provider>
    </>
  );
}

export default App;

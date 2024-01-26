import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import { AuthContext } from "../Context/AuthConetxt";

const Routers = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    if(currentUser){
      setUser(currentUser);
    }
    else{
      setUser({})
    }
    // Set loading to false once authentication state is determined
    console.log(currentUser);
    setLoading(false);
  }, [currentUser]);




  return (
    <>
      <Routes>
        <Route
          path="/"
          element={currentUser?<Home/>:<Login/>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default Routers;

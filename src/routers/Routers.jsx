import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import { AuthContext } from "../Context/AuthConetxt";

const Routers = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(currentUser);
    // Set loading to false once authentication state is determined
    setLoading(false);
  }, [currentUser]);

  const ProtectedRouter = ({ children }) => {
    // If still loading authentication state, show loading indicator
    if (loading) {
      return <div>Loading...</div>;
    }

    // If currentUser is null, redirect to login page
    if (!user) {
      return <Navigate to="/login" />;
    }

    // Otherwise, render the protected content
    return children;
  };



  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default Routers;

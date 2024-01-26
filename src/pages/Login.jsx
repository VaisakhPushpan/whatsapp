import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      setLoader(false);
    } catch (err) {
      setErr(true);
      setLoader(false);
      console.log(err);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-main">
        <h3 className="text-primary">Login</h3>
        <p>Login to Continue</p>
        <form>
          <div className="d-flex flex-column">
            <label htmlFor="userEmail">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="userEmail"
              placeholder="Enter Email"
              value={email}
            />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="userPass">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              value={password}
            />
          </div>
          {loader ? (
            <div className="loader">
              <span className="load"></span>
            </div>
          ) : (
            <button onClick={handleSubmit} className="btn btn-primary">
              Login
            </button>
          )}
        </form>
        <p className="pt-5">
          Not Registered <Link to="/register">Register</Link>
        </p>
        {err ? (
          <span className="alert alert-danger">
            "Something is Wrong,Try again."
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Login;

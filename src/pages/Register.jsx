import React, {  useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  const [err, setErr] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    setLoader(true);
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "images/" + displayName);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "user", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats" , res.user.uid ), {});
            setLoader(false);
            navigate("/");
          });
        }
      );
    } catch (err) {
      setLoader(false);
      setErr(true);
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-main">
        <h3 className="text-primary">Register</h3>
        <p>Register to Login</p>
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column">
            <label htmlFor="userName">Display Name</label>
            <input
              required
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
              type="text"
              id="userName"
              placeholder="Enter Full name"
            />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="userEmail">Email</label>
            <input
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="userEmail"
              placeholder="Enter Email"
            />
          </div>
          <div className="d-flex flex-column">
            <label>Password</label>
            <input
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="avatar">
              <img
                width={30}
                src="https://static.vecteezy.com/system/resources/previews/009/266/327/original/plus-sign-icon-free-png.png"
                alt=""
              />
              <span className="ms-2">Choose Avatar</span>
            </label>
            <input
              required
              onChange={(e) => {
                setFile(e.target.value);
              }}
              className="d-none"
              type="file"
              id="avatar"
              placeholder="Enter Email"
            />
          </div>
          {loader ? (
            <div className="loader">
              {/* <span class="loader-text">loading</span> */}
              <span className="load"></span>
            </div>
          ) : (
            <button className="btn btn-primary">Register</button>
          )}
        </form>
        {err ? "Fill Everything/Password must be Strong" : ""}
        <p className="pt-3">
          Already Have Account <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

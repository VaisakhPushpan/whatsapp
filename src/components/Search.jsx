import React, { useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs , query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { AuthContext } from "../Context/AuthConetxt";
import "./Search.scss";
const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (userName == "") {
      setUser(null);
    }
  }, [userName]);

  const searchUSer = async () => {
    const q = query(
      collection(db, "user"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    // if(e.code == "Enter"){
    //   searchUSer();
    // }
    searchUSer();
  };

  const handleSelect = async () => {
    const combinedID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
        try{
          console.log('exist');

          const res = await getDoc(doc(db,"chats",combinedID))

          if(!res.exists()){
            await setDoc(doc(db , "chats" , combinedID),{messages: []})
          }

          await updateDoc(doc(db , "userChats" , currentUser.uid),{
            [combinedID + ".userInfo"] : {
              uid : user.uid,
              displayName : user.displayName,
              photoURL : user.photoURL
            },
            [combinedID + ".date"] : serverTimestamp()
          });
          await updateDoc(doc(db , "userChats" , user.uid),{
            [combinedID + ".userInfo"] : {
              uid : currentUser.uid,
              displayName : currentUser.displayName,
              photoURL : currentUser.photoURL
            },
            [combinedID + ".date"] : serverTimestamp()
          })

          setUser(null);
          setUserName("")
        }
        catch(err){
          console.log(err + "in search");
        }
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          onKeyUp={handleKey}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          placeholder="Search user chat"
          value={userName}
        />
      </div>
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatinfo">
            <span>
              {user.displayName === currentUser.displayName
                ? `${user.displayName}(You)`
                : user.displayName}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;

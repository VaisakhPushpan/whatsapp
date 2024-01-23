import React, { useContext, useEffect, useState } from "react";
import "./Chats.scss";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { AuthContext } from "../Context/AuthConetxt";
import { ChatContext } from "../Context/ChatContext";
const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
 const {dispatch} = useContext(ChatContext)
  useEffect(() => {
    const getChats = () => {
      const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unSub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSubmit = (user) =>{
    dispatch({type : "CHANGE_USER" , payload : user})
  }
  console.log(Object.entries(chats));

  return (
    <div className="chats">
      {
        Object.entries(chats).sort((a,b)=> b[1].date - a[1].date).map((chat)=>{
          return(
            <div className="userChat" key={chat[0]} onClick={()=> handleSubmit(chat[1].userInfo)}>
            <img
              src={chat[1].userInfo.photoURL}
              alt=""
            />
            <div className="userChatinfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
          );
        })
      }
    </div>
  );
};

export default Chats;

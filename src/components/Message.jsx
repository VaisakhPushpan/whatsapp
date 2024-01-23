import React, { useContext, useEffect, useRef } from "react";
import "./Message.scss";
import { AuthContext } from "../Context/AuthConetxt";
import { ChatContext } from "../Context/ChatContext";
const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior : 'smooth'})
  },[])
  return (
    <div ref={ref}
      className={`message  ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.image && <img src={message.image} alt="" />}
      </div>
    </div>
  );
};

export default Message;

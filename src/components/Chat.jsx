import React, { useContext } from 'react'
import {FaVideo , FaUserPlus , FaEllipsisH} from 'react-icons/fa'
import './Chat.scss'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../Context/ChatContext'
const Chat = () => {
  const {data} = useContext(ChatContext);
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <FaVideo />
          <FaUserPlus/>
          <FaEllipsisH/>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat

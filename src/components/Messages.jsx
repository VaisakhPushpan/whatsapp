import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import './Messages.scss'
import { ChatContext } from '../Context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebase'
const Messages = () => {
  const {data} = useContext(ChatContext)
  const [messages,setMessages] = useState([]);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db , 'chats' , data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages)

      return ()=>{
        unSub();
      }
    },[data.chatId])

  })
  return (
    <div className='messages'>
      {
        messages?.map((data)=>{
          return(
            <Message message={data} key={data.id} />
            )
        })
      }
    </div>
  )
}

export default Messages

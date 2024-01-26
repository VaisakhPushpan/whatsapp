import React, { useContext, useState } from 'react'
import './Input.scss'
import {FaFileImage , FaPaperclip} from 'react-icons/fa'
import  {AuthContext} from '../Context/AuthConetxt'
import {ChatContext} from '../Context/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import uuid from 'react-uuid'
const Input = () => {
  const [message , setMessages] = useState("");
  const [image,setImage] = useState('')

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext)
  console.log(data);

  const handleSend = async () =>{
    if(image){
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);

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
            await updateDoc(doc(db,"chats" , data.chatId) ,{
              messages : arrayUnion({
                id : uuid(),
                text : message,
                senderId : currentUser.uid,
                date : Timestamp.now(),
                image : downloadURL
              })
            })
          });
        }
      );
    }
    else{
      await updateDoc(doc(db,"chats" , data.chatId) ,{
        messages : arrayUnion({
          id : uuid(),
          text : message,
          senderId : currentUser.uid,
          date : Timestamp.now(),
        })
      })
    }

    await updateDoc(doc(db , "userChats" , currentUser.uid),{
      [data.chatId + '.lastMessage'] : {
        text : message
      },
      [data.chatId+'.date'] : serverTimestamp()
    })

    await updateDoc(doc(db , "userChats" , data.user.uid),{
      [data.chatId + '.lastMessage'] : {
        text : message
      },
      [data.chatId+'.date'] : serverTimestamp()
    })

    setMessages("");
    setImage(null)
  }
  return (
    <div className='input'>
      <input onKeyUp={(e)=>{e.code == 'Enter' && handleSend()}} value={message} type="text" placeholder='Type Something.....' onChange={(e)=>setMessages(e.target.value)} />
      <div className="send">
        <FaPaperclip />
        <input className='d-none' type="file" id='file' onChange={(e)=> setImage(e.target.files[0])} />
        <label htmlFor="file">
          <FaFileImage />
        </label>
        <button  onClick={handleSend}>Sent</button>
      </div>
    </div>
  )
}

export default Input


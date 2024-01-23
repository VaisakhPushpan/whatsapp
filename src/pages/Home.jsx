import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import './Home.scss'
import { AuthContext } from '../Context/AuthConetxt'
const Home = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home

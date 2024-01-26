import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import './Navbar.scss'
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthConetxt';
const Navbar = () => {
const {currentUser} = useContext(AuthContext)

  return (
    <div className="navbar p-3">
      <span className="logo text-white">ChatApp</span>
      <div className='user d-flex gap-2 align-items-center text-white'>
        <img src={currentUser?currentUser.photoURL:""} alt="" />
        <span>{currentUser?currentUser.displayName:""}</span>
        <button className="btn btn-primary" onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;

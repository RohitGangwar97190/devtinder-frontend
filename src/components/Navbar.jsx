import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { removeUser } from '../utils/UserSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const user=useSelector((store=>store.user));
  const dispatch=useDispatch();
  const navigate=useNavigate();
 const handlelogout=async()=>{
  try{
       await axios.post("http://localhost:3000/logout",{},{
        withCredentials: true, 

       });
       dispatch(removeUser());
       navigate("/login");
  }catch(err)
  {
    console.log(err);
  }
 }
  return (
    <div className="navbar bg-base-200 shadow-sm">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl">🧑‍💻Devtinder</Link>
    </div>
  {user&&
    <div className="flex gap-2">
      <p>wlecome {user.firstName}</p>
      <div className="dropdown dropdown-end mr-5">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={user.photoUrl} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
          <Link to="/Profile" className="justify-between">
  Profile
  <span className="badge">New</span>
</Link>

          </li>
          <li><a>Settings</a></li>
          <li>
            <a onClick={handlelogout}>Logout</a>
            </li>
        </ul>
      </div>
    </div>
}
  </div>

    
  )
}

export default Navbar
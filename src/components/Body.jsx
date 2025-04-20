import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/UserSlice'
import axios from 'axios'
const Body = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const userData=useSelector((store)=>store.user);


  const fetchUser = async () => {
    if(userData) return ;
    try {

      const res = await axios.get('http://localhost:3000/profile/view', {
        withCredentials: true,
        
      });
      // console.log("this is view data",res.data);
      dispatch(addUser(res.data));
    } catch (err) {
      navigate("/login");
      console.error('Error fetching user:', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
        <Navbar/>
        <Outlet/> 
        {/* with the outlet all the routes are oprn within this and teh nvabr at the top and the footer are at the lower alwyas */}
        <Footer/>
    </div>
  )
}

export default Body

import React from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { removeUserFeed } from '../utils/feedSlice';
const Usercard = ({ user }) => {
    // console.log("User received in card:", user); // 👀 Check structure
  
    if (!user) return <p>Loading...</p>; // Handle missing prop safely
  
    const {_id, firstName, lastName, about,photoUrl,age } = user;
    const dispatch=useDispatch();
    const handleRequest=async(status,userId)=>{
      try{
      const res=await axios.post("http://localhost:3000/request/send/"+ status +"/"+userId,{},{
        withCredentials:true,
      })
      dispatch(removeUserFeed(userId));
    }catch(err)
    {
      console.log("there is somethings wrongs",err);
    }
    }
  
    return (
      <div className="card bg-base-100 w-96 shadow-sm mt-10 ml-5">
        <figure>
          <img
            src={user.photoUrl}
            alt="User"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p className='text-red-500 text-1xl'> Age:  {user.age}</p>
          <h2 className='text-red-500 text-1xl '>About </h2>
          <p>  {user.about}</p>
          
          <div className="card-actions flex justify-between">
          <button className="btn btn-primary bg-red-500" onClick={()=>handleRequest("ignored",_id)}>Ignore</button>
  <button className="btn btn-primary bg-green-600" onClick={()=>handleRequest("interested",_id)}>Interested</button>
  
</div>
        </div>
      </div>
    );
  };
  

export default Usercard
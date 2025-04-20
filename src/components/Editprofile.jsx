
import React from 'react'
import { useState } from 'react';
import Usercard from './Usercard';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/UserSlice';
import axios from 'axios';
const Editprofile = ({user}) => {
     const [firstName,setfirstName]=useState(user.firstName);
    const [lastName,setlastName]=useState(user.lastName);
    const [age,setage]=useState(user.age || "");
    // const [gender,setgender]=useState(user.gender);
    const [about,setabout]=useState(user.about);
    const [error,seterror]=useState("");
    const [photoUrl, setphotoUrl] = useState(
      user.photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s"
    );
    const dispatch=useDispatch();
    const saveprofile = async () => {
      try {
        const res = await axios.patch(
          "http://localhost:3000/profile/edit",
          { firstName, lastName,
            age,
              about, photoUrl },
          { withCredentials: true }
        );
        console.log(res.data); // Inspect the response
        dispatch(addUser(res.data?.data));
        alert("Profile updated!");
      } catch (err) {
        console.log("Profile update failed:", err);
        seterror(err.response?.data?.message || err.message);
      }
    };
    
  return (
    <div className='flex justify-center'>
    <div className="card text-primary-content w-96 flex justify-center mt-10 bg-base-200">
      <div className='flex justify-center items-center'> 
      <h2 className="card-title items-center mt-4 text-red-600">Edit profile</h2>
      </div>
    
  <div className="card-body   bg-base-300 flex justify-center">
 
    <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">first Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(e)=>setfirstName(e.target.value)}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
   
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(e)=>setlastName(e.target.value)}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
            <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">Photo URL</label>
            <input
              type="text"
              id="photoUrl"
              name="photoUrl"
              value={photoUrl}
              onChange={(e) => setphotoUrl(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
      <div>
        <label htmlFor="About" className="block text-sm font-medium text-gray-700">About</label>
        <textarea
          type="textarea"
          id="about"
          name="about"
          value={about}
          onChange={(e)=>setabout(e.target.value)}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="Age" className="block text-sm font-medium text-gray-700">Age</label>
       
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={(e)=>setage(e.target.value)}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      
  
    <div className="card-actions flex justify-center">
      
      <button type="submit" className="btn bg-blue-600" onClick={saveprofile}>Save Profile</button>
    </div>
  </div>
</div>
<Usercard user={{firstName,lastName,age,about,photoUrl}}/>

</div>
  )
}

export default Editprofile
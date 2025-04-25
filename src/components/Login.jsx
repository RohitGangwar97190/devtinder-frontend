import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/UserSlice";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [emailId,setEmailId]=useState(" ");
const [password,setPassword]=useState(" ");
const [error,setError]=useState(" ");
const [firstName,setfirstName]=useState("");
const [lastName,setlastName]=useState("");
const [isLoggedIn,setisLoggedIn]=useState(false);
const dispatch=useDispatch();
const navigate=useNavigate();
const handlelogin=async ()=>{
  try {
    const response = await axios.post(
      "http://localhost:3000/login",
      {
        emailId,
        password,
      },
      {
        withCredentials: true, // for cookies/session handling
      }
    );

    // console.log("Login successful:", response.data);
    // Redirect or update UI here
    
    dispatch(addUser(response.data));
    return navigate("/");
    
  }
 
  catch(err)
  {
    setError(err.response.data);
    console.log(err);
  }
}
const handlesignup=async()=>{
  try{
  const res=await axios.post("http://localhost:3000/signup",
    {firstName,
      lastName,
      emailId,
     password,

    },
    {
    withCredentials:true,
  })
  dispatch(addUser(res.data.data));
  navigate("/profile");
}
catch(err)
{
  console.log("there is a error in signup",err);
}
}
  return (
   <div className='flex justify-center'>
      <div className="card text-primary-content w-96 flex justify-center mt-10 bg-base-200">
        <div className='flex justify-center items-center'> 
        <h2 className="card-title items-center mt-4 text-red-600"> 
          {isLoggedIn? "Login":"SignUp"}
        </h2>
        </div>
      
    <div className="card-body  mt-10 bg-base-300">
    {!isLoggedIn && (
  <>
    <div>
      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={firstName}
        onChange={(e) => setfirstName(e.target.value)}
        required
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={lastName}
        onChange={(e) => setlastName(e.target.value)}
        required
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </>
)}

     
      <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email ID:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={emailId}
            onChange={(e)=>setEmailId(e.target.value)}
            required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
     <p className='text-red-600'>{error}</p>
      <div className="card-actions flex justify-center">
        
        <button type="submit" className="btn bg-blue-600" onClick={isLoggedIn?handlelogin:handlesignup}>
          {isLoggedIn? "Login":"Sign Up"}
        </button>
      </div>
      <p className='' onClick={()=>setisLoggedIn(value=>!value)}>
        {isLoggedIn ? "New user? signup Here?" :
        "Existing user? Login Here"}</p>
    </div>
  </div>
  </div>
 
  )
}

export default Login
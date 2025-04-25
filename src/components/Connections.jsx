
import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
// import { addConnections } from '../utils/connectionSlice';
import { addConnections } from '../utils/connectionSlice'
const Connections = () => {
    const dispatch=useDispatch();
    const connections=useSelector((store)=>store.connections);
    const fetchdata=async()=>{
        try{
            const res=await axios.get("http://localhost:3000/user/connections",{
                withCredentials:true,
            })
            console.log(res.data?.data);
            dispatch(addConnections(res.data.data))
        }catch(err)
        {
            console.error("Error fetching data:", err);
        }
    }
   
    useEffect(()=>{
        fetchdata();
    })
    if(!connections) return;
    if(connections.length==0)
    {
        return  <h1 className='text-2xl text-font'>No Connections found</h1>
    }
  return (
    <div className='justify-center'>
        <h1 className='text-2xl text-font'>Connections</h1>
        {connections.map((connection) => {
  const { firstName, lastName, photoUrl, age, gender ,about} = connection;
  return (
    <div
  key={firstName + lastName}
  className="max-w-sm w-full border border-gray-300 rounded-2xl p-4 shadow-md bg-base-200 space-y-3"
>
  <img
    alt="Photo is not uploaded by user"
    src={photoUrl}
    className="w-75 h-45 object-cover rounded-xl border justify-center"
  />
  <div className="text-lg font-semibold text-blue-500">
    {firstName + " " + lastName}
  </div>
  <div className="text-sm text-red-400">{gender + " • " + age} yrs</div>
  <div className="text-sm text-gray-700">
    {!about ? (
      <p className="italic text-red-400">User data is not uploaded bu user</p>
    ) : (
      <div>{about}</div>
    )}
  </div>
</div>

  );
})}
    </div>
  )
}

export default Connections
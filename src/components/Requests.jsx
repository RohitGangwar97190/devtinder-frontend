import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requetsSlice';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const Reviewhandle=async(status,_id)=>{
    try{
           const res=await axios.post("http://localhost:3000/request/review/" + status +"/"+_id,{},
            {
                withCredentials:true,
            }
           )
           dispatch(removeRequest(_id));
    }
    catch(err)
    {
        console.error('Error handling review:', err);
    }
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error('Error fetching requests:', err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return <h1 className='text-xl text-gray-600'>Loading...</h1>;

  if (requests.length === 0) {
    return <h1 className='text-2xl text-font'>No Connection Requests found</h1>;
  }

  return (
<div className="flex flex-col items-center justify-center">
  <h1 className="text-2xl text-font mb-4">Connection Requests</h1>
  {requests.map((request) => {
    const {_id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
    return (
      <div
        key={firstName + lastName}
        className="max-w-sm w-full border border-gray-300 rounded-2xl p-4 shadow-md bg-base-200 space-y-3 my-4 flex flex-col items-center"
      >
        <img
          alt="Photo is not uploaded by user"
          src={photoUrl}
          className="w-full h-45 object-cover rounded-xl border"
        />
        <div className="text-lg font-semibold text-blue-500">
          {firstName + " " + lastName}
        </div>
        <div className="text-sm text-red-400">{gender + " • " + age} yrs</div>
        <div className="text-sm text-gray-700 text-center">
          {!about ? (
            <p className="italic text-red-400">User data is not uploaded by user</p>
          ) : (
            <div>{about}</div>
          )}
        </div>

        {/* ✅ Buttons */}
        <div className="flex gap-4 mt-4">
          <button className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600" onClick={()=>Reviewhandle("accepted",request._id)}>
            Accept
          </button>
          <button className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600" onClick={()=>Reviewhandle("rejected",request._id)}>
            Reject
          </button>
        </div>
      </div>
    );
  })}
</div>
  );
};

export default Requests;

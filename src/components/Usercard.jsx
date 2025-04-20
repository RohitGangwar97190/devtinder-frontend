
import React from 'react'

const Usercard = ({ user }) => {
    // console.log("User received in card:", user); // 👀 Check structure
  
    if (!user) return <p>Loading...</p>; // Handle missing prop safely
  
    const { firstName, lastName, about,photoUrl,age } = user;
  
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
          <button className="btn btn-primary bg-red-500">Ignore</button>
  <button className="btn btn-primary bg-green-600">Interested</button>
  
</div>
        </div>
      </div>
    );
  };
  

export default Usercard
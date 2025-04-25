import React, { useEffect, useState } from 'react';
import { addFeed } from '../utils/feedSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Usercard from './Usercard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [currentUserIndex, setCurrentUserIndex] = useState(0); // Track the current user index to display one at a time

  const getFeed = async () => {
    if (feed.length > 0) return; // If feed is already populated, no need to fetch again

    try {
      const res = await axios.get("http://localhost:3000/feed", {
        withCredentials: true,
      });

      const data = res.data.data;
      dispatch(addFeed(data)); // Dispatch to Redux store
    } catch (err) {
      console.log("Cannot get the feed data", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []); // Runs only once when the component is mounted

  // Check if feed is empty
  if (feed.length === 0) {
    return <p className="flex justify-center text-red-500">No user is found</p>;
  }

  // Get the current user based on the currentUserIndex
  const currentUser = feed[currentUserIndex];

  // Handle "Next" and "Previous" navigation
  const handleNext = () => {
    if (currentUserIndex < feed.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1); // Move to the next user
    }
  };

  const handlePrev = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1); // Move to the previous user
    }
  };

  return (
    <div className="flex flex-col items-center p-5 h-full justify-between">
      {/* Display one user card at a time */}
      <Usercard key={currentUser._id} user={currentUser} />

      {/* Navigation buttons for "Previous" and "Next" */}
      <div className="mt-5 flex justify-between w-full max-w-md">
        <button
          className="btn btn-primary bg-blue-500 w-2.5 mr-2"
          onClick={handlePrev}
          disabled={currentUserIndex === 0} // Disable "Previous" button at the start
        >
          Prev
        </button>
        <button
          className="btn btn-primary bg-blue-500 w-2.5 ml-2"
          onClick={handleNext}
          disabled={currentUserIndex === feed.length - 1} // Disable "Next" button at the end
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Feed;

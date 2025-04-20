import React, { useEffect } from 'react';
import { addFeed } from '../utils/feedSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Usercard from './Usercard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get("http://localhost:3000/feed", {
        withCredentials: true,
      });
      // console.log("Fetched data:", res.data);

      const data = res.data.data;
      dispatch(addFeed(data));
    } catch (err) {
      console.log("Cannot get the feed data", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return feed&&(
    <div className="flex flex-wrap justify-center gap-5 p-5">
    {feed?.map((user) => (
  <Usercard key={user._id} user={user} />
))}
{/* <Usercard user={feed[0]}/> */}

    </div>
  );
};

export default Feed;

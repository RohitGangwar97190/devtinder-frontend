import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: [],
  reducers: {
    addFeed: (state, action) => action.payload,
    removeUserFeed: (state, action) => state.filter(user => user._id !== action.payload),
  },
});

export const { addFeed, removeUserFeed } = feedSlice.actions;
export default feedSlice.reducer;

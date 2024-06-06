import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  signIn: false,
  users: []
};

export const newsFeedSlice = createSlice({
  name: 'newsFeed',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSignIn: (state, action) => {
      state.signIn = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    }
  }
});

export const { setPosts, setSignIn, setUsers } = newsFeedSlice.actions;
export default newsFeedSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice.js';

const store = configureStore({
  reducer: {
    userData : userReducer,
  }
})

export default store
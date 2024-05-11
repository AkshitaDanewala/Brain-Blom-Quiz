import { configureStore } from '@reduxjs/toolkit'
import  userAuthSlice  from './slice/userSlice'

export const store = configureStore({
  reducer: {
    userAuth : userAuthSlice
  },
})
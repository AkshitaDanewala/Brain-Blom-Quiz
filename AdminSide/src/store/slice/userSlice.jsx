import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  is_auth : false,
  user:null
}

 const userAuthSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getUserLogeIn: (state, action) => {
     state.is_auth = true;
     state.user = action.payload
    },
    getUserLogOut: (state) => {
      state.is_auth = false;
      state.user = null;
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { getUserLogeIn, getUserLogOut } = userAuthSlice.actions

export default userAuthSlice.reducer
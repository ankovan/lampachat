import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  color: null,
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   setUser: (state, data) => {
    state.username = data.payload.username
    state.color = data.payload.color
   }
  },
})
export const userActions = {...userSlice.actions}

export default userSlice.reducer
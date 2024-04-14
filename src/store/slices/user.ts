import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  username: string,
  isUserInit: boolean,
}

const initialState: UserState = {
  username: "",
  isUserInit: false,
}

if (typeof window !== 'undefined') {
  initialState.username = localStorage.getItem("savedUsername") || "";
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setIsUserInit: (state, action: PayloadAction<boolean>) => {
      state.isUserInit = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUsername, setIsUserInit } = userSlice.actions

export default userSlice.reducer
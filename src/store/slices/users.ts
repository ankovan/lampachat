import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UsersState {
  users: any;
}

const initialState: UsersState = {
  users: {}
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<any>) => {
      state.users = action.payload
    },
    updateUsers: (state, action: PayloadAction<any>) => {
      state.users[action.payload.id] = action.payload
    },
    removeUsers: (state, action: PayloadAction<any>) => {
      delete state.users[action.payload.id];
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUsers, updateUsers, removeUsers } = usersSlice.actions

export default usersSlice.reducer
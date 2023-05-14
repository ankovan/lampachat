import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: true,
}

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    close: (state) => {
      state.value = false 
    },
    open: (state) => {
      state.value = true
    },
  },
})

// Action creators are generated for each case reducer function
export const drawerActions = {...drawerSlice.actions}

export default drawerSlice.reducer
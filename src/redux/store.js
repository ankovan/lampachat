import { configureStore } from '@reduxjs/toolkit'
import drawerReducer from './drawer'
import roomsReducer from './rooms'
import userReducer from './user'

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    rooms: roomsReducer, 
    user: userReducer,
  },
})
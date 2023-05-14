import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  roomIds: ["chatting"],
  rooms: {},
}
export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRoomUserInfo: (state, action) => {
      const { roomId, username, color, id } = action.payload;
      const roomUsers = state.rooms[roomId] || [];
      const isDuplicateUser = roomUsers.some((user) => user.id === id);
      
      if (!isDuplicateUser) {
        return {
          ...state,
          rooms: {
            ...state.rooms,
            [roomId]: [
              ...roomUsers,
              { username, color, roomId, id },
            ],
          },
        };
      }

      // if the user already exists in the room, return current state
      return state;
    },
    setUsers: (state, action) => {
      console.log("setUsers AAAAAA:", action.payload.users)
      let users = Array.isArray(action.payload.users) ? action.payload.users : [action.payload.users];
      return { ...state, rooms: {
        ...state.rooms,
        [action.payload.roomId]: users
      }};
    },
    setRooms: (state, action) => {
      // state.roomIds = data.payload.roomIds
      console.log("setrooms:", action.payload)
      return {...state, roomIds: [...action.payload.roomIds]}
    },
    removeUser: (state, action) => {
      for (let [key, room] of Object.entries(state.rooms)) {
        let removeIndex = room.map(item => item.id).indexOf(action.payload.id);
        ~removeIndex && room.splice(removeIndex, 1);
      }
    }
    // TODO: этих методов ещё нет на бэке
    // setUsersOnRoomIdJoined: (state, payload) => {
    //   state[payload.roomId].push(payload.user)
    // },
    // userDisconnectedFromRoom: (state, payload) => {
    //   state[payload.roomId] = state[payload.roomId].filter(user => user.id !== payload.userId)
    // },
    // userDisconnected: (state, payload) => {
    //   for (const roomId of state.roomIds) {
    //     state[roomId] = state[roomId].filter(user => user.id !== payload.userId)
    //   }
    // },
  },
})
export const roomsActions = {...roomsSlice.actions}

export default roomsSlice.reducer
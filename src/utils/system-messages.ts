export const onUserJoined = (username, roomId) => {
    return {
      id: "0000-0000-0000-0000",
      message: `*${username} has joined*`,
      activeRoom: roomId,
    };
};
export const onUserDisconnect = (username, roomId) => {
  return {
    id: "0000-0000-0000-0000",
    message: `*${username} has left*`,
    activeRoom: roomId,
  };
};
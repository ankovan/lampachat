"use client"
import React from "react";
import { useState, useEffect, useRef } from 'react';
import { Socket, io } from "socket.io-client";
import type { RootState } from '@/store'
import { useSelector, useDispatch } from 'react-redux'
import { setUsers, updateUsers, removeUsers } from '@/store/slices/users'
import  { parseCommand } from '@/utils/commands'
import { onUserJoined, onUserDisconnect } from '@/utils/system-messages'
import { Button, Input} from "@nextui-org/react";
import Message from "./Message";
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

export default function Chat() {
  const PORT = 3001
  const usersRef = useRef<any>({});
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const socketRef = useRef(null);
  const username = useSelector((state: RootState) => state.user.username);
  const isUserInit = useSelector((state: RootState) => state.user.isUserInit);
  const dispatch = useDispatch();
  useEffect (() => {
    if (isUserInit) {
      socketRef.current = io(`:${PORT}`, { path: "/" });


      socketRef.current.on("connected", (message) => {
        socketRef.current.emit('joinRoom', {
          roomId: "Chatting",
          username: username,
          color: '#FFFFFF',
        })
        socketRef.current.emit('getRoomIds')
      });
  
      socketRef.current.on("chat", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
  
      socketRef.current.on("roomIds", (message) => {
        // setRooms(message.roomIds)
      });
  
      socketRef.current.on("getUserInfo", (user) => {
        usersRef.current = {
            ...usersRef.current,
            [user.id]: user
        };
        setMessages((prevMessages) => [...prevMessages, onUserJoined(user.username, user.roomId)]);
        dispatch(updateUsers(user));
      });
      socketRef.current.on("getRoomUsers", (message: {users: any[]}) => {
        message.users.forEach(item => usersRef.current[item.id] = item)
        dispatch(setUsers(usersRef.current))
        // TODO: update users
        // roomId: message.roomId,
        // users: message.users,
      });
      socketRef.current.on("userDisconnected", (user) => {
        setMessages((prevMessages) => [...prevMessages, onUserDisconnect(user.username, user.roomId)]);
        dispatch(removeUsers(user))
        // TODO: remove user from room
      });
    } 
  }, [isUserInit])

  useEffect(() => {
    // Initialize the socket connection only once
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const sendMessageOnEnter = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }
  const sendMessage = () => {
    if (currentMessage.startsWith('/')) {
      setMessages((prevMessages) => [...prevMessages, parseCommand(currentMessage)]);
    }
    else if (currentMessage.trim()) {
      // Send the message to the server and add it to our state
      socketRef.current.emit('chat', currentMessage);
    }
    setCurrentMessage('');
  };


  return (
    <div className="bg-background flex flex-col w-full">
      <div className="grow h-4 scrollbar scrollbar-thumb-primary scrollbar-track-background h-32 overflow-y-scroll">
        {messages.map((messageData, index) => (
            <Message 
              key={index}
              username={usersRef.current[messageData.id]?.username}
              userMessage={messageData.message}
              date={messageData.date}
              isSystem={messageData.id === "0000-0000-0000-0000"}
            />
        ))}
      </div>
      <Input
        color="primary"
        variant="bordered"
        className="px-6 pb-6 text-foreground" 
        type="email"
        onKeyDown={sendMessageOnEnter}
        value={currentMessage}
        onValueChange={setCurrentMessage}
        endContent={
          <Button onPress={sendMessage} variant="light" isIconOnly={true}>
            <PaperAirplaneIcon className="h-5 w-5 text-primary"/>
          </Button>
        }
      />
    </div>
  );
}
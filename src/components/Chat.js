import { io } from "socket.io-client";
import React, { useState, useEffect, useCallback } from 'react';
import { Input, Button, Card, Row, Col, message} from 'antd';
import {roomsActions} from '../redux/rooms'
import Moment from 'react-moment';
import 'antd/dist/reset.css';
import { useDispatch, useSelector, } from 'react-redux'
import './Chat.scss';
const socket = io("ws://127.0.0.1:3001");
export default function Chat() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState("");
  const [messages, setMessage] = useState([])
  const [usernameID, setUsernameID] = useState ("")

  useEffect(() => {
    socket.on('connected', () => {
      setIsConnected(true);
      setUsernameID(socket.id)
    });

    socket.on('disconnected', () => {
      setIsConnected(false);
    });

    socket.on('chat', (message) => {
      setMessage(prevArray => [
        ...prevArray, message
      ])
    });

    socket.on('getUserInfo', (message) => {
      dispatch(roomsActions.setRoomUserInfo(message))
    }); 
    socket.on('getRoomUsers', (message) => {
      console.log("getRoomUsers AAAAAA:", message)
      dispatch(roomsActions.setUsers(message))
      socket.emit('getRoomIds')
    });
    socket.on('userDisconnected', (message) => {
      dispatch(roomsActions.removeUser(message))
    })
    socket.on('roomIds', (message) => {
      dispatch(roomsActions.setRooms(message))
    });
    return () => {
      socket.off('connected');
      socket.off('disconnected');
      socket.off('chat');
    };
  }, []);

  const onJoinChatting = useCallback(() => {
    socket.emit('joinRoom', {
       username: user.username,
       color: "string",
       roomId: "chatting",
    })}, [user])

  useEffect(() => { 
    if (user.username) {
      onJoinChatting()
    }
  }, [user, onJoinChatting])

  const sendMessage = (event) => {
    event?.preventDefault()
    if (lastMessage) {
      socket.emit('chat', {
        data: lastMessage, username: user.username
      });
      setLastMessage("")
    }
  }
  const sendOnEnter = (event) => {
    if(event?.key === 'Enter'){
      sendMessage()
    }
  }
  useEffect(()=> {

  }, [lastMessage])
    return (
      <>
      <Row className="chat-wrapper">
        <Col span={24}>
          <Card className='chat-interface'>
            <div className="message-window"> 
                {messages.map((item, index)=>{
                  return(
                    <div key={index} className={`message-wrapper ${item.id === usernameID ? "your-message" : ""}`} >
                      <div className="message-content">
                        <div id="message-username" className="message-content-item">{item.message.username}</div>
                        <div className ="message-content-item">{item.message.data}</div>
                        <Moment format="HH:mm" id="message-time"className="message-content-item">{item.date}</Moment> 
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className="input-button-wrapper">
              <Row className="input-button">
                <Col span={23}>
                  <Input
                    className="chat-input" 
                    value={lastMessage}
                    onChange={e => setLastMessage(e.target.value)}
                    onKeyPress={e => sendOnEnter(e)}
                    placeholder="Type text here..."
                  />
                </Col>
                <Col span={1}>
                  <Button className="button-input" type="primary" onClick={sendMessage}>Send</Button>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
      </>
    );
  }
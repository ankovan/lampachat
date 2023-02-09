import { io } from "socket.io-client";
import React, { useState, useEffect } from 'react';
import { Input, Button, Card} from 'antd';
import './Chat.scss';
const socket = io("ws://127.0.0.1:3001");
export default function Chat({selectedUsername}) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState("");
  const [messages, setMessage] = useState([])

  useEffect(() => {
    socket.on('connected', () => {
      setIsConnected(true);
    });

    socket.on('disconnected', () => {
      setIsConnected(false);
    });

    socket.on('chat', (message) => {
      setMessage(prevArray => [
        ...prevArray, message
      ])
      
      // ({
      //   message: message,
      //   date: new Date().toISOString(),
      // });
    });

    return () => {
      socket.off('connected');
      socket.off('disconnected');
      socket.off('chat');
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault()
    socket.emit('chat', {
      data: lastMessage, nickname: selectedUsername
    });
    setLastMessage("")
  }
  useEffect(()=> {

  }, [lastMessage])
    return (
      <div className="chat-wrapper">
        <Card className='chat-window'>
          {messages.map((item, index)=>{
            return(
              <div key={index}>[{item.date}] {item.message.nickname}: {item.message.data}</div>
            )
          })}
        </Card>
        <form onSubmit={sendMessage}>
          <Input value={lastMessage}
            onChange={e => setLastMessage(e.target.value)}
          />
          <Button type="primary">Send</Button>
        </form>
      </div>
    );
  }
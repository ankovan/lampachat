import './App.scss';
import Chat from './Chat.js'
import WelcomeModal from './WelcomeModal.js'
import Navbar from './Navbar';
import { ConfigProvider, theme } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import drawer from '../redux/drawer';

function App() {
  // const [joinChatting, setJoinChatting] = useState(false)
  const drawer = useSelector((state) => state.drawer.value)
  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#CE6C47",
        borderRadius: 6, 
        fontFamily: 'Inconsolata',
      }
    }}
    >  
      <WelcomeModal/>
      <div className={`main-layout ${drawer?'resize': ''}`}>
        <Navbar/>
        <Chat/>
      </div>
    </ConfigProvider>
  );
}

export default App;

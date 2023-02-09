import './App.scss';
import Chat from './Chat.js'
import WelcomeModal from './WelcomeModal.js'
import { ConfigProvider, theme } from 'antd';
import { useState } from 'react';

function App() {
  const [selectedUsername, setSelectedUsername] = useState('unknown')
  return (
    <div id="main-layout">
      <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#3D405B',
        }
      }}
      >
        <WelcomeModal setSelectedUsername={setSelectedUsername}/>
        <Chat selectedUsername={selectedUsername}/>
      </ConfigProvider>
    </div>
  );
}

export default App;

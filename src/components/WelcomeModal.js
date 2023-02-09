import { Modal, Button, Input } from 'antd';
import { useState } from 'react';
import './WelcomeModal.scss';
export default function WelcomeModal({setSelectedUsername}) {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState('');
  const ChangeInput = event => {
    setUsername(event.target.value);
  }  
  const CloseModal = () => {
    setSelectedUsername(username)
    setOpen(false);
  };
  return(
    <div id="modal">
        <Modal 
          title="Welcome to Lampachat"
          closable={false} 
          open={open}
          footer={[
            <Button key="submit" type="primary" onClick={CloseModal}>OK</Button>
          ]}
          >
          <Input
          placeholder="Username"
          onChange={ChangeInput}
          value={username}
          >
          </Input>
        </Modal>
    </div>
  ) 
} 
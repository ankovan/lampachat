import { Modal, Button, Input, Form } from 'antd';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {userActions} from '../redux/user'
import './WelcomeModal.scss';
export default function WelcomeModal() {
  // const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState('');
  const changeInput = event => {
    setUsername(event.target.value);
  } 
  const sendModalForm = () => {
    dispatch(userActions.setUser({username, color: "string"}))
    setOpen(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return(
    <div id="modal">
        <Modal 
          title="welcome to lampachat"
          closable={false} 
          open={open}
          footer={false}
          >
          <Form
            onFinish={sendModalForm}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Tell us how to call you"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder='Username' onChange={changeInput} required/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                ok
              </Button>
            </Form.Item>
          </Form>
        </Modal>
    </div>
  ) 
} 
import React, { useState, useEffect, useCallback } from 'react';
import { Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import {drawerActions} from '../redux/drawer'
import './ChatMenu.scss';
const ChatMenu = () => {
  const drawer = useSelector((state) => state.drawer.value)
  const rooms = useSelector((state) => state.rooms.roomIds)
  const users = useSelector((state) => state.rooms.rooms)
  const dispatch = useDispatch()
  // const [open, setOpen] = useState(false);
  const showDrawer = () => {
    dispatch(drawerActions.open())
  };

  const onClose = () => {
    dispatch(drawerActions.close())
  };

  // useEffect(() => {
  //   console.log("AAAAAAAAAAAAAAAAAAAAAAAAA:", users)
  // }, [users])

  return (
    <div className='drawer-wrapper'>
      <FontAwesomeIcon icon={faBars} onClick={showDrawer}/>
      <Drawer 
      className='drawer' 
      placement="right" 
      onClose={onClose} 
      open={drawer} 
      mask={false} 
      width="30rem"
      style={{backgroundColor:"$secondary-color"}}
      >
        <div>
          <div>roomIds</div>
          <div>{JSON.stringify(rooms)}</div>
        </div>
        <div>
          <div>Users of rooms</div>
          <div>{JSON.stringify(users)}</div>
        </div>
      </Drawer>
    </div>
  );
};

export default ChatMenu;
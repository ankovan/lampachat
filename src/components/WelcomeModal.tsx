'use client'
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import type { RootState } from '@/store'
import { useSelector, useDispatch } from 'react-redux'
import { setUsername, setIsUserInit } from '@/store/slices/user'
export default function WelcomeModal() {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const username = useSelector((state: RootState) => state.user.username);
  const isUserInit = useSelector((state: RootState) => state.user.isUserInit);
  const [isUsernameInvalid, setUsernameInvalid] = useState(false);
  const dispatch = useDispatch()
  
  useEffect(() => {onOpen()}, []);
  
  useEffect(() => {
    setUsernameInvalid(username.length === 0);
  }, [username]);
  
  const onUsernameSubmit = () => {
    localStorage.setItem("savedUsername", username);
    dispatch(setIsUserInit(true))
    onClose()
  };
  
  return (
    <>
      <Modal 
        isOpen={!isUserInit && isOpen} 
        onOpenChange={onOpenChange} 
        isDismissable={false} 
        isKeyboardDismissDisabled={true} 
        hideCloseButton={true}
      >
        <ModalContent>
          <ModalHeader className="flex items-center flex-col gap-1 text-primary">welcome to lampachat</ModalHeader>
          <ModalBody>
          <Input
            color="primary"
            variant="bordered"
            label="username"
            value={username}
            isInvalid={isUsernameInvalid}
            errorMessage={isUsernameInvalid && "enter a username"}
            onValueChange={(value: string) => dispatch(setUsername(value))}
          />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className="text-background" onPress={onUsernameSubmit}>
              ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

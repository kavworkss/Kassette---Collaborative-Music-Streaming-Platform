import React, { useState } from 'react';
import { useStateContext } from '../Context/ContextProvider';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LeaveRoom = ({ handleLeaveRoom }) => {
  const { isLeaving, setIsLeaving } = useStateContext();
  const [unmountOnClose] = useState(true);
  const navigate = useNavigate();

  const toggle = () => setIsLeaving(!isLeaving);

  const handleExit = async () => {
    try {
      await handleLeaveRoom();
      // Clear relevant session data
      sessionStorage.removeItem('roomCode');
      Cookies.remove('currentRoom');
      // Redirect to home and refresh to reset state
      navigate('/home');
      window.location.reload();
    } catch (error) {
      console.error('Error leaving room:', error);
    }
  };

  return (
    <Modal 
      centered={true} 
      className='flex justify-center w-72' 
      isOpen={isLeaving} 
      toggle={toggle} 
      unmountOnClose={unmountOnClose}
    >
      <ModalHeader className='text-sm' toggle={toggle}>
        <b>Exit Room</b>
      </ModalHeader>
      <ModalBody className='flex items-center justify-start'>
        <p className='text-gray-950'>
          Do you want to leave this listening session?
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color='dark' onClick={handleExit}>
          Exit
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LeaveRoom;
import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Cookies from 'js-cookie';
import YouTubeVideo from '../Components/YoutubeVideo';
import { useStateContext } from '../Context/ContextProvider';
import { db } from '../firebase-config';
import CreateRoom from '../Components/CreateRoom';
import JoinRoom from '../Components/JoinRoom';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import LeaveRoom from '../Components/LeaveRoom';
import background from '../assests/background.png'; 

const Homepage = () => {
  const nav = useNavigate();
  const [currentSong, setCurrentSong] = useState([]);
  const {
    setVideoIds, setIsLeaving, isLeaving, pathName,
    onReady
  } = useStateContext();
  const [roomMate, setRoomMate] = useState([]);
  const [admin, setAdmin] = useState('');

  useEffect(() => {
    const getData = () => {
      if (sessionStorage.getItem('roomCode')) {
        const filteredUsersQuery = query(
          collection(db, 'room'),
          where('roomCode', '==', sessionStorage.getItem('roomCode'))
        );
        onSnapshot(filteredUsersQuery, (data) => {
          const docData = data.docs[0].data();
          setCurrentSong(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setVideoIds(docData.currentSong);
          setRoomMate(docData.members);
          setAdmin(docData.roomAdmin);
        });
      }
    };
    getData();
  }, [sessionStorage.getItem('roomCode')]);

  const handleLeaveRoom = async () => {
    if (roomMate.length > 0) {
      const index = roomMate.indexOf(Cookies.get('name'));
      if (index > -1) roomMate.splice(index, 1);
      await updateDoc(doc(db, 'room', sessionStorage.getItem('roomCode')), {
        members: roomMate
      });
    }
    setCurrentSong([]);
    sessionStorage.removeItem('roomCode');
    setIsLeaving(!isLeaving);
    nav('/home');
  };

  return (
    <>
      <Sidebar />
      <div className="flex justify-center gap-0 w-screen bg-black" id="top">
        <CreateRoom />
        <JoinRoom />
        <LeaveRoom handleLeaveRoom={handleLeaveRoom} />

        <div
          className="m-3 mb-5 rounded-lg w-96 bg-black bg-opacity-80 p-4"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            height: '365px',
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {Cookies.get('name') &&
            !sessionStorage.getItem('roomCode') &&
            pathName.includes('home') && (
              <div
                className="w-full flex flex-col items-center justify-center"
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <b
                  className="text-5xl font-bold text-transparent bg-clip-text animate-gradient"
                  style={{
                    marginTop: '120px',
                    backgroundImage: 'linear-gradient(90deg,rgb(134, 210, 235),rgb(221, 98, 229),rgb(132, 173, 224))',
                    backgroundSize: '200% auto',
                    animation: 'gradient-flow 4s linear infinite',
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: '1px',
                    padding: '0 40px',
                    lineHeight: '1.2',
                    textShadow: '4px 4px 0 rgba(19, 19, 19, 0.14)'
                  }}
                >
                  {'Welcome ' + (Cookies.get('name').split(' ')[0] || Cookies.get('name')) + '!'}
                </b>
                <p
                  className="text-2xl font-semibold text-transparent bg-clip-text animate-gradient mt-2"
                  style={{
                    backgroundImage: 'linear-gradient(90deg,#FFD700, #FF69B4, #40E0D0)',
                    backgroundSize: '200% auto',
                    animation: 'gradient-flow 4s linear infinite',
                    fontFamily: "'Poppins', sans-serif",
                    textShadow: '2px 2px 0 rgba(19, 19, 19, 0.1)'
                  }}
                >
                  "Add Now, Jam Wow!"
                </p>
              </div>
            )}

          {sessionStorage.getItem('roomCode') && currentSong.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '135px' }}>
              <div style={{ width: '400px', maxWidth: '100%' }}>
                <YouTubeVideo videoIds={currentSong[0].currentSong} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Homepage;
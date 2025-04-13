import React, { useEffect, useState } from 'react';
import { useStateContext } from '../Context/ContextProvider';
import { IoPause, IoPlay, IoPlaySkipBack, IoPlaySkipForward, IoBookmarksOutline } from 'react-icons/io5';
import Marquee from 'react-fast-marquee';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { secondsToMinutes, seekBarStyle } from '../Functions/secondsToMinutes';
import { syncPlay, syncPause, syncSeek } from '../Functions/syncPlayback';
import background from '../assests/background.png';
import Cookies from 'js-cookie';

const Index = () => {
  const {
    videoIds, setmodal_backdrop, onReady, setmodal_backdrop1,
    title, artist, currentPlaying, duration,
    currentTime, setCurrentTime, setIsSeeking, seekBarRef,
    playedBy, setIsLeaving,
  } = useStateContext();

  const [isPause, setIsPause] = useState(false);
  const [admin, setAdmin] = useState('');
  const [roomMate, setRoomMate] = useState([]);
  const roomCode = sessionStorage.getItem('roomCode');

  useEffect(() => {
    if (roomCode) {
      const roomRef = doc(db, 'room', roomCode);
      const unsubscribe = onSnapshot(roomRef, (docSnap) => {
        const data = docSnap.data();
        if (data) {
          setAdmin(data.roomAdmin);
          setRoomMate(data.members);
        }
      });
      return () => unsubscribe();
    }
  }, [roomCode]);

  useEffect(() => {
    if (!roomCode) return;
    const roomRef = doc(db, 'room', roomCode);
    const unsubscribe = onSnapshot(roomRef, (doc) => {
      const data = doc.data();
      if (data.playerState === 1) setIsPause(false);
      else if (data.playerState === 2) setIsPause(true);
    });
    return () => unsubscribe();
  }, []);

  const handleForward = async () => {
    const index = videoIds.findIndex(song => song.videoId === currentPlaying?.videoId);
    if (index !== -1 && index < videoIds.length - 1 && roomCode) {
      await updateDoc(doc(db, 'room', roomCode), {
        currentPlaying: videoIds[index + 1],
      });
      setCurrentTime(0);
    }
  
  };

  const handleBack = async () => {
    const index = videoIds.findIndex(song => song.videoId === currentPlaying?.videoId);
    if (index > 0 && roomCode) {
      await updateDoc(doc(db, 'room', roomCode), {
        currentPlaying: videoIds[index - 1],
      });
      setCurrentTime(0);
    }
  };

  const handleMouseDown = () => setIsSeeking(true);
  const handleMouseUp = () => setIsSeeking(false);

  const handleSeek = (event) => {
    if (onReady && seekBarRef.current) {
      const seekToTime = (event.nativeEvent.offsetX / seekBarRef.current.offsetWidth) * duration;
      onReady.seekTo(seekToTime);
      setCurrentTime(seekToTime);
      syncSeek(seekToTime);
    }
  };

  const handleLeaveRoom = async () => {
    if (roomMate.length > 0) {
      const updatedMembers = roomMate.filter(name => name !== Cookies.get('name'));
      await updateDoc(doc(db, 'room', roomCode), {
        members: updatedMembers,
      });
    }
    sessionStorage.removeItem('roomCode');
    setIsLeaving(true);
  };

  const handleSkipBackward10 = () => {
    const newTime = Math.max(currentTime - 10, 0);
    onReady.seekTo(newTime);
    setCurrentTime(newTime);
    syncSeek(newTime);
  };

  const handleSkipForward10 = () => {
    const newTime = Math.min(currentTime + 10, duration);
    onReady.seekTo(newTime);
    setCurrentTime(newTime);
    syncSeek(newTime);
  };

  const progressBarStyle = {
    width: `${(currentTime / duration) * 100}%`,
    height: '100%',
  };

  return (
    <div className="bg-black min-h-screen pt-4 px-3">
      {!roomCode ? (
        <>
          <div className="flex justify-center gap-4 mb-5">
            <button 
              onClick={() => setmodal_backdrop(true)}
              className="mt-6 mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none px-12 py-6 rounded-lg text-base font-semibold cursor-pointer shadow-lg transition-all uppercase tracking-wide min-w-[140px]"
            >
              New Room
            </button>

            <button 
              onClick={() => setmodal_backdrop1(true)}
              className="mt-6 mb-6 bg-gradient-to-r from-pink-300 to-purple-500 text-white border-none px-6 py-3 rounded-lg text-base font-semibold cursor-pointer shadow-lg transition-all uppercase tracking-wide min-w-[180px]"
            >
              Join with a code
            </button>
          </div>

          <div className="flex flex-col justify-center items-center text-slate-50 bg-cover bg-center bg-no-repeat bg-fixed rounded-lg p-5" style={{ backgroundImage: `url(${background})`, height: '300px' }}>
            <img src={require('../assests/recorder.png')} height={200} width={200} alt="recorder" />
            <h5 className="mt-4 font-bold">Get the Code that you can share</h5>
            <p className="text-sm text-center">Tap on new room to generate your own room code and share it with your friends!</p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center gap-1 mb-2 mt-2 text-white text-sm">
            {admin && (
              <p className="font-bold text-lg bg-black rounded-md px-3 py-1">
                Created by {admin.split(' ')[0] || admin}
              </p>
            )}
            <div className="flex flex-row items-center justify-center gap-4 flex-wrap">
              <button className="flex items-center gap-1 hover:text-pink-300" onClick={() => setIsLeaving(true)}>
                <IoBookmarksOutline size={16} /> {roomCode}
              </button>
              <button onClick={handleLeaveRoom} className="bg-white text-black px-3 py-1 rounded-md font-semibold text-sm">
                Leave Room
              </button>
              {playedBy && <span className="text-pink-200">Played by {playedBy.split(' ')[0] || playedBy}</span>}
            </div>
          </div>

          <div className="m-3">
            <Marquee><h5 className="text-slate-50 font-bold">{title || 'Song name'}</h5></Marquee>
            <p className="text-slate-200 m-2">{artist || 'Artist name'}</p>
          </div>

          <div
            className="bg-zinc-800 border-zinc-800 border-2 rounded-full h-1.5 cursor-pointer mx-auto"
            ref={seekBarRef}
            onClick={handleSeek}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={seekBarStyle}
          >
            <div className="seek-bar-progress bg-slate-100 rounded-full" style={progressBarStyle}></div>
          </div>

          <div className="mt-2 flex items-center justify-between text-slate-50 text-sm m-3">
            <span>{secondsToMinutes(currentTime)}</span>
            <span>{secondsToMinutes(duration)}</span>
          </div>

          <div className="flex justify-center items-center mt-8 gap-5 mb-5 text-white">
            <div className="bg-zinc-800 rounded-full p-2 cursor-pointer" onClick={handleSkipBackward10}>
              <span className="text-xs font-semibold px-2">-10s</span>
            </div>

            <div className="bg-zinc-800 rounded-full p-3 text-center cursor-pointer" onClick={handleBack}>
              <IoPlaySkipBack size={26} />
            </div>

            {isPause ? (
              <div className="bg-zinc-800 rounded-full p-3 text-center cursor-pointer" onClick={() => { syncPlay(); setIsPause(false); }}>
                <IoPlay size={26} />
              </div>
            ) : (
              <div className="bg-zinc-800 rounded-full p-3 text-center cursor-pointer" onClick={() => { syncPause(); setIsPause(true); }}>
                <IoPause size={26} />
              </div>
            )}

            <div className="bg-zinc-800 rounded-full p-3 text-center cursor-pointer" onClick={handleForward}>
              <IoPlaySkipForward size={26} />
            </div>

            <div className="bg-zinc-800 rounded-full p-2 cursor-pointer" onClick={handleSkipForward10}>
              <span className="text-xs font-semibold px-2">+10s</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
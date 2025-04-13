import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import { db } from '../firebase-config';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { HiMusicalNote } from 'react-icons/hi2';
import { useStateContext } from '../Context/ContextProvider';

const YouTubeVideo = ({ videoIds }) => {
  const intervalRef = useRef(null);
  const previousSeekRef = useRef(null);
  const [id, setId] = useState('');
  const {
    setOnReady, setTitle, setArtist, setVideoIds,
    currentPlaying, setCurrentPlaying, duration, setDuration,
    currentTime, setCurrentTime, isSeeking, setIsSeeking,
    seekBarRef, onReady, setPlayedBy
  } = useStateContext();

  const roomCode = sessionStorage.getItem('roomCode');

  const onVideoEnd = () => {
    const index = videoIds.findIndex(data => data.id === currentPlaying.id);
    const nextIndex = (index + 1) % videoIds.length;
    updateDoc(doc(db, 'room', roomCode), {
      currentSong: videoIds,
      currentPlaying: videoIds[nextIndex]
    }).catch(err => console.log(err));
  };

  useEffect(() => {
    const docRef = doc(db, 'room', roomCode);
    const unsub = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setVideoIds(data.currentSong);

        if (data.currentPlaying) {
          setCurrentPlaying(data.currentPlaying);
          setId(data.currentPlaying.id);
          setTitle(data.currentPlaying.title);
          setArtist(data.currentPlaying.channelName);
          setPlayedBy(data.currentPlaying.playedBy);
        }

        const ytPlayer = onReady;

        // Sync playback state
        if (data.playerState !== undefined && ytPlayer) {
          const state = ytPlayer.getPlayerState();
          if (data.playerState === 1 && state !== 1) {
            ytPlayer.playVideo();
          } else if (data.playerState === 2 && state === 1) {
            ytPlayer.pauseVideo();
          }
        }

        // 🔁 Sync seek
        if (data.seekTime !== undefined && ytPlayer) {
          const current = ytPlayer.getCurrentTime();
          if (Math.abs(current - data.seekTime) > 1.5) {
            ytPlayer.seekTo(data.seekTime, true);
          }
        }
      }
    });
    return () => unsub();
  }, [onReady]);

  const onReadyFunc = (event) => {
    setOnReady(event.target);
    setDuration(event.target.getDuration());
  };

  const onStateChange = (event) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      startInterval();
    } else {
      clearInterval(intervalRef.current);
    }
  };

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isSeeking && onReady) {
        const newTime = onReady.getCurrentTime();
        setCurrentTime(newTime);
      }
    }, 500);
  };

  const handleSeek = async (e) => {
    const percent = parseFloat(e.target.value);
    const newTime = percent * duration;
    setCurrentTime(newTime);
    setIsSeeking(true);
    onReady.seekTo(newTime, true);
    await updateDoc(doc(db, 'room', roomCode), {
      seekTime: newTime,
    });
    setTimeout(() => setIsSeeking(false), 500);
  };

  const opts = {
    height: '200',
    width: '100%',
    playerVars: {
      autoplay: 1,
      fs: 0,
      rel: 0,
      showinfo: 0,
      loop: 1,
      controls: 0,
      disablekb: 1,
      modestbranding: 1
    }
  };

  return (
    <div>
      {id ? (
        <>
          <YouTube
            videoId={id}
            opts={opts}
            onReady={onReadyFunc}
            onStateChange={onStateChange}
            onEnd={onVideoEnd}
          />
          {/* Seekbar */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={duration ? currentTime / duration : 0}
            onChange={handleSeek}
            style={{ width: '100%', marginTop: '8px' }}
          />
        </>
      ) : (
        <div className='h-60 w-60 mt-3 bg-zinc-800 rounded-lg flex justify-center items-center'>
          <HiMusicalNote color='black' size={86} />
        </div>
      )}
    </div>
  );
};

export default YouTubeVideo;
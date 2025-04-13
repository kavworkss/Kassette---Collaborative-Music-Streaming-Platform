import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import axios from 'axios';
import SongCard from '../Components/SongCard';
import '../App.css';
import Shimmer from '../Components/Shimmer';
import Toast from '../Components/Toast';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useStateContext } from '../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Search = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastDisplay, setToastDisplay] = useState(false);
  const [data, setData] = useState([]);
  const [roomMembers, setRoomMembers] = useState([]);
  const [roomAdmin, setRoomAdmin] = useState('');
  const { pathName } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    const roomCode = sessionStorage.getItem('roomCode');
    if (!roomCode) {
      navigate('/home');
      return;
    }

    const roomRef = doc(db, 'room', roomCode);
    const unsubscribe = onSnapshot(roomRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setRoomMembers(data.members || []);
        setRoomAdmin(data.roomAdmin || '');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const options = {
      method: 'GET',
      url: 'https://youtube-search-and-download.p.rapidapi.com/search',
      params: {
        query: input + ' songs',
        hl: 'en',
        gl: 'IN',
      },
      headers: {
        'X-RapidAPI-Key': 'a20d10e4d1msh1a3fec0a386219cp157f8djsnc2aa8d525304',
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setData(response.data.contents);
    } catch (error) {
      console.error('Search error:', error);
      setToastMsg('Failed to fetch songs. Please try again later.');
      setToastDisplay(true);
    } finally {
      setIsLoading(false);
    }
  };

  const shimmerArr = Array.from({ length: 12 });

  return (
    <div className="flex gap-0 h-screen overflow-hidden bg-black text-white">
      {/* Room Members Sidebar */}
      <div className="bg-zinc-900 w-64 flex flex-col border-r border-zinc-800">
        <div className="flex items-center px-5 py-3 border-b border-zinc-700 justify-between">
          <b className="text-xl">Room Members</b>
        </div>
        <div className="overflow-y-auto flex-1">
          {roomMembers.length > 0 ? (
            roomMembers.map((member, index) => {
              const isHost = member === roomAdmin;
              const isCurrentUser = member === Cookies.get('name');
              const profileImg = isCurrentUser ? Cookies.get('photoUrl') : null;

              return (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-3 border-b border-zinc-700"
                >
                  {profileImg ? (
                    <img
                      src={profileImg}
                      className="rounded-full h-9 w-9 object-cover"
                      alt="Profile"
                    />
                  ) : (
                    <div className="bg-zinc-700 rounded-full h-9 w-9 flex items-center justify-center text-sm font-semibold">
                      {member.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm break-words max-w-[140px]">
                    {isHost ? `${member} (Host)` : member}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="px-5 py-3 text-center text-sm text-zinc-400">
              No members in room
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start mt-10">
        {/* Search Heading */}
        <div className="text-white text-2xl mb-4 text-center">
          <b style={{marginRight:'150px'}}>Search</b>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex gap-2 w-full max-w-2xl justify-center"
        >
          <div className="flex-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-[2px]">
            <input style={{marginRight:'150px'}}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 text-black text-sm rounded-lg outline-none"
              placeholder="Find your track..."
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg text-white"
            style={{marginRight:'110px'}}
          >
            <Icon path={mdiMagnify} size={1} />
          </button>
        </form>

        {/* Songs List */}
        <div className="mt-10 w-full px-4 mb-10">
          <div
            className="flex flex-col overflow-hidden overflow-y-scroll"
            style={{ maxHeight: 'calc(100vh - 220px)' }}
          >
            {!isLoading && data.length > 0 ? (
              data.map((obj, index) =>
                'video' in obj ? (
                  <SongCard
                    key={index}
                    image={obj.video.thumbnails[0].url}
                    title={obj.video.title}
                    id={obj.video.videoId}
                    channelName={obj.video.channelName}
                    setToastDisplay={setToastDisplay}
                    setToastMsg={setToastMsg}
                  />
                ) : null
              )
            ) : isLoading ? (
              shimmerArr.map((_, index) => <Shimmer key={index} />)
            ) : (
              <div className="flex flex-col justify-center items-center mt-14 m-3 text-slate-50">
                <img
                  src={require('../assests/tape.png')}
                  height={200}
                  width={200}
                  alt="Cassette"
                />
                <h5 className="mt-7">
                  <b>Find your favorite tracks here</b>
                </h5>
                <p className="text-sm text-center">
                  Listen to your favorite tracks and artists together with your loved ones!
                </p>
              </div>
            )}
          </div>

          {toastDisplay && (
            <div className="flex justify-center">
              <Toast message={toastMsg} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
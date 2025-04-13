import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { signOut } from 'firebase/auth';

import { IoBookmarksOutline } from 'react-icons/io5';
import { useStateContext } from '../Context/ContextProvider';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const nav = useNavigate();
  const [myRoom, setMyRoom] = useState([]);
  const { setPathName } = useStateContext();

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        setPathName('/');
        nav('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const getData = async () => {
      const filteredQuery = query(
        collection(db, 'room'),
        where('roomAdmin', '==', Cookies.get('name'))
      );
      const data = await getDocs(filteredQuery);
      setMyRoom(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white p-6 z-10 relative">
      {/* Profile Grid Section */}
      <div className="flex flex-row justify-between w-full gap-8">
        {/* Others Section */}
        <div className="flex flex-col justify-start w-1/3">
          <h2 className="text-base font-semibold mb-3">Others</h2>
          <div className="flex flex-col gap-3 text-sm">
            <a href="/third-party" className="text-white hover:underline">
              Third-party Software
            </a>
            <a href="/privacy-policy" className="text-white hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="text-white hover:underline">
              Terms and Conditions
            </a>
            <button
              onClick={signOutUser}
              className="py-2 px-6 text-white text-base font-bold rounded-lg mt-2 w-fit"
              style={{
                backgroundImage: 'linear-gradient(40deg,rgb(103, 180, 206),rgb(141, 19, 149),rgb(28, 86, 156))',
                backgroundSize: '200% auto',
                animation: 'gradient-flow 4s linear infinite',
              }}
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="flex flex-col items-center gap-2 w-1/3">
          <img
            src={Cookies.get('photoUrl')}
            alt="Profile"
            className="rounded-full h-20 w-20 object-cover border-2 border-white"
          />
          <p className="text-lg font-semibold">{Cookies.get('name')}</p>
          <p className="text-sm text-gray-400">{Cookies.get('email')}</p>
          {sessionStorage.getItem('roomCode') ? (
            <p className="text-sm text-green-400">
              Current Room: {sessionStorage.getItem('roomCode')}
            </p>
          ) : (
            <p className="text-sm text-gray-500">No room joined</p>
          )}
        </div>

        {/* My Rooms Section */}
        <div className="w-1/3">
          <h2 className="text-lg font-semibold mb-2">My Rooms</h2>
          <div className="bg-zinc-900 rounded-md p-3 h-32 overflow-y-auto text-sm space-y-2">
            {myRoom.length > 0 ? (
              myRoom.map((data) => (
                <div
                  key={data.id}
                  className="flex items-center gap-2 text-slate-200"
                >
                  <IoBookmarksOutline size={16} />
                  {data.roomCode}
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center mt-5">
                No rooms created yet!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
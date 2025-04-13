import React, { useEffect } from 'react';
import { IoChatbox, IoChatboxOutline } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GoHome, GoHomeFill, GoPerson } from "react-icons/go";
import { RxMagnifyingGlass } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useStateContext } from '../Context/ContextProvider';
import logo from '../assests/logo.png';
import { IoHomeOutline, IoSearchOutline, IoChatbubbleOutline, IoPersonOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const nav = useNavigate();
  const { pathName, setPathName, notification } = useStateContext();

  useEffect(() => {
    const getPathName = () => {
      setPathName(window.location.pathname);
    };
    getPathName();
  }, [window.location.pathname]);

  return (
    <div className="bg-zinc-900 w-full">
      {/* Compact Logo Section */}
      <div className="flex items-center px-5 py-1 text-white">
        <img src={logo} className="h-14 w-auto" alt="logo" />
        <b
          className="ml-3 text-2xl text-transparent bg-clip-text animate-gradient"
          style={{
            backgroundImage: 'linear-gradient(90deg,rgb(111, 41, 222), #ffb6c1, #add8e6)',
            backgroundSize: '200% auto',
            animation: 'gradient-flow 4s linear infinite',
          }}
        >
          Kassette- Add Now, Jam Wow!
        </b>
      </div>

      {/* More Compact Nav Bar */}
      <div className="bg-zinc-900 flex justify-around items-center pt-1 pb-1.5 text-white text-sm">
        <div className="flex flex-col items-center">
          <Link to="/home" className="flex flex-col items-center">
            {pathName.includes("home") ? (
              <GoHomeFill size={20} className="text-white font-bold" />
            ) : (
              <GoHome size={20} className="text-white font-bold" />
            )}
          </Link>
          <span className="font-medium text-white mt-0.5">Home</span>
        </div>

        <div className="flex flex-col items-center">
          <Link to="/search" className="flex flex-col items-center">
            {!pathName.includes("search") ? (
              <RxMagnifyingGlass size={20} className="text-white font-bold" />
            ) : (
              <FaMagnifyingGlass size={18} className="text-white font-bold" />
            )}
          </Link>
          <span className="font-medium text-white mt-0.5">Search</span>
        </div>

        <div className="flex flex-col items-center relative">
          <Link to="/chat" className="flex flex-col items-center">
            {notification > 0 && (
              <div className="absolute -top-1 -right-3 bg-white text-black rounded-full text-xs px-1.5 font-bold">
                {notification}
              </div>
            )}
            {pathName.includes("chat") ? (
              <IoChatbox size={20} className="text-white font-bold" />
            ) : (
              <IoChatboxOutline size={20} className="text-white font-bold" />
            )}
          </Link>
          <span className="font-medium text-white mt-0.5">Chat</span>
        </div>

        <div className="flex flex-col items-center">
          <Link to="/profile" className="flex flex-col items-center">
            {Cookies.get("photoUrl") ? (
              <img
                src={Cookies.get("photoUrl")}
                className="rounded-full h-6 w-6 object-cover"
                alt="profile"
              />
            ) : (
              <GoPerson size={20} className="text-white font-bold" />
            )}
          </Link>
          <span className="font-medium text-white mt-0.5">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
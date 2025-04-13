import React, { useEffect, useState } from 'react'
import logo from '../assests/logo.png'
import { auth } from '../firebase-config'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../Context/ContextProvider'
import loginbg from '../assests/dclogin.png'

const Login = () => {
  const [user, setUser] = useState('')
  const { setPathName } = useStateContext()
  const nav = useNavigate()
  const provider = new GoogleAuthProvider()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        Cookies.set('name', user.displayName)
        Cookies.set('email', user.email)
        Cookies.set('phone', user.phoneNumber)
        Cookies.set('photoUrl', user.photoURL)
        Cookies.set('uid', user.uid)
        setPathName('/home')
        nav('/home')
      }
    })
  }, [])

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        Cookies.set('name', user.displayName)
        Cookies.set('email', user.email)
        Cookies.set('phone', user.phoneNumber)
        Cookies.set('photoUrl', user.photoURL)
        Cookies.set('uid', user.uid)
        nav('/home')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div
      className="flex flex-col items-center gap-6 justify-center h-screen px-4 text-center"
      style={{
        backgroundImage: `url(${loginbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        paddingTop: '3rem' // shift everything a bit up
      }}
    >
      {/* App Title */}
      <h1
  className="text-6xl font-extrabold text-transparent bg-clip-text animate-gradient relative"
  style={{
    backgroundImage: 'linear-gradient(90deg,rgb(103, 180, 206),rgb(141, 19, 149),rgb(28, 86, 156))',
    backgroundSize: '200% auto',
    animation: 'gradient-flow 6s linear infinite',
    fontFamily: "'Courier New', monospace", // Monospace font for typewriter effect
    overflow: 'hidden', // Hide overflow for typewriter effect
    whiteSpace: 'nowrap', // Keep text in single line
    borderRight: '0.15em solid #fff', // Cursor effect
    width: 'fit-content', // Only take needed width
    margin: '0 auto', // Center horizontally
    animation: 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite, gradient-flow 6s linear infinite'
  }}
>
  Kassette — Add Now, Jam Wow!
</h1>

<style jsx>{`
  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }
  
  @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: #fff }
  }
  
  @keyframes gradient-flow {
    0% { background-position: 0% center }
    100% { background-position: 200% center }
  }
`}</style>

      {/* Logo */}
      <img
        src={logo}
        height={300}
        width={300}
        alt="Kasette Logo"
        className="mt-2"
      />

      {/* Google Button */}
      <button
        className="flex flex-row-reverse items-center gap-3 border rounded-lg bg-slate-50 p-3 text-black hover:bg-white hover:shadow-md transition"
        type="button"
        onClick={handleLogin}
      >
        Continue with Google
        <img
          src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
          alt="Google icon"
        />
      </button>
    </div>
  )
}

export default Login
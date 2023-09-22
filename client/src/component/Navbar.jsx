import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Navbar() {

  const isLogin = useSelector((state) => state.userData.isLogin)

  return (
    <div>
      <div className='w-[100vw] h-[60px] flex gap-x-4'>
        <div><Link to="/">Home </Link></div>
        {(isLogin) ?
          <>
            <div><Link to="/profile">Profile </Link></div>
            <div><Link to="/forum">Forum </Link></div>
            <div><Link to="/searchLawer">Search </Link></div>
            <div><Link to="/message">Message </Link></div>
            <div><Link to="/logout">Logout </Link></div>
          </>
          :
          <>
            <div><Link to="/signin">Signin </Link></div>
            <div><Link to="/signup">Signup </Link></div>
          </>
        }
        <div><Link to="/about">About </Link></div>
      </div>
    </div>
  )
}

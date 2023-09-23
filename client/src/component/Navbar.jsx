import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


export default function Navbar() {

  const isLogin = useSelector((state) => state.userData.isLogin)

  return (
    <div>
      <div className=' flex w-[100vw] h-[130px] gap-x-4'>
        <div><Link to="/">Home </Link></div>
        {(isLogin) ?
          <>
            <div><Link to="/profile">Profile </Link></div>
            <div><Link to="/logout">Logout </Link></div>
            <div><Link to="/forum">ChitChat </Link></div>
            <div><Link to="/searchlawyer">Search </Link></div>
            <div><Link to="/forum2">Forum2 </Link></div>
          </>
          :
          <>
            <div><Link to="/signin">Signin </Link></div>
            <div><Link to="/signup">Signup </Link></div>
          </>
        }
        <div><Link to="/about">About </Link></div>
        <div><Link to="/review">Review </Link></div>
        {/* <div><Link to="/starrating">StarRating </Link></div> */}
      </div>
    </div>
  )
}

import React from 'react'
import { useSelector } from 'react-redux';

export default function Home() {
  
  const USER_TYPE = {
    PUBLIC: "Public User",
    USER: "User",
    MEDIATER:"Mediater",
    ADMIN: "Admin",
    SUPER_ADMIN: "Super Admin",
  };

  const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);
  const name = useSelector((state)=>state.userData.name)
  const email = useSelector((state)=>state.userData.email)
  const id = useSelector((state)=>state.userData.id)
  
  return (
    <div>
      home
      <br />
      Current role: {CURRENT_USER_TYPE}
      <br />
      name: {name}
      <br />
      email: {email}
      <br />
      id : {id}
      <br />

      
    </div>
  )
}

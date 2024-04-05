import React from 'react'
import './index.css'

import { FaUser } from "react-icons/fa"

const UserNav = () => {
  return (
    <>
      <div className='user-top-nav'>
        <p className='user-top-nav-h1'><FaUser /> User</p>
        <p className='user-top-nav-h2'>User Dashboard</p>
      </div>
    </>
  )
}

export default UserNav
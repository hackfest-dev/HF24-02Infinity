import React from 'react'
import './index.css'

import { FaUser } from "react-icons/fa"

const AdminNav = () => {
  return (
    <>
      <div className='admin-top-nav'>
        <p className='admin-top-nav-h1'><FaUser /> Admin</p>
        <p className='admin-top-nav-h2'>Admin Dashboard</p>
      </div>
    </>
  )
}

export default AdminNav
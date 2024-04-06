import React from 'react'
import './index.css'

import { FaUser } from "react-icons/fa"

const DriverNav = () => {
  return (
    <>
      <div className='admin-top-nav'>
        <p className='admin-top-nav-h1'><FaUser /> Driver</p>
        <p className='admin-top-nav-h2'>Driver Dashboard</p>
      </div>
    </>
  )
}

export default DriverNav
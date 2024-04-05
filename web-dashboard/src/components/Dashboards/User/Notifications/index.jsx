import React, { useEffect, useState } from 'react'
import './index.css'

import { GrOverview } from "react-icons/gr"
import { FaRegCircleUser } from "react-icons/fa6"

import { Link, } from 'react-router-dom'

const Notifications = () => {

  const [activeDrivers, setActiveDrivers] = useState([])


  return (
    <>
      <div className='user-notif-container'>
        <div className='user-notif-container'>
          <h3 className='user-notif-heading'>Notifications</h3>
          <p className='user-notif-link'><GrOverview />Somebody Just accepted</p>
        </div>
      </div>
    </>
  )
}

export default Notifications
import React, { useEffect, useState } from 'react'
import './index.css'

import { GrOverview } from "react-icons/gr"
import { FaRegCircleUser } from "react-icons/fa6"

import { Link, } from 'react-router-dom'

const Notifications = () => {

  const [activeDrivers, setActiveDrivers] = useState([])

  useEffect(() => {
    setActiveDrivers([{ drivername: 'Joseph', link: 'joseph@gmail.com' },
    { drivername: 'Drew Cano', link: 'drewcano@gmail.com' }])
  }, [])

  return (
    <>
      <div className='admin-notif-container'>
        <div className='admin-notif-container'>
          <h3 className='admin-notif-heading'>Notifications</h3>
          <p className='admin-notif-link'><GrOverview />Somebody Just accepted</p>
        </div>
        <div className='admin-notif-container'>
          <h3 className='admin-notif-heading'>Contacts</h3>
          {activeDrivers.map((driver, key) => {
            return (
              <Link className='admin-notif-link' to='#' key={key}><FaRegCircleUser />{driver.drivername}</Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Notifications
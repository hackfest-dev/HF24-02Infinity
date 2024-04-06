import React, { useEffect, useState } from 'react'
import './index.css'

import { GrOverview } from "react-icons/gr"
import { FaRegCircleUser } from "react-icons/fa6"

import { Link, } from 'react-router-dom'

const Notifications = () => {

  const [activeDrivers, setActiveDrivers] = useState([])

  const [notfs, setNotfs] = useState([])

  const getNotfs = async () => {
    if (localStorage.getItem("userId")) {
      const response = await fetch(
        "http://localhost:5001/api/notification/getusernotification",
        {
          method: "POST",
          headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem('userId')
          }),
        }
      )

      const data = await response.json()

      if (data.status === 200) {
        setNotfs(data.notfs)
      }
    }
  }

  useEffect(() => {
    getNotfs()
  }, [])

  return (
    <>
      <div className='user-notif-container'>
        <div className='user-notif-container'>
          <h3 className='user-notif-heading'>Notifications</h3>
          {notfs.map((value, key) => {
            return (
              <p className='user-notif-link'>
                <GrOverview /> {value.description}
              </p>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Notifications
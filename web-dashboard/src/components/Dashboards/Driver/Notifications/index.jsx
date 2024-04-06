import React, { useEffect, useState } from 'react'
import './index.css'

import { GrOverview } from "react-icons/gr"
import { FaRegCircleUser } from "react-icons/fa6"

const Notifications = ({ basicData }) => {

  const [notfs, setNotfs] = useState([])

  const getNotfs = async () => {
    if (localStorage.getItem("userId")) {
      const response = await fetch(
        "http://localhost:5001/api/notification/getdrivernotification",
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
        console.log(notfs)
      }
    }
  }

  useEffect(() => {
    getNotfs()
  }, [])


  return (
    <>
      <div className='admin-notif-container'>
        <div className='admin-notif-container'>
          <h3 className='admin-notif-heading'>Notifications</h3>
          {notfs.map((value, key) => {
            return (
              <p className='user-notif-link' key={key}>
                <GrOverview /> {value.description}
              </p>
            )
          })}
        </div>

        <div className='admin-notif-container'>
          <h3 className='admin-notif-heading'>Contacts</h3>
          {basicData && basicData.customersList && basicData.customersList.map((driver, key) => {
            return (
              <div className='admin-notif-link' key={key}>
                <FaRegCircleUser />
                <p>{driver.email}</p>
                <p>{driver.mobileNumber}</p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Notifications
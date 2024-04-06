import React, { useState, useEffect } from 'react'
import Overview from './overview'
import './index.css'

import Nav from './Nav'
import SideNav from './SideNav'
import Notifications from './Notifications'

const AdminDashboard = () => {

  const [basicData, setBasicData] = useState({
    customersList: 0,
    customersCount: 0,
    driversCount: 0,
    fleetCount: 0,
    drivers: [],
    users: [],
    admin: ''
  })

  const getBasicData = async () => {
    if (localStorage.getItem("userId")) {
      const response = await fetch(
        "http://localhost:5001/api/dashboard/admin",
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
        console.log(data)
        setBasicData({
          customersList: data.customersList,
          customersCount: data.customersCount,
          driversCount: data.driversCount,
          fleetCount: data.fleetCount,
          admin: data.admin,
          drivers: data.drivers,
          users: data.users
        })
      }
    }
  }

  useEffect(() => {
    getBasicData()
  }, [])

  return (
    <>
      <Nav />
      <div className='admin-container'>
        <SideNav />
        <Overview basicData={basicData}/>
        <Notifications basicData={basicData}/>
      </div>
    </>
  )
}

export default AdminDashboard
import React, { useEffect, useState } from 'react'
import Overview from './overview'
import './index.css'

import Nav from './Nav'
import SideNav from './SideNav'
import Notifications from './Notifications'

const DriverDashboard = () => {

  const [basicData, setBasicData] = useState({
    driver: {},
    customersList: 0,
    customersCount: 0,
    driversCount: 0,
    fleetCount: 0,
  })

  const getBasicData = async () => {
    if (localStorage.getItem("userId")) {
      const response = await fetch(
        "http://localhost:5001/api/dashboard/driver",
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
        setBasicData({
          ...basicData,
          driver: data.driver,
          customersList: data.customersList,
          customersCount: data.customersCount,
          driversCount: data.driversCount,
          fleetCount: data.fleetCount
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
        <SideNav/>
        <Overview basicData={basicData}/>
        <Notifications basicData={basicData}/>
      </div>
    </>
  )
}

export default DriverDashboard
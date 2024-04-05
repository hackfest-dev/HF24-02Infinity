import React from 'react'
import Overview from './overview'
import './index.css'

import Nav from './Nav'
import SideNav from './SideNav'
import Notifications from './Notifications'

const UserDashboard = () => {
  return (
    <>
      <Nav />
      <div className='user-container'>
        <SideNav />
        <Overview />
        <Notifications />
      </div>
    </>
  )
}

export default UserDashboard
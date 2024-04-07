import React from 'react'
import './index.css'

import { GrOverview } from "react-icons/gr"
import { IoIosAlert } from "react-icons/io"
import { FaLocationDot } from "react-icons/fa6"
import { TbListDetails } from "react-icons/tb"

import { Link } from 'react-router-dom'

const SideNav = () => {
  return (
    <>
      <div className='user-side-nav'>
        <div className='user-side-nav-container'>
          <h3 className='user-side-nav-heading'>Dashboards</h3>
          <p className='user-side-nav-link'><GrOverview />Overview</p>
          <a href="#add-delivery-request" className='add-delivery-request-link'><p className='user-side-nav-link'><IoIosAlert />Add Delivery Request</p></a>
        </div>
        <div className='user-side-nav-container'>
          <h3 className='user-side-nav-heading'>Pages</h3>
          <p className='user-side-nav-link'><TbListDetails />Driver Details</p>
          <p className='user-side-nav-link'><FaLocationDot />Current Location</p>
          <Link to='/login' class='logout-user'>LOGOUT</Link>
        </div>
      </div >
    </>
  )
}

export default SideNav
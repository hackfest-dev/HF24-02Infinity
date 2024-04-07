import React from 'react'
import './index.css'

import { GrOverview } from "react-icons/gr"
import { IoIosAlert } from "react-icons/io"
import { FaLocationDot, FaClipboardUser } from "react-icons/fa6"

import { Link } from 'react-router-dom'


const SideNav = () => {
  return (
    <>
      <div className='admin-side-nav'>
        <div className='admin-side-nav-container'>
          <h4 className='admin-side-nav-heading'>Dashboards</h4>
          <p className='admin-side-nav-link'><GrOverview />Overview</p>
          <a href="#open-bidding-request" className='admin-side-nav-link'><p className='open-bidding-request'><IoIosAlert />Biddings</p></a>
          <p className='admin-side-nav-link'><FaLocationDot />Current Location</p>
        </div>
        <div className='admin-side-nav-container'>
          <h4 className='admin-side-nav-heading'>Pages</h4>
          <p className='admin-side-nav-link'><FaClipboardUser />Customer Details</p>
        </div>
        <Link to='/login' class='logout-driver'>LOGOUT</Link>
      </div >
    </>
  )
}

export default SideNav
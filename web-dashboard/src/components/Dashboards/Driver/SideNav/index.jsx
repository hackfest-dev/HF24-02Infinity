import React from 'react'
import './index.css'

import { GrOverview } from "react-icons/gr"
import { IoIosAlert } from "react-icons/io"
import { FaLocationDot, FaRegAddressCard, FaClipboardUser } from "react-icons/fa6"


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
          <p className='admin-side-nav-link'><FaRegAddressCard />Address</p>
        </div>
        <h4 className='admin-side-nav-container'>Logout</h4>
      </div >
    </>
  )
}

export default SideNav
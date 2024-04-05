import React from 'react'
import './index.css'

import { GrOverview } from "react-icons/gr"
import { FaHistory } from "react-icons/fa"
import { IoIosAlert } from "react-icons/io"
import { FaUserGroup, FaLocationDot, FaRegAddressCard, FaClipboardUser } from "react-icons/fa6"
import { TbListDetails } from "react-icons/tb"
import { ImSleepy2 } from "react-icons/im"
import { RiEmotionNormalFill } from "react-icons/ri"
import { BsSpeedometer } from "react-icons/bs"
import { GiDistraction } from "react-icons/gi"
import { VscHistory } from "react-icons/vsc"

const SideNav = () => {
  return (
    <>
      <div className='admin-side-nav'>
        <div className='admin-side-nav-container'>
          <h4 className='admin-side-nav-heading'>Dashboards</h4>
          <p className='admin-side-nav-link'><GrOverview />Overview</p>
          <p className='admin-side-nav-link'><FaHistory />Driver History</p>
          <p className='admin-side-nav-link'><IoIosAlert />Biddings</p>
          <p className='admin-side-nav-link'><FaUserGroup />Customers</p>
        </div>
        <div className='admin-side-nav-container'>
          <h4 className='admin-side-nav-heading'>Pages</h4>
          <p className='admin-side-nav-link'><TbListDetails />Driver Details</p>
          <p className='admin-side-nav-link'><FaLocationDot />Current Location</p>
          <p className='admin-side-nav-link'><ImSleepy2 />Drowsiness</p>
          <p className='admin-side-nav-link'><RiEmotionNormalFill />Emotions</p>
          <p className='admin-side-nav-link'><BsSpeedometer />Speed</p>
          <p className='admin-side-nav-link'><GiDistraction />Distracted Driving</p>
          <p className='admin-side-nav-link'><FaClipboardUser />Customer Details</p>
          <p className='admin-side-nav-link'><FaRegAddressCard />Address</p>
          <p className='admin-side-nav-link'><VscHistory />History</p>
        </div>
        <h4 className='admin-side-nav-container'>Logout</h4>
      </div >
    </>
  )
}

export default SideNav
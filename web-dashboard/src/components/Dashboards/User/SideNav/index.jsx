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
          <p className='user-side-nav-link'><ImSleepy2 />Drowsiness</p>
          <p className='user-side-nav-link'><RiEmotionNormalFill />Emotions</p>
          <p className='user-side-nav-link'><BsSpeedometer />Speed</p>
          <p className='user-side-nav-link'><GiDistraction />Distracted Driving</p>
          <p className='user-side-nav-link'><FaClipboardUser />Customer Details</p>
          <p className='user-side-nav-link'><FaRegAddressCard />Address</p>
          <p className='user-side-nav-link'><VscHistory />History</p>
        </div>
      </div >
    </>
  )
}

export default SideNav
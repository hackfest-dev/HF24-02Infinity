import React from 'react'
import './index.css'

import { FaRegCircleUser } from "react-icons/fa6"

const Notifications = ({ basicData }) => {

  return (
    <>
      <div className='admin-notif-container'>
        <div className='admin-notif-container'>
          <h3 className='admin-notif-heading'>Contacts</h3>
          {basicData && basicData.customersList && basicData.customersList.length === 0 &&
            <p>No contacts found</p>
          }
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
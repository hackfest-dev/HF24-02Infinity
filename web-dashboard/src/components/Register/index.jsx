import React, { useState } from 'react'
import './index.css'


import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    email: '',
    mobileNumber: '',
    password: '',
    rePassword: '',
    type: 'user'
  })

  const [message, setMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()

    if (userData.mobileNumber.length != 10) {
      setMessage('Enter 10 digit mobile number')
      return
    }

    if (userData.password !== userData.rePassword) {
      setMessage('Both passwords must match')
      return
    }

    const response = await fetch(
      "http://localhost:5001/api/user/register",
      {
        method: "POST",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          ...userData,
        }),
      }
    )

    const data = await response.json()

    if (data.status === 200) {
      setMessage(data.message + '... Now you can login')
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } else {
      setMessage(data.message)
    }
  }

  return (
    <div className='register-block'>
      <div className="register-wrapper">
        <div className="register-block1">
          <h3 className="register-title">Create an account</h3>
          <form onSubmit={(e) => onSubmit(e)}>
            <input type="email" name='email' placeholder="Enter your email" required value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
            <input type="number" name='mobileNumber' placeholder="Enter Your Mobile Number" required value={userData.mobileNumber} onChange={(e) => setUserData({ ...userData, mobileNumber: e.target.value })} />
            <input type="password" name='password' placeholder="Enter your password" required value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
            <input type="password" name='rePassword' placeholder="Re-Enter your password" required value={userData.rePassword} onChange={(e) => setUserData({ ...userData, rePassword: e.target.value })} />
            <select onChange={(e) => {setUserData({ ...userData, type: e.target.value })}} required className='register-select'>
              <option value="user">User</option>
              <option value="driver">Driver</option>
            </select>
            <p className='register-message'>{message}</p>
            <input type="submit" value="Create my account" />
            <p>Already having an account? <Link className="register-link" to="/login">Go to Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
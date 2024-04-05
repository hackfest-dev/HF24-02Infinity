import React, { useState } from 'react'
import './index.css'

import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  const [message, setMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()


    const response = await fetch(
      "http://localhost:5001/api/user/login",
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
      setMessage(data.message + '... Redirecting ...')

      let url = ''
      if (data.data.type === 'admin')
        url = '/admindashboard'
      if (data.data.type === 'user')
        url = '/userdashboard'
      if (data.data.type === 'driver')
        url = '/driverdashboard'

      localStorage.setItem("userId", data.data._id)
      setTimeout(() => {
        navigate(url)
      }, 3000)
    } else {
      setMessage(data.message)
    }
  }

  return (
    <div className='login-block'>
      <div className="login-wrapper">
        <div className="login-block1">
          <h3 className="login-title">Login to your account</h3>
          <form onSubmit={(e) => onSubmit(e)}>
            <input type="text" name='email' placeholder="Enter your email" required value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
            <input type="password" name='password' placeholder="Enter your password" required value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
            <p className='login-message'>{message}</p>
            <input type="submit" value="Login to my account" />
            <p>Not having an account? <Link className="login-link" to="/register">Go to Register</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
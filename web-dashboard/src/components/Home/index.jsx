import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div id='home'>
        <Link to="/register" className='get-started-link'><button className='get-started'>Get Started</button></Link>
      </div>
    </>
  )
}

export default Home
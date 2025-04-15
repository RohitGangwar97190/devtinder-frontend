import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/> 
        {/* with the outlet all the routes are oprn within this and teh nvabr at the top and the footer are at the lower alwyas */}
        <Footer/>
    </div>
  )
}

export default Body
import React, { Fragment } from 'react'
import { Home } from '..'
import { Footer, Navbar, Sidebar } from '../../components'
import Navbar1 from './../../components/Navbar/Navbar'
import Footerr from "./../../components/Footerr"

const HomeClient = () => {
  return (
    <Fragment>
        {/* <Navbar/> */}
        <Navbar1/>
        {/* <Sidebar/> */}
        <div className='container'>
        <Home/>
        <Footerr/>
        </div>
    </Fragment>
  )
}

export default HomeClient
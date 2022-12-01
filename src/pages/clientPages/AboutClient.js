import React, { Fragment } from 'react'
import { About } from '..'
import { Footer, Navbar, Sidebar } from '../../components'
import Navbar1 from './../../components/Navbar/Navbar'
import Footerr from "./../../components/Footerr"


const AboutClient = () => {
  return (
    <Fragment>
    <Navbar1/>
    <Sidebar/>
    <div className='container'>
    <About/>
    <Footerr/>
    </div>
    </Fragment>
  )
}

export default AboutClient
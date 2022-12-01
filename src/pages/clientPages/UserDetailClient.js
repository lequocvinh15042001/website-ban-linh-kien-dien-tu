import React, { Fragment } from 'react'
import Navbar1 from './../../components/Navbar/Navbar'
import Footerr from "./../../components/Footerr"
import Profile from '../Profile'
import { Sidebar } from '../../components'
import ContactHelp from '../../components/ContactHelp'

const UserDetailClient = () => {
  return (
    <Fragment>
    <Navbar1/>
    <Sidebar/>
    <Profile/>
    {/* <ContactHelp/> */}
    <Footerr/>
    </Fragment>
  )
}

export default UserDetailClient
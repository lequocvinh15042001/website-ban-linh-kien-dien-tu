import React, { Fragment } from 'react'
import ForgotPassword from '../../screens/ForgotPassword'
import Footerr from '../../components/Footerr'
import { Sidebar } from '../../components'
import Navbar1 from './../../components/Navbar/Navbar'


const ForgotPasswordClient = () => {
  return (
    <Fragment>
    <Navbar1/>
    <Sidebar/>
    <ForgotPassword/>
    <Footerr/>
    </Fragment>
  )
}

export default ForgotPasswordClient
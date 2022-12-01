import React, { Fragment } from 'react'
import ChangePassword from '../../screens/ChangePassword'
import { Sidebar } from '../../components'
import Navbar1 from './../../components/Navbar/Navbar'
import Footerr from '../../components/Footerr'

const ChangePasswordClient = () => {  
  return (
    <Fragment>
    <Navbar1/>
    <Sidebar/>
    <ChangePassword/>
    <Footerr/>
    </Fragment>
  )
}

export default ChangePasswordClient
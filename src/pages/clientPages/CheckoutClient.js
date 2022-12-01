import React, { Fragment } from 'react'
import { Checkout } from '..'
import { Footer, Navbar, Sidebar } from '../../components'
import Footerr from '../../components/Footerr'
import Navbar1 from './../../components/Navbar/Navbar'

const CheckoutClient = () => {
  return (
    <Fragment>
        <Navbar1/>
        <Sidebar/>
        <Checkout/>
        <Footerr/>
    </Fragment>
  )
}

export default CheckoutClient
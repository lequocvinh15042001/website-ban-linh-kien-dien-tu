import React, { Fragment } from 'react'
import { Footer, Navbar, Sidebar } from '../../components'
import Footerr from '../../components/Footerr'
import PaymentScreen from '../../screens/PaymentScreen'
import Navbar1 from './../../components/Navbar/Navbar'

const PaymentScreenClient = () => {
  return (
    <Fragment>
        <Navbar1/>
        <Sidebar/>
        <PaymentScreen/>
        <Footerr/>
    </Fragment>
  )
}

export default PaymentScreenClient
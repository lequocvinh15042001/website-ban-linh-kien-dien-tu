import React, { Fragment } from 'react'
import { Cart } from '..'
import { Footer, Navbar, Sidebar } from '../../components'
import Navbar1 from './../../components/Navbar/Navbar'
import Footerr from "./../../components/Footerr"
import CartPage from '../../pages/CartPage/CartPage'
import ContactHelp from '../../components/ContactHelp'

const CartClient = () => {
  return (
    <Fragment>
    <Navbar1/>
    <Sidebar/>
    <CartPage/>
    {/* <ContactHelp/> */}
    <Footerr/>
    </Fragment>
  )
}

export default CartClient
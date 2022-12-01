import React, { Fragment } from 'react'
import { Products } from '..'
import { Footer, Navbar, Sidebar } from '../../components'
import Navbar1 from './../../components/Navbar/Navbar'
import Footerr from "./../../components/Footerr"


const ProductClient = () => {
  return (
    <Fragment>
    <Navbar1/>
    <Sidebar/>
    <Products/>
    <Footerr/>
    </Fragment>
  )
}

export default ProductClient
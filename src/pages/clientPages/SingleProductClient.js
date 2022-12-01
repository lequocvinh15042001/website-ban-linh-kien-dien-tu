import React, { Fragment } from 'react'
import { SingleProduct } from '..'
import { Contact, Footer, Navbar, Sidebar } from '../../components'
import Comment from '../../components/Comment'
import Footerr from '../../components/Footerr'
import Navbar1 from './../../components/Navbar/Navbar'

const SingleProductClient = () => {
  return (
    <Fragment>
        <Navbar1/>
        <Sidebar/>
        <SingleProduct/>
        <Comment/>
        {/* <Contact/> */}
        <Footerr/>
    </Fragment>
  )
}

export default SingleProductClient
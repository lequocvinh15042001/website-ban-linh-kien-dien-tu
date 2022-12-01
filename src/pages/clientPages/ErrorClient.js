import React, { Fragment } from 'react'
import { Footer, Navbar, Sidebar } from '../../components'
import Footerr from '../../components/Footerr'
import ErrorPage from '../ErrorPage'
import Navbar1 from './../../components/Navbar/Navbar'

const ErrorClient = () => {
  return (
    <Fragment>
    <Navbar1/>
    <Sidebar/>
    <ErrorPage/>
    <Footerr/>
    </Fragment>
  )
}

export default ErrorClient
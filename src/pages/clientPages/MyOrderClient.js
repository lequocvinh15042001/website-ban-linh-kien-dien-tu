import React, { Fragment } from 'react'
import { Sidebar } from '../../components'
import Footerr from '../../components/Footerr'
import HistoryPage from '../HistoryPage'
import MyOrderPage from '../MyOrderPage'
import Navbar1 from './../../components/Navbar/Navbar'


const MyOrderClient = () => {
  return (
    <Fragment>
    <Navbar1/>
    <Sidebar/>
    <MyOrderPage/>
    <HistoryPage/>
    <Footerr/>
    </Fragment>
  )
}

export default MyOrderClient
import React, { Fragment } from 'react'
import { Sidebar } from '../../components'
import Footerr from '../../components/Footerr'
import BlogScreen from '../../screens/BlogScreen'
import HistoryPage from '../HistoryPage'
import MyOrderPage from '../MyOrderPage'
import Navbar1 from './../../components/Navbar/Navbar'


const BlogClient = () => {
    return (
        <Fragment>
            <Navbar1 />
            <Sidebar />
            <BlogScreen />
            <Footerr />
        </Fragment>
    )
}

export default BlogClient
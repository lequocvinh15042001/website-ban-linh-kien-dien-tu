import React, { Fragment } from 'react'
import { Sidebar } from '../../components'
import Footerr from '../../components/Footerr'
import ContactScreen from '../../screens/ContactScreen'
import Navbar1 from './../../components/Navbar/Navbar'


const ContactClient = () => {
    return (
        <Fragment>
            <Navbar1 />
            <Sidebar />
            <ContactScreen />
            <Footerr />
        </Fragment>
    )
}

export default ContactClient
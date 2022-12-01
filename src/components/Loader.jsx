import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner animation='border'
            role='status'
            style={{
                width: '50px',
                height: '50px',
                margin: '100px auto',
                display: 'block'
            }}>
                <span className='sr-only'>Loading...</span>
        </Spinner>
    )
}

export default Loader
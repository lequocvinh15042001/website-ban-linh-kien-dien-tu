import { React, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Button, Form, Popover, OverlayTrigger } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { verifyRegisterShipper } from '../../actions/userActions'

const VerifyShipperScreen = () => {
    const [code, setCode] = useState('')
    const [message, setMessage] = useState('')

    const email = useParams().email

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const verifyShipperRegister = useSelector(state => state.verifyShipperRegister)
    const { error, success, verify } = verifyShipperRegister
    console.log('====', success, verify, error);

    useEffect(() => {
        if (success) {
            navigate('/shipper/login')
        } 
    }, [success])

    const submitHandler = (e) => {  
        e.preventDefault()
        const user = { otp: code, email: email, type: 'register' }
        dispatch(verifyRegisterShipper(user))
        if (code.trim().length === 0) {
            setMessage('Vui lòng điền đủ thông tin')
        } else {
            setMessage('Kiểm tra lại mã xác nhận')
        }
    }

    return (
        <Row className='px-3 mx-0 d-flex justify-content-center align-items-center' style={{ position: 'relative', height: '100vh', background: '#ffffe0' }}>
            <Col xl={4} md={5} sm={7} style={{ background: '#f5f5f5', margin: '20px', padding: '0 40px', borderRadius: '20px' }} className='shadow rounded'>
                <h3 className='d-flex justify-content-center py-3'>Xác thực tài khoản</h3>
                <p className='text-center' style={{ color: 'red' }}>{message}</p>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='username'>
                        <Form.Label>Nhập mã xác nhận</Form.Label>
                        <Form.Control autoComplete="off" type='name' placeholder='Nhập mã xác nhận' value={code} onChange={(e) => setCode(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-center py-3'>
                        <Button style={{ background: '#eeb808', border: 'none' }} type='submit'>Xác thực</Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    )
}

export default VerifyShipperScreen
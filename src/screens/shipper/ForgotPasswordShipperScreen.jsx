import { React, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { getOTP } from '../../actions/userActions'

const ForgotPasswordShipper = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const userForgotPassword = useSelector(state => state.userForgotPassword)
    const { loading, error, userForgotPass } = userForgotPassword

    let location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userForgotPass) {
            navigate(`/shipper/forgotpassword/verify/${email}`)
        }
    }, [navigate, userForgotPass, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (email.trim().length === 0) {
            setMessage('Vui lòng nhập Email')
        } else {
            dispatch(getOTP(email))
        }
    }

    return (
        <Row className='px-3 mx-0 d-flex justify-content-center align-items-center' style={{ position: 'relative', height: '100vh', background: '#ffffe0' }}>
            <Col xl={4} md={5} sm={7} style={{ background: '#f5f5f5', margin: '20px', padding: '0 40px', borderRadius: '20px' }} className='shadow rounded'>
                <h3 className='d-flex justify-content-center py-3'>Quên mật khẩu</h3>
                <p className='text-center' style={{ color: 'red' }}>{message}</p>
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email' className='py-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Nhập email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-center py-3'>
                        <Button style={{ background: '#eeb808', border: 'none', width: 'auto' }} type='submit'>Gửi email xác nhận</Button>
                    </Form.Group>
                </Form>

                <Row>
                    <Col className='d-flex justify-content-center py-3'>
                        <Link style={{ color: '#eeb808' }} className='px-1' to={redirect ? `/shipper/login?redirect=${redirect}` : '/shipper/login'}>Quay lại</Link>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default ForgotPasswordShipper
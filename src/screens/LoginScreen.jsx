import { React, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin
    console.log("==", userInfo);

    let location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/'

    // Check showpassword
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };


    useEffect(() => {
        if (userInfo && userInfo.role === 'role_user') {
            navigate('/')
            window.location.reload()
        }
    }, [navigate, userInfo])

    const user = { email, password }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(user))
        if (email.trim().length === 0 || password.trim().length === 0) {
            setMessage("Vui lòng điền đủ thông tin")
        } else{
            setMessage("Kiểm tra lại thông tin đăng nhập")
        } 
    }

    return (
        <Row className='px-3 mx-0 d-flex justify-content-center align-items-center'>
            <Col xl={4} md={5} sm={7} style={{ background: '#f5f5f5', margin: '20px', padding: '0 40px', borderRadius: '20px' }} className='shadow rounded'>
                <h3 className='d-flex justify-content-center py-3'>Đăng nhập</h3>
                <p className='text-center' style={{color: 'red'}}>{message}</p>
                {loading && <Loader />}
                <Form onSubmit={submitHandler} >
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control autoComplete="off" type='email' placeholder='Nhập email' value={email} onChange={(e) => setEmail(e.target.value)
                        }></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password' className='py-3'>
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control type={passwordShown ? "text" : "password"} placeholder='Nhập mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-between'>
                        <Form>
                            <div key='default-checkbox' className="mb-3">
                                <Form.Check
                                    type='checkbox'
                                    id='default-checkbox'
                                    label='Hiển thị mật khẩu'
                                    onClick={togglePasswordVisiblity}
                                />
                            </div>
                        </Form>
                        <Link style={{ textDecoration: 'none', color: 'blue' }} to='/forgotpassword'>Quên mật khẩu?</Link>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-center py-3'>
                        <Button style={{ background: '#eeb808', border: 'none', width: 'auto' }} type='submit' variant='primary'>Đăng nhập</Button>
                    </Form.Group>
                </Form>
                <Row>
                    <Col className='d-flex justify-content-center py-3'>
                        Bạn chưa có tài khoản?{' '}
                        <Link className='px-1' to={redirect ? `/register?redirect=${redirect}` : '/register'}>Đăng ký</Link>
                        {/* <Link to='/register'>Đăng ký</Link> */}
                    </Col>
                </Row>
            </Col>
        </Row>
    )

}

export default LoginScreen
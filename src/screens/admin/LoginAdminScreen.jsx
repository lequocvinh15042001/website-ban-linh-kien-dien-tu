import { React, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { login } from '../../actions/userActions'

const LoginAdminScreen = () => {
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
        if (userInfo && userInfo.role === 'role_admin') {
            navigate('/admin/userlist')
            window.location.reload()
        }
    }, [navigate, userInfo])

    const user = { email, password }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(user))
        if (email.trim().length === 0 || password.trim().length === 0) {
            setMessage("Vui lòng điền đủ thông tin")
        } else {
            setMessage("Kiểm tra lại thông tin đăng nhập")
        } 
    }

    return (
        <Row className='px-3 mx-0 d-flex justify-content-center align-items-center' style={{ position: 'relative', height: '100vh', background: '#ccffff' }}>
            {/* <Col style={{position: 'absolute', bottom: '0px', left: '0px'}}>
                <Image src='https://i.ibb.co/1Jm2YM4/pngwing-com.png' style={{width: '30%'}}></Image>
            </Col> */}
            <Col xl={4} md={5} sm={7} style={{ background: '#f5f5f5', margin: '20px', padding: '0 40px', borderRadius: '20px' }} className='shadow rounded'>
                <h5 className='d-flex justify-content-center pt-4 pb-2'>ĐĂNG NHẬP</h5>
                <h5 className='d-flex justify-content-center pb-4' style={{ color: '#03a9f3' }}>ELECTRIC'S STORE ADMIN</h5>
                <p className='text-center' style={{color: 'red'}}>{message}</p>
                {loading && <Loader />}
                <Form onSubmit={submitHandler} >
                    <Form.Group controlId='email' className='pb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control autoComplete="off" type='email' placeholder='Nhập email' value={email} onChange={(e) => setEmail(e.target.value)
                        }></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password' className='py-3'>
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control type={passwordShown ? "text" : "password"} placeholder='Nhập mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-between'>
                        <Form className='d-flex justify-content-between align-items-center'>
                            <div key='default-checkbox' className='d-flex justify-content-between align-items-center'>
                                <Form.Check
                                    className='d-flex justify-content-between align-items-center my-0 py-0'
                                    type='checkbox'
                                    id='default-checkbox'
                                    onClick={togglePasswordVisiblity}
                                />
                                <label className='mx-2'>Hiển thị mật khẩu</label>
                            </div>
                        </Form>
                        {/* <Link className='d-flex justify-content-between align-items-center my-0' style={{ textDecoration: 'none', color: '#03a9f3' }} to='/forgotpassword'>Quên mật khẩu?</Link> */}
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-center py-3'>
                        <Button type='submit' style={{ background: '#03a9f3', border: 'none' }}>Đăng nhập</Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    )

}

export default LoginAdminScreen
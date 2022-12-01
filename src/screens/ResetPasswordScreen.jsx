import { React, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Button, Form, Popover, OverlayTrigger } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { newPassworsAfterForgot, verifyRegisterShipper } from '../actions/userActions'

const ResetPasswordScreen = () => {
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const newPassworsAfterForgotPassword = useSelector(state => state.newPassworsAfterForgotPassword)
    const { error, success } = newPassworsAfterForgotPassword

    useEffect(() => {
        if (success) {
            navigate('/login')
        }
    }, [success, navigate])

    const userForgotPassword = JSON.parse(localStorage.getItem('userForgotPassword'))
    const resetPass = {resetpass: password, id: userForgotPassword?.data?.id, token: userForgotPassword?.data?.token}

    const submitHandler = (e) => {
        e.preventDefault()
        if (password.trim().length === 0) {
            setMessage('Vui lòng nhập email')
        } else {
            dispatch(newPassworsAfterForgot(resetPass))
        }
    }

    // Check showpassword
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    // Check level password
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Mức độ mật khẩu</Popover.Header>
            <Popover.Body>
                <p><i style={{ color: (password.length < 8 || password.length > 20 ? 'red' : 'green'), fontSize: "20px" }} class="fa fa-check-circle" aria-hidden="true"></i> Lớn hơn 8 và nhỏ hơn 20 ký tự</p>
                <p><i style={{ color: (!password.match(/[A-Z]/) ? 'red' : 'green'), fontSize: "20px" }} class="fa fa-check-circle" aria-hidden="true"></i> Ít nhất 1 ký tự viết HOA</p>
                <p><i style={{ color: (!password.match(/[a-z]/) ? 'red' : 'green'), fontSize: "20px" }} class="fa fa-check-circle" aria-hidden="true"></i> Ít nhất 1 ký tự viết THƯỜNG</p>
                <p><i style={{ color: (!password.match(/[\`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/) ? 'red' : 'green'), fontSize: "20px" }} class="fa fa-check-circle" aria-hidden="true"></i> Ít nhất 1 ký tự đặc biệt</p>
                <p><i style={{ color: (!password.match(/[\d]/) ? 'red' : 'green'), fontSize: "20px" }} class="fa fa-check-circle" aria-hidden="true"></i> Ít nhất 1 ký tự số</p>
            </Popover.Body>
        </Popover >
    );

    return (
        <Row className='px-3 mx-0 d-flex justify-content-center align-items-center' style={{ position: 'relative', height: '100vh', background: '#ffffe0' }}>
            <Col xl={4} md={5} sm={7} style={{ background: '#f5f5f5', margin: '20px', padding: '0 40px', borderRadius: '20px' }} className='shadow rounded'>
                <h3 className='d-flex justify-content-center py-3'>Quên mật khẩu</h3>
                <p className='text-center' style={{ color: 'red' }}>{message}</p>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='password'>
                        <Form.Label>Mật khẩu mới</Form.Label>
                        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                            <Form.Control type={passwordShown ? "text" : "password"} placeholder='Nhập mật khẩu mới' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </OverlayTrigger>
                        <p className='pt-3 pb-0 my-0' style={{ fontSize: '13px', color: 'red' }} hidden={((password.length < 8 || password.length > 20) || !password.match(/[A-Z]/) || !password.match(/[a-z]/) || !password.match(/[\`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/) || !password.match(/[\d]/)) ? false : true}>* Vui lòng kiểm tra lại mật khẩu</p>
                    </Form.Group>
                    <Form.Group>
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
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-center py-3'>
                        <Button disabled={((password.length < 8 || password.length > 20) || !password.match(/[A-Z]/) || !password.match(/[a-z]/) || !password.match(/[\`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/) || !password.match(/[\d]/)) ? 'true' : ''} style={{ background: '#eeb808', border: 'none' }} type='submit'>Lưu</Button>
                    </Form.Group>
                </Form>
                <Row>
                    <Col className='d-flex justify-content-center py-3'>
                        <Link style={{ color: '#eeb808' }} className='px-1' to={'login'}>Về lại trang đăng nhập</Link>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default ResetPasswordScreen
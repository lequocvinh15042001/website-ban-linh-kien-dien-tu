import { React, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form, Popover, OverlayTrigger } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { registerShipper } from '../../actions/userActions'

const RegisterShipperScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const shipperRegister = useSelector(state => state.shipperRegister)
    const { loading, error, userInfo } = shipperRegister
    // console.log('====', userInfo);

    let location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/shipper/home'

    // Check showpassword
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    useEffect(() => {
        if (userInfo) {
            navigate(`/shipper/verify/${email}`)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(registerShipper(name, email, password, phone, address))
        if (password.trim().length === 0 || name.trim().length === 0 || email.trim().length === 0 || phone.trim().length === 0 || address.trim().length === 0) {
            setMessage('Vui lòng điền đủ thông tin')
        } else if (error) {
            setMessage('Email đã tồn tại')
        }
    }

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
                <h5 className='d-flex justify-content-center pt-4 pb-2'>ĐĂNG KÝ</h5>
                <h5 className='d-flex justify-content-center pb-4' style={{ color: '#eeb808' }}>ELECTRIC'S STORE SHIPPER</h5>
                <p className='text-center' style={{ color: 'red' }}>{message}</p>
                {/* {error && <p className='text-center' style={{color: 'red'}}>{error}</p>} */}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='username'>
                        <Form.Label>Tên người dùng</Form.Label>
                        <Form.Control autoComplete="off" type='name' placeholder='Nhập tên người dùng' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email' className='py-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Nhập email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Mật khẩu</Form.Label>
                        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                            <Form.Control type={passwordShown ? "text" : "password"} placeholder='Nhập mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </OverlayTrigger>
                        <p className='pt-3 pb-0 my-0' style={{ fontSize: '13px', color: 'red' }} hidden={((password.length < 8 || password.length > 20) || !password.match(/[A-Z]/) || !password.match(/[a-z]/) || !password.match(/[\`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/) || !password.match(/[\d]/)) ? false : true}>* Vui lòng kiểm tra lại mật khẩu</p>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword' className='py-3'>
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control type='number' placeholder='Nhập số điện thoại' value={phone} onChange={(e) => setPhone(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword' className='pb-3'>
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control type='text' placeholder='Nhập địa chỉ' value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
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
                        <Button type='submit' disabled={((password.trim().length === 0 || name.trim().length === 0 || email.trim().length === 0 || phone.trim().length === 0 || address.trim().length === 0) || (password.length < 8 || password.length > 20) || !password.match(/[A-Z]/) || !password.match(/[a-z]/) || !password.match(/[\`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/) || !password.match(/[\d]/)) ? 'true' : ''} style={{ background: '#eeb808', border: 'none' }}>Đăng ký</Button>
                    </Form.Group>
                </Form>

                <Row>
                    <Col className='d-flex justify-content-center py-3'>
                        Bạn đã có tài khoản?{' '}
                        <Link style={{ color: '#eeb808' }} className='px-1' to={redirect ? `/shipper/login?redirect=${redirect}` : '/shipper/login'}>Đăng nhập</Link>
                    </Col>
                </Row>
            </Col>
        </Row >
    )
}

export default RegisterShipperScreen
import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import ReactTooltip from 'react-tooltip'
import { Container, Navbar, Nav, NavDropdown, Row, Modal, Button, Form } from 'react-bootstrap'
// import { getOrder, updateOrder } from '../actions/orderActions'
import { getUserDetails, logout, updateUserProfile } from '../../actions/userActions'
import { getAllOrders } from '../../actions/orderActions'

const HeaderShipper = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { orderAll } = useSelector(state => state.orderAll)
    console.log('==', orderAll)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success: successUpdate } = userUpdateProfile

    const logoutHandler = () => {
        dispatch(logout())
        window.location.href = '/shipper/login'
    }

    // load page
    const loadpage = () => {
        window.location.reload(false)
    }

    useEffect(() => {
        if (successUpdate) {
            window.location.reload()
        } else {
            if (!userInfo?.name) {
                dispatch(getUserDetails(userInfo.id))
            } else {
                setName(userInfo?.name)
                setPhone(userInfo?.phone)
                setAddress(userInfo?.address)
            }
        }
        //eslint-disable-next-line 
    }, [dispatch, navigate, successUpdate])


    // Update Profile Shipper
    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = () => {
        setShowInfo(true);
    }

    // console.log('====', images.name);
    const updateHandler = () => {
        if (name.trim().length === 0 || phone.trim().length === 0 || address.trim().length === 0) {
            setMessage("Vui lòng điền đủ thông tin")
        } else {
            setShowInfo(false);
            dispatch(updateUserProfile(userInfo.id, { name: name, phone: phone, address: address }))
            const user = JSON.parse(localStorage.getItem('userInfo'))
            localStorage.setItem('userInfo', JSON.stringify({ ...user, name: name, phone: phone, address: address }))
        }
    }

    return (
        <Navbar style={{ height: '100%', width: '100%', background: '#eeb808' }} collapseOnSelect>
            <Row className='py-0 px-4 d-flex' style={{ width: 'auto' }}>
                <p className='my-0' onClick={loadpage} style={{ cursor: 'pointer', fontSize: '18px', color: '#f5f5f5' }}>ELECTRIC SHIPPER</p>
            </Row>
            <Container className="justify-content-end">
                <Row className='d-flex justify-content-center align-items-center'>
                    <Navbar.Collapse>
                        <Nav className='d-flex justify-content-end pe-3' style={{ color: 'white' }}>
                            {userInfo ? (
                                <NavDropdown title={`${userInfo.name}`} id='nav-dropdown-admin' style={{ color: 'white' }}>
                                    <NavDropdown.Item onClick={handleShowInfo} style={{ color: '#eeb808' }}>Thông tin</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>Đăng xuất</NavDropdown.Item>
                                </NavDropdown>
                            ) : <LinkContainer to='/shipper/login' style={{ color: 'white' }}>
                                <Nav.Link style={{ color: 'white' }}>
                                    <i style={{ color: 'white' }} className='fas fa-user'></i> Đăng nhập
                                </Nav.Link>
                            </LinkContainer>}
                        </Nav>
                    </Navbar.Collapse>
                </Row>
            </Container>

            {/* Update Profile Shipper */}
            <Modal show={showInfo} onHide={handleCloseInfo}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='text-center' style={{ color: 'red' }}>{message}</p>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{ fontSize: '14px' }}>Tên người dùng</Form.Label>
                            <Form.Control
                                style={{ fontSize: '14px' }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Nhập tên người dùng"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{ fontSize: '14px' }}>Số điện thoại</Form.Label>
                            <Form.Control
                                style={{ fontSize: '14px' }}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="text"
                                placeholder="Nhập số điện thoại"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{ fontSize: '14px' }}>Địa chỉ</Form.Label>
                            <Form.Control
                                style={{ fontSize: '14px' }}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                type="text"
                                placeholder="Nhập địa chỉ"
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }} variant="primary" onClick={updateHandler}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
        </Navbar>
    )
}

export default HeaderShipper
import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import ReactTooltip from 'react-tooltip'
import { Container, Navbar, Nav, NavDropdown, Row, Modal, Button, Form, Col, Accordion } from 'react-bootstrap'
// import { getOrder, updateOrder } from '../actions/orderActions'
import { getUserDetails, logout, updateUserProfile } from '../../actions/userActions'
import { getAllOrders, setDeliveryOrder } from '../../actions/orderActions'

const HeaderAdmin = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [lgShow, setLgShow] = useState(false);
    const [message, setMessage] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { orderAll } = useSelector(state => state.orderAll)
    // console.log('==', orderAll)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderSetDelivery = useSelector(state => state.orderSetDelivery)
    const { success: deliverySuccess } = orderSetDelivery
    // console.log('==', userInfo)

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success: successUpdate } = userUpdateProfile

    const logoutHandler = () => {
        dispatch(logout())
        window.location.href = '/admin/login'
    }

    // load page
    const loadpage = () => {
        window.location.reload(false)
    }

    // Get new notification
    const arrNotification = []
    const getNotification = () => {
        orderAll?.data?.list?.forEach(order => {
            if (order.state === 'process') {
                arrNotification.push(order)
            }
        })
    }
    getNotification()

    useEffect(() => {
        dispatch(getAllOrders())
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
    }, [dispatch, navigate, successUpdate, deliverySuccess])

    // confirm All Order
    const confirmAllOrder = () => {
        orderAll?.data?.forEach(order => {
            if (order.state === 'process') {
                dispatch(setDeliveryOrder(order.id))
            }
        })
    }

    // Confirm Order
    const confirmOrder = (idOrder) => {
        dispatch(setDeliveryOrder(idOrder))
    }

    // Update Profile Shipper
    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = () => {
        setShowInfo(true);
    }

    // Update profile Admin
    const updateHandler = () => {
        if (name.trim().length === 0 || phone.trim().length === 0 || address.trim().length === 0) {
            setMessage("Vui l??ng ??i???n ????? th??ng tin")
        } else {
            setShowInfo(false);
            dispatch(updateUserProfile(userInfo.id, { name: name, phone: phone, address: address }))
            const user = JSON.parse(localStorage.getItem('userInfo'))
            localStorage.setItem('userInfo', JSON.stringify({ ...user, name: name, phone: phone, address: address }))
        }
    }

    return (
        <Navbar style={{ height: '100%', width: '100%' }} variant='dark' collapseOnSelect>
            <Row className='py-0 px-4 d-flex' style={{ width: 'auto', }}>
                <i data-tip data-for="tip5" onClick={loadpage} style={{ cursor: 'pointer', fontSize: '18px', color: '#f5f5f5' }} className="fas fa-redo-alt"></i>
            </Row>
            <ReactTooltip id="tip5" place="top" effect="solid">
                T???i l???i trang
            </ReactTooltip>
            <ReactTooltip id="tip6" place="top" effect="solid">
                C?? {arrNotification.length} th??ng b??o m???i
            </ReactTooltip>
            <Container className="justify-content-end">
                <Row className='d-flex justify-content-center align-items-center'>
                    <Navbar.Collapse>
                        <Row onClick={() => setLgShow(true)} className='py-0 d-flex justify-content-center align-items-center' style={{ width: 'auto', marginRight: '20px', position: 'relative' }}>
                            <i data-tip data-for="tip6" style={{ cursor: 'pointer', fontSize: '20px', color: '#f2f2f2' }} className="far fa-bell"></i>
                            {
                                arrNotification.length !== 0 ?
                                    <i style={{ position: 'absolute', top: '-5px', right: '-15px', color: 'red', fontSize: '8px' }} className="fas fa-circle"></i> :
                                    <i style={{ position: 'absolute', top: '-5px', right: '-15px', color: 'white', fontSize: '8px' }} className="fas fa-circle"></i>
                            }
                        </Row>
                        <Modal
                            size="xl"
                            show={lgShow}
                            onHide={() => setLgShow(false)}
                            aria-labelledby="example-modal-sizes-title-lg"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">
                                    <h5>Th??ng b??o</h5>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row className='d-flex justify-content-end align-items-center px-2 mb-3'>
                                    {
                                        arrNotification.length !== 0 ?
                                            <Button variant="outline-primary" onClick={() => confirmAllOrder()} style={{ width: 'auto' }}>X??c nh???n t???t c???</Button> :
                                            <p></p>
                                    }
                                </Row>
                                {
                                    arrNotification.length !== 0 ?
                                        arrNotification.map((order, index) => (
                                            <Row className='d-flex justify-content-between align-items-center px-2 mb-3'>
                                                <Col xl={3}>
                                                    {index + 1}. ????n h??ng c???a {order.userName}
                                                </Col>
                                                <Col xl={7}>
                                                    <Accordion>
                                                        <Accordion.Item eventKey="0">
                                                            <Accordion.Header style={{ fontSize: '13px' }}>ID: {order.id}</Accordion.Header>
                                                            <Accordion.Body>
                                                                <strong>Th??ng tin ????n h??ng</strong>
                                                                <p className='mt-3'>- Ng??y ?????t h??ng: {order.createdDate}</p>
                                                                <p>- S??? l?????ng s???n ph???m: {order.totalProduct}</p>
                                                                <p>- Ph????ng th???c thanh to??n: {order?.receiveOrder?.paymentType}</p>
                                                                <p>- T???ng thanh to??n: <span style={{ fontWeight: 'bold', color: 'red' }}>{order.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></p>
                                                                <strong>Th??ng tin ng?????i nh???n</strong>
                                                                <p className='mt-3'>- T??n ng?????i nh???n: {order?.receiveOrder?.receiveName}</p>
                                                                <p className='mt-3'>- S??? ??i???n tho???i: {order?.receiveOrder?.receivePhone}</p>
                                                                <p className='mt-3'>- ?????a ch??? giao h??ng: {order?.receiveOrder?.receiveAddress + ', ' + order?.receiveOrder?.receiveDistrict + ', ' + order?.receiveOrder?.receiveProvince + ', ' + order?.receiveOrder?.receiveVillage}</p>
                                                                <strong>Chi ti???t ????n h??ng</strong>
                                                                {
                                                                    order?.items?.map(item => (
                                                                        <Row>
                                                                            <Col className='mt-3'>{item.name}</Col>
                                                                            <Col className='mt-3'>{(item.price / item.quantity)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })} x {item.quantity}</Col>
                                                                        </Row>
                                                                    ))
                                                                }
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Col>
                                                <Col xl={2}>
                                                    <Button variant="outline-primary" onClick={() => confirmOrder(order?.id)} style={{ width: 'auto' }}>X??c nh???n</Button>
                                                </Col>
                                            </Row>
                                        )) :
                                        <p style={{ textAlign: 'center' }}>Kh??ng c?? th??ng b??o</p>
                                }
                            </Modal.Body>
                        </Modal>

                        {/* Update Profile Admin */}
                        <Modal show={showInfo} onHide={handleCloseInfo}>
                            <Modal.Header closeButton>
                                <Modal.Title>Th??ng tin ng?????i d??ng</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p className='text-center' style={{ color: 'red' }}>{message}</p>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label style={{ fontSize: '14px' }}>T??n ng?????i d??ng</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '14px' }}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            type="text"
                                            placeholder="Nh???p t??n ngu???i d??ng"
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label style={{ fontSize: '14px' }}>S??? ??i???n tho???i</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '14px' }}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            type="text"
                                            placeholder="Nh???p s??? ??i???n tho???i"
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label style={{ fontSize: '14px' }}>?????a ch???</Form.Label>
                                        <Form.Control
                                            style={{ fontSize: '14px' }}
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            type="text"
                                            placeholder="Nh???p ?????a ch???"
                                            autoFocus
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }} variant="primary" onClick={updateHandler}>
                                    C???p nh???t
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Nav className='d-flex justify-content-end pe-3'>
                            {userInfo ? (
                                <NavDropdown title={`${userInfo.name}`} id='nav-dropdown-admin'>
                                    <NavDropdown.Item onClick={handleShowInfo} style={{ color: '#03a9f3' }}>Th??ng tin</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>????ng xu???t</NavDropdown.Item>
                                </NavDropdown>
                            ) : <LinkContainer to='/login'>
                                <Nav.Link className='text-success'>
                                    <i className='fas fa-user'></i> ????ng nh???p
                                </Nav.Link>
                            </LinkContainer>}
                        </Nav>
                    </Navbar.Collapse>
                </Row>
            </Container>
        </Navbar>
    )
}

export default HeaderAdmin
import { React, useEffect, useState } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { addShippingToCart, getCart, saveShippingAddress } from '../actions/cartActions'
import ModalComfirm from '../components/ModalConfirm';
import { useRef } from 'react'

const ShippingScreen = () => {
    const [message, setMessage] = useState('')
    const { carts } = useSelector(state => state.cartList)
    // const { cartItems } = cart
    console.log('shipping', carts)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        setId(carts.data?.id)
        dispatch(getCart())
    }, [])

    const [id, setId] = useState()
    const [receiveName, setReceiveName] = useState('')
    const [receiveAddress, setReceiveAddress] = useState('')
    const [receiveProvince, setReceiveProvince] = useState('')
    const [receiveDistrict, setReceiveDistrict] = useState('')
    const [receiveVillage, setReceiveVillage] = useState('')
    const [receivePhone, setReceivePhone] = useState('')
    const [paymentType, setPaymentType] = useState('Tiền mặt')


    const shipping = {
        receiveName, receivePhone, receiveAddress, receiveProvince, receiveDistrict, receiveVillage, paymentType
    }

    const submitHandler = () => {
        // e.preventDefault()
        dispatch(addShippingToCart(id, { shipping }))
        navigate('/success')
    }

    //XÁC NHẬN
    const [dialog, setDialog] = useState({
        message: "",
        isLoading: false,
        //Update
        nameProduct: ""
    });
    const idProductRef = useRef();
    const handleDialog = (message, isLoading, nameProduct) => {
        setDialog({
            message,
            isLoading,
            //Update
            nameProduct
        });
    };

    const handleDelete = () => {
        //Update
        if (receiveName.trim().length === 0 || receiveAddress.trim().length === 0 || receiveProvince.trim().length === 0
            || receiveDistrict.trim().length === 0 || receiveVillage.trim().length === 0 || receivePhone.trim().length === 0) {
            setMessage("Vui lòng điền đủ thông tin")
        } else {
            handleDialog("Bạn có muốn xác nhận đơn hàng?", true);
        }
    };

    const areUSureDelete = (choose) => {
        if (choose) {
            handleDialog("", false);
            submitHandler();
        } else {
            handleDialog("", false);
        }
    };

    return (
        <Container style={{ marginTop: "7rem" }}>
            <CheckoutSteps step1 step2 />
            <Row className='pb-5'>
                <h3 className='pb-4 d-flex justify-content-center'>Điền thông tin giao hàng</h3>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col xl={5}>
                    <Form>
                        <p className='text-center' style={{ color: 'red' }}>{message}</p>
                        <Form.Group className='mb-3'>
                            <Form.Label>Tên người nhận</Form.Label>
                            <Form.Control type='text' placeholder='Nhập tên người nhận' value={receiveName} onChange={(e) => setReceiveName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Nhập địa chỉ</Form.Label>
                            <Form.Control type='text' placeholder='Nhập địa chỉ' value={receiveAddress} onChange={(e) => setReceiveAddress(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Nhập Phường/Xã</Form.Label>
                            <Form.Control type='text' placeholder='Nhập Phường/Xã' value={receiveVillage} onChange={(e) => setReceiveVillage(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Nhập Quận/Huyện</Form.Label>
                            <Form.Control type='text' placeholder='Nhập Quận/Huyện' value={receiveDistrict} onChange={(e) => setReceiveDistrict(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Nhập Tỉnh/Thành phố</Form.Label>
                            <Form.Control type='text' placeholder='Nhập Tỉnh/Thành phố' value={receiveProvince} onChange={(e) => setReceiveProvince(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Nhập Số điện thoại</Form.Label>
                            <Form.Control type='text' placeholder='Nhập Số điện thoại' value={receivePhone} onChange={(e) => setReceivePhone(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Phương thức thanh toán</Form.Label>
                            <Form.Select type='text' value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                                <option value="Tiền mặt">
                                    Tiền mặt
                                </option>
                                {/* <option>
                                    Payl pal
                                </option> */}
                            </Form.Select>
                        </Form.Group>

                        <Row className='py-3 d-flex justify-content-center align-items-center'>
                            <Button style={{ width: '200px' }}
                                onClick={() => handleDelete()}
                                variant='success'>Xác nhận</Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
            {dialog.isLoading && (
                <ModalComfirm
                    //Update
                    nameProduct={dialog.nameProduct}
                    onDialog={areUSureDelete}
                    message={dialog.message}
                />
            )}
        </Container>
    )
}

export default ShippingScreen
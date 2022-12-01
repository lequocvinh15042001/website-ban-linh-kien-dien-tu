import { React, useState } from 'react'
import { Button, Form, Col, Image, Row, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import PaymentSuccess from "../pages/PaymentSuccess"

const PaymentScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const navigate = useNavigate();

    if (!shippingAddress) {
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Tiền mặt')
    const [cash, setCash] = useState(true)
    const [payPal, setPayPal] = useState()

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    // Chọn phương thức
    const payWithCash = () => {
        setPaymentMethod('Tiền mặt')
        setPayPal(false)
        setCash(true)
    }

    const payWithPayPal = () => {
        setPaymentMethod('PayPal')
        setCash(false)
        setPayPal(true)
    }

    // console.log('==', paymentMethod);

    return (
        // <Container>
        //     <CheckoutSteps step1 step2 step3 />
        //     <h3 className='py-3 d-flex justify-content-center align-items-center'>Phương thức thanh toán</h3>
        //     <p className='pt-3 d-flex justify-content-center align-items-center'>Vui lòng chọn phương thức thanh toán</p>
        //     <Form onSubmit={submitHandler}>
        //         <Form.Group>
        //             {/* <Form.Label as='h6'>Chọn phương thức thanh toán</Form.Label> */}
        //             <Row className='py-5 mx-3 d-flex justify-content-center align-items-center'>
        //                 <Col xl={3} onClick={payWithCash} className='shadow-sm py-3 mx-3 my-1 d-flex justify-content-center align-items-center' style={cash === true ? { border: '1px solid gray', cursor: 'pointer', borderRadius: '5px', position: 'relative' } : {}}>
        //                     <Image style={{ height: '40px' }} src='https://cdn.pixabay.com/photo/2016/03/31/21/41/cash-1296585_960_720.png' alt='paypal'></Image>
        //                     <h5 className='my-0 mx-3'>Tiền mặt</h5>
        //                     {cash === true ? <i style={{ fontSize: '15px', position: 'absolute', top: '0', right: '0', background: 'green', padding: '8px', color: 'white', borderRadius: '50px', translate: '25% -25%' }} className="fas fa-check"></i> : <></>}
        //                 </Col>
        //                 <Col xl={3} onClick={payWithPayPal} className='shadow-sm py-3 mx-3 my-1 d-flex justify-content-center align-items-center' style={payPal === true ? { border: '1px solid gray', cursor: 'pointer', borderRadius: '5px', position: 'relative' } : {}}>
        //                     <Image style={{ height: '40px' }} src='https://quyetdao.com/wp-content/uploads/2019/04/paypal-logo.png' alt='paypal'></Image>
        //                     {payPal === true ? <i style={{ fontSize: '15px', position: 'absolute', top: '0', right: '0', background: 'green', padding: '8px', color: 'white', borderRadius: '50px', translate: '25% -25%' }} className="fas fa-check"></i> : <></>}
        //                 </Col>
        //             </Row>
        //             <Row className='py-3 d-flex justify-content-center align-items-center'>
        //                 <Button style={{ width: '200px' }} type='submit' variant='success'>Tiếp tục</Button>
        //             </Row>
        //         </Form.Group>
        //     </Form>
        // </Container>
        <PaymentSuccess/>
    )
}

export default PaymentScreen
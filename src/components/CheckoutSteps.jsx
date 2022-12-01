import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='justify-content-between mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login' className='mx-3'>
                        <Nav.Link className='d-flex flex-column align-items-center justify-content-between text-success'>
                            <i class="fas fa-sign-in-alt fa-2x"></i>
                            <p className='mb-0 mt-2'>Đăng nhập</p>
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className='d-flex flex-column align-items-center justify-content-between'>
                        <i class="fas fa-sign-in-alt fa-2x"></i>
                        <p className='mb-0 mt-2'>Đăng nhập</p>
                    </Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping' className='mx-3'>
                        <Nav.Link className='d-flex flex-column align-items-center justify-content-between text-success'>
                            <i class="fas fa-edit fa-2x"></i>
                            <p className='mb-0 mt-2'>Điền thông tin</p>
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className='d-flex flex-column align-items-center justify-content-between'>
                        <i class="fas fa-edit fa-2x"></i>
                        <p className='mb-0 mt-2'>Điền thông tin</p>
                    </Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment' className='mx-3'>
                        <Nav.Link className='d-flex flex-column align-items-center justify-content-between text-success'>
                            <i class="fas fa-money-check-alt fa-2x"></i>
                            <p className='mb-0 mt-2'>Phương thức thanh toán</p>
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className='d-flex flex-column align-items-center justify-content-between'>
                        <i class="fas fa-money-check-alt fa-2x"></i>
                        <p className='mb-0 mt-2'>Phương thức thanh toán</p>
                    </Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder' className='mx-3'>
                        <Nav.Link className='d-flex flex-column align-items-center justify-content-between text-success'>
                            <i class="fas fa-check-circle fa-2x"></i>
                            <p className='mb-0 mt-2'>Đặt hàng</p>
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className='d-flex flex-column align-items-center justify-content-between'>
                        <i class="fas fa-check-circle fa-2x"></i>
                        <p className='mb-0 mt-2'>Đặt hàng</p>
                    </Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
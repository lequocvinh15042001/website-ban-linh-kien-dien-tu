import { Rating } from '@material-ui/lab'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Form, Row, Col, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getOrder } from '../actions/orderActions'
import { createProductReview, listProductDetails, listReviews } from '../actions/productActions'

const Comment = () => {

    const [rate, setRate] = useState(5)
    const [content, setContent] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    // console.log('==', userInfo);
    const navigate = useNavigate();

    const productId = useParams().id

    const dispatch = useDispatch()

    console.log("ID p bình luận", productId);

    const { reviews, error: errorGetComment } = useSelector(state => state.getReview)

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    // console.log('==', product);

    const order = useSelector(state => state.orderList)

    useEffect(() => {
        dispatch(listProductDetails(productId))
        dispatch(listReviews(productId))
        dispatch(getOrder());
    }, [productId])


    // submit Comment   
    const submitComment = () => {
        // console.log('==', commentProduct)
        if (userInfo) {
            dispatch(createProductReview(content, productId, rate))
            window.location.reload()
            setShow(true)
        }
    }

    // Alert Commetn
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    // view Comment
    const viewComment = () => {
        window.location.href = '#comment'
    }

    // Check comment with paid
    let arrOrder = []
    const getOrderById = () => {
        order?.orders?.data?.list?.forEach(item => {
            if (item.state === 'paid') {
                item?.items?.forEach(product => {
                    if (product?.productid === productId) {
                        arrOrder.push(item)
                    }
                })
            }
        });
    }
    getOrderById()
    // console.log('===', arrOrder)

    return (
        <div className='container'>
            {/* <div className='d-flex justify-content-between align-items-center'>
        <i className="fas fa-pen mx-2"></i>
        <p className='my-0' style={{ cursor: 'pointer' }} onClick={viewComment}>viết đánh giá</p>
    </div> */}
            <Row className='pt-3 d-flex align-items-center justify-content-end'>
                <h4 className='pb-4'>Các bình luận</h4>
                {errorGetComment ?
                    <p>Chưa có bình luận nào</p>
                    :
                    reviews.data?.list.reverse().map((review) => (
                        <Row>

                            <Row className='px-0'>
                                <Col>
                                    <h6>{review.reviewedBy}</h6>
                                </Col>
                                <Col className='d-flex align-items-center justify-content-end'>
                                    <h6 className='my-0 mx-3'>Đã đánh giá: </h6>
                                    <Rating value={review.rate} />
                                </Col>
                            </Row>
                            <Row className='px-0'>
                                <Col>
                                    <p className='pb-4'>{review.content}</p>
                                </Col>
                                <Col className='d-flex align-items-center justify-content-end'>
                                    <p style={{ color: 'gray' }} className='pb-4'>Ngày đăng: {review.createdDate}</p>
                                </Col>
                            </Row>
                        </Row>
                    ))
                }
            </Row>

            <Row id="comment">
                <h4 className='pt-5 pb-3'>Đánh giá sản phẩm</h4>
                {(userInfo && arrOrder.length > 0) ?
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Đánh giá</Form.Label>
                            <Form.Select value={rate} onChange={(e) => setRate(e.target.value)} aria-label="Default select example">
                                <option value={5}>5 Sao</option>
                                <option value={4}>4 Sao</option>
                                <option value={3}>3 Sao</option>
                                <option value={2}>2 Sao</option>
                                <option value={1}>1 Sao</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Bình luận của bạn về sản phẩm</Form.Label>
                            <Form.Control placeholder='Viết bình luận của bạn' value={content} onChange={(e) => setContent(e.target.value)} as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Button style={{ width: 'auto' }} onClick={() => submitComment()}>Đăng bình luận</Button>
                        </Form.Group>
                    </Form> :
                    <p>Vui lòng mua hàng và thanh toán để được mở khóa đánh giá</p>
                }
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Đánh giá thành công</Modal.Title>
                </Modal.Header>
                <Modal.Body>Đánh giá của bạn đã được chuyển đến quản trị viên và chờ duyệt</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Xong
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Comment
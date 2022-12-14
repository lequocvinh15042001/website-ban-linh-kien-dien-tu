import React, { useEffect } from 'react'
import { Table, Button, Col, Row, Modal, Pagination, Form, Accordion } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getAllCommentsAdmin, unlockReviewAdmin, blockReviewAdmin } from '../../actions/productActions'
import { useState } from 'react'

const CommentListScreen = () => {
    const dispatch = useDispatch()

    const { loading, error, reviews } = useSelector((state) => state.reviewAllAdmin)
    // console.log("===", reviews);

    const reviewLock = useSelector((state) => state.reviewLock)
    const { success: reviewLockSuccess } = reviewLock

    const reviewUnlock = useSelector((state) => state.reviewUnlock)
    const { success: successUnlockSuccess } = reviewUnlock

    useEffect(() => {
        dispatch(getAllCommentsAdmin())
    }, [dispatch, successUnlockSuccess, reviewLockSuccess])

    // Block comment
    const [show, setShow] = useState(false);
    const handleCloseBlock = () => setShow(false);
    const [idDelete, setIdDelete] = useState('')
    const handleShowBlock = (id) => {
        setShow(true);
        setIdDelete(id)
    }

    const blockHandler = (id) => {
        setShow(false);
        dispatch(blockReviewAdmin(id))
    }

    // Unlock comment
    const [showUnlock, setShowUnlock] = useState(false);
    const handleCloseUnlock = () => setShowUnlock(false);
    const [idUnlock, setIdUnlock] = useState('')
    const handleShowUnlock = (id) => {
        setShowUnlock(true);
        setIdUnlock(id)
    }

    const unlockHandler = (id) => {
        setShowUnlock(false);
        dispatch(unlockReviewAdmin(id))
    }

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px', background: '#edf1f5' }}>
            <div className='d-flex align-items-center justify-content-between flex-wrap px-4' style={{ background: 'white', width: '100%' }}>
                <div className='d-flex align-items-center justify-content-between py-4'>
                    <div className='d-flex align-items-center'>
                        <i className='fas fa-home'></i>
                        <a href='/admin/dashboard' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Trang ??i???u khi???n</a>
                    </div>
                    <div className='d-flex align-items-center'>
                        <i className="fas fa-chevron-right mx-2"></i>
                        <a href='/admin/commentlist' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Qu???n l?? b??nh lu???n</a>
                    </div>
                </div>
            </div>
            <Row className='align-items-center mx-4 mt-4 px-4 py-3' style={{ background: 'white' }}>
                <Col className='px-0'>
                    <h5 style={{ fontSize: '16px' }} className='pb-4 pt-4'>DANH S??CH ????NH GI?? S???N PH???M</h5>
                </Col>
                <Col className='d-flex justify-content-end px-0'>
                    <h6 style={{ fontSize: '14px' }} className='pb-4 pt-4'>T???ng s??? l?????ng: {reviews?.data?.length} ????nh gi??</h6>
                </Col>
            </Row>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div className='mx-4 pb-5' style={{ height: 'auto' }}>
                    <Table responsive striped>
                        <thead style={{ background: 'white' }}>
                            <tr>
                                <th>#</th>
                                <th className='text-center'>T??i kho???n ????nh gi??</th>
                                <th className='text-center'>S???n ph???m</th>
                                <th className='text-center'>Th???i gian ????nh gi??</th>
                                <th className='text-center'>S??? sao ????nh gi??</th>
                                <th className='text-center'>N???i dung ????nh gi??</th>
                                <th className='text-center'>Tr???ng th??i</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews?.data?.reverse()?.map((review, index) => (
                                <tr style={{ margin: '60px 0' }} key={review.id}>
                                    <td style={{ fontWeight: 'bold' }}>{index + 1}</td>
                                    <td className='text-center'>{review.reviewedBy}</td>
                                    <td className='text-center'>{review.productname}</td>
                                    <td className='text-center'>{review.createdDate}</td>
                                    <td className='text-center'>{review.rate}</td>
                                    <td className='text-center'>
                                        <Accordion>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header style={{ fontSize: '13px' }}>N???i dung ????nh gi??</Accordion.Header>
                                                <Accordion.Body>
                                                    <p className='mt-3'>{review.content}</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </td>
                                    <td className='text-center'>
                                        {
                                            (review.state === 'enable') ?
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <p style={{ background: '#00c292', color: '#e7fff8', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 py-1 px-2'>Ho???t ?????ng</p>
                                                </div> : (review.state === 'process') ?
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <p style={{ background: '#eeb808', color: '#e7fff8', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 py-1 px-2'>Ch??? duy???t</p>
                                                </div> :
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <p style={{ background: '#e46a76', color: '#e7fff8', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 py-1 px-2'>???? kh??a</p>
                                                </div>
                                        }
                                    </td>
                                    <td className='d-flex justify-content-center'>
                                        {/* Block comment */}
                                        {
                                            review.state === 'enable' ?
                                                <Button data-tip data-for="tip3"
                                                    style={{ background: '#ee5261', border: '2px solid #ee5261', width: 'auto', height: 'auto' }}
                                                    className='my-0 mx-0'
                                                    onClick={() => handleShowBlock(review.id)}
                                                >
                                                    <i className="fas fa-lock"></i>
                                                </Button>
                                                :
                                                <Button data-tip data-for="tip4"
                                                    style={{ background: '#00c292', border: '2px solid #00c292', width: 'auto', height: 'auto' }}
                                                    className='my-0 mx-0'
                                                    onClick={() => handleShowUnlock(review.id)}
                                                >
                                                    <i className="fas fa-unlock"></i>
                                                </Button>

                                        }
                                        <ReactTooltip id="tip2" place="top" effect="solid">
                                            Ch???nh s???a
                                        </ReactTooltip>
                                        <ReactTooltip id="tip1" place="top" effect="solid">
                                            Chi ti???t
                                        </ReactTooltip>
                                        <ReactTooltip id="tip3" place="top" effect="solid">
                                            Kh??a
                                        </ReactTooltip>
                                        <ReactTooltip id="tip4" place="top" effect="solid">
                                            M??? kh??a
                                        </ReactTooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
            <Modal
                show={show}
                onHide={handleCloseBlock}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Th??ng b??o</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '14px' }}>
                    B???n c?? ch???c ch???n mu???n kh??a danh m???c n??y kh??ng?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseBlock} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
                        H???y
                    </Button>
                    <Button variant="danger" onClick={() => blockHandler(idDelete)} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
                        ?????ng ??
                    </Button>
                </Modal.Footer>
            </Modal>\
            {/* Modal Unlock User */}
            <Modal
                show={showUnlock}
                onHide={handleCloseUnlock}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Th??ng b??o</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '14px' }}>
                    B???n c?? ch???c ch???n mu???n m??? kh??a danh m???c n??y kh??ng?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUnlock} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
                        H???y
                    </Button>
                    <Button variant="success" onClick={() => unlockHandler(idUnlock)} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
                        ?????ng ??
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CommentListScreen

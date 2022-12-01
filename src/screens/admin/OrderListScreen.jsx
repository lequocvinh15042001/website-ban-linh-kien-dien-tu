import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Pagination, Modal, Form, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { detailStateOrderAdmin, getAllOrders, listOrderAdmin, setPaidOrder } from "../../actions/orderActions";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const ProductListScreen = () => {
  const [pageNum, setPageNum] = useState(1);
  const [status, setStatus] = useState('all');
  // console.log('===', status)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { orderAll } = useSelector(state => state.orderAll)

  const { loading, error, orders, page } = useSelector((state) => state.orderListAdmin)
  // console.log('==', productAll?.data?.length);

  const { orderState } = useSelector((state) => state.orderListDetailAdmin)
  // console.log('==', productAll?.data?.length);

  const orderSetDelivery = useSelector(state => state.orderSetDelivery)
  const { success: deliverySuccess } = orderSetDelivery
  // console.log('==', userInfo)

  const orderSetPaid = useSelector(state => state.orderSetPaid)
  const { success: paidSuccess } = orderSetPaid
  // console.log('==', userInfo)

  // GEt order Page with states
  const arrOrderPage = []
  const checkOrderPage = (status) => {
    if (status === 'all') {
      orders?.data?.list?.find(item => {
        if (item.state !== 'in cart') {
          arrOrderPage.push(item)
        }
      })
    } else {
      orderState?.data?.list?.find(item => {
        if (item.state !== 'in cart') {
          arrOrderPage.push(item)
        }
      })
    }
  }
  checkOrderPage(status)

  // Get length List order
  let arrOrderState = []
  const getLength = (status) => {
    if (status === 'all') {
      orderAll?.data?.list?.find(item => {
        if (item.state !== 'in cart') {
          arrOrderState.push(item)
        }
      })
    } else {
      orderAll?.data?.list?.find(item => {
        if (item.state !== 'in cart' && item.state === status) {
          arrOrderState.push(item)
        }
      })
    }
  }

  getLength(status)
  // console.log('===', arrOrderState)
  const num = arrOrderState?.length


  const paginationPage = (num, pageSize) => {
    let page = 0
    if ((num / pageSize) > ((num / pageSize) - (num % pageSize) / pageSize)) {
      page = ((num / pageSize) - (num % pageSize) / pageSize + 1)
    } else if ((num % pageSize) === 0) {
      page = (num / pageSize)
    }
    return page
  }

  let pages = paginationPage(num, 5)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo || userInfo.role === "role_admin") {
      dispatch(getAllOrders())
      dispatch(listOrderAdmin(pageNum - 1))
      dispatch(detailStateOrderAdmin(status, pageNum - 1))
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo, paidSuccess, pageNum, status, deliverySuccess])

  // Edit state O
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [id, setId] = useState('')
  const handleEditStateOrder = (id) => {
    setShow(true);
    setId(id)
  }

  const updateStatekHandler = (id) => {
    setShow(false);
    dispatch(setPaidOrder(id))
    // window.location.reload()
  }

  return (
    <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px', background: '#edf1f5' }}>
      <div className='d-flex align-items-center justify-content-between flex-wrap px-4' style={{ background: 'white', width: '100%' }}>
        <div className='d-flex align-items-center justify-content-between py-4'>
          <div className='d-flex align-items-center'>
            <i className='fas fa-home'></i>
            <a href='/admin/dashboard' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Trang điều khiển</a>
          </div>
          <div className='d-flex align-items-center'>
            <i className="fas fa-chevron-right mx-2"></i>
            <a href='/admin/orderlist' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Quản lý đơn hàng</a>
          </div>
        </div>
      </div>
      <Row className='align-items-center mx-4 mt-4 px-4' style={{ background: 'white' }}>
        <Col className='px-0'>
          <h5 style={{ fontSize: '16px' }} className='pb-4 pt-4'>DANH SÁCH ĐƠN HÀNG</h5>
        </Col>
        <Col className='d-flex justify-content-end px-0'>
          <h6 style={{ fontSize: '14px' }} className='pb-4 pt-4'>Tổng số lượng: {num} đơn hàng</h6>
        </Col>
      </Row>
      <Row className='d-flex justify-content-end align-items-center mx-4 mt-0 px-4' style={{ background: 'white' }}>
        {/* <div style={{ width: 'auto', fontSize: '20px' }} className='d-flex justify-content-center align-items-center'>
          <i style={{ width: 'auto' }} className="fas fa-sort-amount-down-alt"></i>
        </div> */}
        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: 'auto' }} aria-label="Default select example">
          <option value="all">Tất cả</option>
          <option value="process">Đang chờ xác nhận</option>
          <option value="delivery">Đang giao hàng</option>
          <option value="paid">Giao hàng thành công</option>
          <option value="cancel">Đã hủy</option>
        </Form.Select>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='mx-4' style={{ height: 'auto' }}>
          <Table responsive striped>
            <thead style={{ background: 'white' }}>
              <tr>
                <th>#</th>
                <th>Người đặt hàng</th>
                <th className='text-center'>Tổng sản phẩm</th>
                <th className='text-end'>Tổng thanh toán</th>
                <th className='text-center'>Trạng thái đơn hàng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {arrOrderPage?.map((order, index) => (
                <tr style={{ margin: '60px 0' }} key={order.id}>
                  <td style={{ fontWeight: 'bold' }}>{index + (pageNum - 1) * 5 + 1}</td>
                  <td>{order.userName}</td>
                  <td className='text-center'>{order.totalProduct}</td>
                  <td className='text-end'>{order.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                  <td className='text-center'>
                    {
                      (order.state === 'process') ?
                        <div className='d-flex justify-content-center align-items-center'>
                          <p style={{ background: '#fec107', color: '#e7fff8', borderRadius: '5px' }} className='my-0 mx-3 py-1 px-2'>Chờ xác nhận</p>
                        </div> : (order.state === 'delivery') ?
                          <div className='d-flex justify-content-center align-items-center'>
                            <p style={{ background: '#03a9f3', color: '#e7fff8', borderRadius: '5px' }} className='my-0 mx-3 py-1 px-2'>Đang giao hàng</p>
                          </div> : (order.state === 'cancel') ?
                            <div className='d-flex justify-content-center align-items-center'>
                              <p style={{ background: '#ee5261', color: '#e7fff8', borderRadius: '5px' }} className='my-0 mx-3 py-1 px-2'>Đã hủy đơn hàng</p>
                            </div> :
                            <div className='d-flex justify-content-center align-items-center'>
                              <p style={{ background: '#00c292', color: '#e7fff8', borderRadius: '5px' }} className='my-0 mx-3 py-1 px-2'>Đã nhận và thanh toán</p>
                            </div>
                    }
                  </td>
                  <td className='d-flex justify-content-center'>
                    <LinkContainer style={{ width: 'auto', height: 'auto' }} data-tip data-for="tip1" to={`/admin/order/${order.id}/detail`}>
                      <Button
                        disabled={order.state === 'disable' ? 'true' : ''}
                        variant='secondary' className='my-0 mx-0'>
                        <i className='fas fa-eye'></i>
                      </Button>
                    </LinkContainer>
                    <ReactTooltip id="tip1" place="top" effect="solid">
                      Chi tiết
                    </ReactTooltip>

                    <Button
                      data-tip data-for="tip2"
                      disabled={order.state === 'process' || order.state === 'paid' || order.state === 'cancel' ? 'true' : ''}
                      style={{ background: '#03a9f3', width: 'auto', height: 'auto' }}
                      onClick={() => handleEditStateOrder(order.id)}
                      className='my-0 mx-2'>
                      <i className="fas fa-vote-yea"></i>
                    </Button>
                    <ReactTooltip id="tip2" place="top" effect="solid">
                      Xác nhận thanh toán
                    </ReactTooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {pages > 1 && (
        <div className='d-flex justify-content-center'>
          <Pagination>
            {[...Array(pages).keys()].map((x) => (
              <Pagination.Item className='mx-1' active={x + 1 === page}
                key={x + 1}
                onClick={() => setPageNum(x + 1)}
              >{x + 1}</Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}

      {/* Modal Edit State Order */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Xác nhận thanh toán thành công
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="success" onClick={() => updateStatekHandler(id)}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProductListScreen

import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Image, Modal, Pagination, Row, Tab, Table, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllOrderProcessByShipper, getAllOrderByShipper, chooseOrderByShipper, paidOrderByShipper, cancelOrderByShipper, getOrderDetailByShipper } from '../../actions/orderActions'
import HeaderShipper from '../../components/shipper/HeaderShipper'

const HomeShipperScreen = () => {
  const [pageNum, setPageNum] = useState(1);

  const num = 5

  const { userInfo } = useSelector((state) => state.userLogin)
  const { orderProcess, page } = useSelector((state) => state.orderProcessListShipper)
  const { orderAllShipper } = useSelector((state) => state.orderListShipper)
  const { success: chooseSucces } = useSelector((state) => state.chooseOrderByShipper)
  const { success: paidSucces } = useSelector((state) => state.paidOrderByShipper)
  const { success: cancelSucces } = useSelector((state) => state.cancelOrderByShipper)
  const { orderDetail } = useSelector((state) => state.detailOrderByShipper)
  // console.log('===', orderDetail?.data);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo || userInfo.role === "role_shipper") {
      dispatch(getAllOrderProcessByShipper(pageNum - 1))
      dispatch(getAllOrderByShipper())
    } else {
      navigate('/shipper/login')
    }
  }, [dispatch, navigate, userInfo, pageNum, chooseSucces, paidSucces, cancelSucces])

  // Filter Order Delivery
  const arrDelivery = []
  const filterDelivery = () => {
    orderAllShipper?.data?.list?.forEach(order => {
      if (order.state === 'delivery') {
        arrDelivery.push(order)
      }
    })
  }

  // Filter Order Paid
  const arrPaid = []
  const filterPaid = () => {
    orderAllShipper?.data?.list?.forEach(order => {
      if (order.state === 'paid') {
        arrPaid.push(order)
      }
    })
  }

  // Filter Order Cancel
  const arrCancel = []
  const filterCancel = () => {
    orderAllShipper?.data?.list?.forEach(order => {
      if (order.state === 'process') {
        arrCancel.push(order)
      }
    })
  }

  filterDelivery()
  filterPaid()
  filterCancel()

  // Choose Order
  const chooseOrrder = (id) => {
    dispatch(chooseOrderByShipper(id))
  }

  // Paid Order
  const paidOrrder = (id) => {
    dispatch(paidOrderByShipper(id))
  }

  // Cancel Order
  const cancelOrrder = (id) => {
    dispatch(cancelOrderByShipper(id))
  }

  // Show Detail Order
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const getDetailHandler = (id) => {
    setShow(true);
    dispatch(getOrderDetailByShipper(id))
    // window.location.reload()
  }

  // Search
  const [selectedOptions, setSelectedOptions] = useState('');

  const myOptions = [];
  const getDataSearch = (product) => {
    product?.forEach(prod => {
      myOptions.push(prod.id)
    })
  }

  getDataSearch(orderAllShipper?.data?.list)

  const search = () => {
    orderAllShipper?.data?.list?.forEach(prod => {
      if (prod.id === selectedOptions) {
        setShow(true);
        dispatch(getOrderDetailByShipper(prod.id))
      }
    })
  }

  return (
    <Row className='mx-0 px-0 ' style={{ background: '#f5f5f5', height: '100vh', width: '100vw' }}>
      <Row className='mx-0 px-0' style={{ background: '#f5f5f5', height: '10vh' }}>
        <HeaderShipper />
      </Row>
      <Row  style={{ background: '#f5f5f5', height: '5vh', margin: '0 auto', padding: 'auto', width: '90%' }}>
        <div className='d-flex align-items-center py-0 px-0 shadow-sm  bg-white' style={{ background: '#ffffff', border: 'solid 1px #eeb808', borderRadius: '0px' }}>
          <div className='w-100'>
            <Autocomplete disablePortal options={myOptions.sort()} onChange={(event, value) => setSelectedOptions(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{ ...params.InputProps, disableUnderline: true }}
                  placeholder='Nh???p ID ????n h??ng ????? t??m ki???m'
                  style={{paddingLeft: '20px'}}
                />
              )}
            />
          </div>
          <div>
            <Button className='my-0 mx-0' onClick={() => search()} style={{ background: '#eeb808', border: 'none', borderRadius: '0px' }}>
              <i style={{ color: 'white' }} className="fas fa-search py-2"></i>
            </Button>
          </div>
        </div>
      </Row>
      <Container className='my-1' style={{ background: '#f5f5f5', height: '70vh' }}>
        <Tabs
          style={{ color: 'black', background: 'white', border: 'none' }}
          defaultActiveKey="processList"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="processList" title="????n h??ng c???n giao" style={{ color: 'black', background: 'white' }}>
            <Table responsive style={{ fontSize: '13px' }}>
              <thead style={{ background: 'white' }}>
                <tr>
                  <th className='text-center'>ID ????n h??ng</th>
                  <th className='text-center'>T??i kho???n ?????t h??ng</th>
                  <th className='text-center'>Tr???ng th??i ????n h??ng</th>
                  <th className='text-center'>Chi ti???t ????n h??ng</th>
                  <th className='text-center'>Ch???n ????n h??ng</th>
                </tr>
              </thead>
              <tbody>
                {orderProcess?.data?.list?.map((order) => (
                  <tr style={{ margin: '60px 0' }} key={order.id}>
                    <td className='text-center'>{order.id}</td>
                    <td className='text-center'>{order.userName}</td>
                    <th style={{ color: '#eeb808' }} className='text-center'>Ch??a giao</th>
                    <td className='text-start'>
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header style={{ fontSize: '13px' }}>Xem chi ti???t</Accordion.Header>
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
                    </td>
                    <td className='text-center'>
                      <Button onClick={() => chooseOrrder(order.id)} className='my-0' style={{ fontSize: '13px' }} variant="success">Nh???n ????n</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {num > 1 && (
              <div className='d-flex justify-content-center'>
                <Pagination>
                  {[...Array(num).keys()].map((x) => (
                    <Pagination.Item className='mx-1' active={x + 1 === page}
                      key={x + 1}
                      onClick={() => setPageNum(x + 1)}
                    >{x + 1}</Pagination.Item>
                  ))}
                </Pagination>
              </div>
            )}
          </Tab>
          <Tab eventKey="chooseList" title={`????n h??ng ???? nh???n (${arrDelivery.length})`}>
            <Table responsive style={{ fontSize: '13px' }}>
              <thead style={{ background: 'white' }}>
                <tr>
                  <th className='text-center'>ID ????n h??ng</th>
                  <th className='text-center'>T??i kho???n ?????t h??ng</th>
                  <th className='text-center'>Xem chi ti???t</th>
                  <th className='text-center'>Tr???ng th??i ????n h??ng</th>
                  <th className='text-center'>H???y giao</th>
                  <th className='text-center'>Giao th??nh c??ng</th>
                </tr>
              </thead>
              <tbody>
                {arrDelivery?.map((order) => (
                  <tr style={{ margin: '60px 0' }} key={order.id}>
                    <td className='text-center'>{order.id}</td>
                    <td className='text-center'>{order.userName}</td>
                    <td className='text-center'>
                      <Button onClick={() => getDetailHandler(order.id)} className='my-0' style={{ fontSize: '13px' }} variant="outline-secondary">Chi ti???t</Button>
                    </td>
                    <th style={{ color: '#3333ff' }} className='text-center'>??ang giao h??ng</th>
                    <td className='text-center'>
                      <Button onClick={() => cancelOrrder(order.id)} className='my-0' style={{ fontSize: '13px', color: 'white' }} variant="warning">H???y giao</Button>
                    </td>
                    <td className='text-center'>
                      <Button onClick={() => paidOrrder(order.id)} className='my-0' style={{ fontSize: '13px' }} variant="success">Th??nh c??ng</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="paidList" title="????n h??ng giao th??nh c??ng">
            <Table responsive style={{ fontSize: '13px' }}>
              <thead style={{ background: 'white' }}>
                <tr>
                  <th className='text-center'>ID ????n h??ng</th>
                  <th className='text-center'>T??i kho???n ?????t h??ng</th>
                  <th className='text-center'>Xem chi ti???t</th>
                  <th className='text-center'>Tr???ng th??i ????n h??ng</th>
                </tr>
              </thead>
              <tbody>
                {arrPaid?.map((order) => (
                  <tr style={{ margin: '60px 0' }} key={order.id}>
                    <td className='text-center'>{order.id}</td>
                    <td className='text-center'>{order.userName}</td>
                    <td className='text-center'>
                      <Button onClick={() => getDetailHandler(order.id)} className='my-0' style={{ fontSize: '13px' }} variant="outline-secondary">Chi ti???t</Button>
                    </td>
                    <th style={{ color: 'green' }} className='text-center'>Giao h??ng th??nh c??ng</th>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="cancelList" title="????n h??ng ???? h???y giao">
            <Table responsive style={{ fontSize: '13px' }}>
              <thead style={{ background: 'white' }}>
                <tr>
                  <th className='text-center'>ID ????n h??ng</th>
                  <th className='text-center'>T??i kho???n ?????t h??ng</th>
                  <th className='text-center'>Xem chi ti???t</th>
                </tr>
              </thead>
              <tbody>
                {arrCancel?.map((order) => (
                  <tr style={{ margin: '60px 0' }} key={order.id}>
                    <td className='text-center'>{order.id}</td>
                    <td className='text-center'>{order.userName}</td>
                    <td className='text-center'>
                      <Button onClick={() => getDetailHandler(order.id)} className='my-0' style={{ fontSize: '13px' }} variant="outline-secondary">Chi ti???t</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Container>

      {/* Detail Paid, Delivery and Cancel */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>CHI TI???T ????N H??NG</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
          <strong>Th??ng tin ????n h??ng</strong>
          <p className='mt-3'>- Ng??y ?????t h??ng: {orderDetail?.data?.createdDate}</p>
          <p>- S??? l?????ng s???n ph???m: {orderDetail?.data?.totalProduct}</p>
          <p>- Ph????ng th???c thanh to??n: {orderDetail?.data?.receiveOrder?.paymentType}</p>
          <p>- T???ng thanh to??n: <span style={{ fontWeight: 'bold', color: 'red' }}>{orderDetail?.data?.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></p>
          <strong>Th??ng tin ng?????i nh???n</strong>
          <p className='mt-3'>- T??n ng?????i nh???n: {orderDetail?.data?.receiveOrder?.receiveName}</p>
          <p className='mt-3'>- S??? ??i???n tho???i: {orderDetail?.data?.receiveOrder?.receivePhone}</p>
          <p className='mt-3'>- ?????a ch??? giao h??ng: {orderDetail?.data?.receiveOrder?.receiveAddress + ', ' + orderDetail?.data?.receiveOrder?.receiveDistrict + ', ' + orderDetail?.data?.receiveOrder?.receiveProvince + ', ' + orderDetail?.data?.receiveOrder?.receiveVillage}</p>
          <strong>Chi ti???t ????n h??ng</strong>
          {
            orderDetail?.data?.items?.map(item => (
              <Row className='mx-0 my-0 py-0 px-0'>
                <Col className='mt-3 '>
                  <Image style={{ width: '90px', border: 'solid 2px #f2f2f2' }} src={item?.image[0]?.url}></Image>
                </Col>
                <Col className='mt-3 d-flex justify-content-center align-items-center'>{item.name}</Col>
                <Col className='mt-3 d-flex justify-content-center align-items-center'>{(item.price / item.quantity)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })} x {item.quantity}</Col>
              </Row>
            ))
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
            Xong
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  )
}

export default HomeShipperScreen
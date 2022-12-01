import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Pagination, Modal, Form, Image } from 'react-bootstrap'
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useDispatch, useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getAllOrders, getProfitOrder, listOrderAdmin } from "../../actions/orderActions";
import { Link, useNavigate } from 'react-router-dom'
import { getAllUsersAdmin } from '../../actions/userActions'
import { getAllCommentsAdmin, getAllProductsAdmin, listCategoryAdmin } from '../../actions/productActions'

const DashboardScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [type, setType] = useState('month')
  console.log('===', type)

  const { userAll } = useSelector((state) => state.userAllAdmin)
  const { categories } = useSelector((state) => state.categoryListAdmin)
  const { productAll } = useSelector(state => state.productAllAdmin)
  const { orderAll } = useSelector(state => state.orderAll)
  const { profit } = useSelector(state => state.orderProfit)
  const { reviews } = useSelector((state) => state.reviewAllAdmin)
  // console.log('====', orderAll?.data)

  const arrOrderAll = []
  const checkOrderAll = () => {
    orderAll?.data?.list?.find(item => {
      if (item.state !== 'in cart') {
        arrOrderAll.push(item)
      }
    })
  }
  checkOrderAll()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo || userInfo.role === "role_admin") {
      dispatch(getAllOrders())
      dispatch(getAllUsersAdmin())
      dispatch(listCategoryAdmin())
      dispatch(getAllProductsAdmin())
      dispatch(getAllCommentsAdmin())
      dispatch(getProfitOrder('01-11-2020', '28-11-2025', type))
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo])


  return (
    <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px', background: '#edf1f5' }}>
      <div className='d-flex align-items-center justify-content-between flex-wrap px-4' style={{ background: 'white', width: '100%' }}>
        <div className='d-flex align-items-center justify-content-between py-4'>
          <div className='d-flex align-items-center'>
            <i className='fas fa-home'></i>
            <a href='/admin/dashboard' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Trang điều khiển</a>
          </div>
        </div>
      </div>
      <Row className='d-flex justify-content-between align-items-center mx-4 flex-wrap'>
        <Col xl={2} className='d-flex justify-content-center align-items-center flex-column px-0 my-4 py-3' style={{ background: 'white' }}>
          <h6 style={{ fontSize: '14px' }} className='pb-4 pt-4 my-0'>Người dùng: {userAll?.data?.length}</h6>
          <Link style={{ textDecoration: 'none' }} to='/admin/userlist'>Chi tiết</Link>
        </Col>
        <Col xl={2} className='d-flex justify-content-center align-items-center flex-column px-0 my-4 py-3' style={{ background: 'white' }}>
          <h6 style={{ fontSize: '14px' }} className='pb-4 pt-4 my-0'>Danh mục: {categories?.data?.length}</h6>
          <Link style={{ textDecoration: 'none' }} to='/admin/categorylist'>Chi tiết</Link>
        </Col>
        <Col xl={2} className='d-flex justify-content-center align-items-center flex-column px-0 my-4 py-3' style={{ background: 'white' }}>
          <h6 style={{ fontSize: '14px' }} className='pb-4 pt-4 my-0'>Sản phẩm: {productAll?.data?.length}</h6>
          <Link style={{ textDecoration: 'none' }} to='/admin/productlist'>Chi tiết</Link>
        </Col>
        <Col xl={2} className='d-flex justify-content-center align-items-center flex-column px-0 my-4 py-3' style={{ background: 'white' }}>
          <h6 style={{ fontSize: '14px' }} className='pb-4 pt-4 my-0'>Đơn hàng: {arrOrderAll?.length}</h6>
          <Link style={{ textDecoration: 'none' }} to='/admin/orderlist'>Chi tiết</Link>
        </Col>
        <Col xl={2} className='d-flex justify-content-center align-items-center flex-column px-0 my-4 py-3' style={{ background: 'white' }}>
          <h6 style={{ fontSize: '14px' }} className='pb-4 pt-4 my-0'>Đánh giá: {reviews?.data?.length}</h6>
          <Link style={{ textDecoration: 'none' }} to='/admin/commentlist'>Chi tiết</Link>
        </Col>
      </Row>
      <Row className="section px-0 mx-3 py-0">
        <h5 className="section-title">Thống kê số lượng sản phẩm</h5>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={productAll?.data} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Tooltip />
              <Legend />
              {/* <Bar dataKey="totalAvenue" fill="#FB8833" /> */}
              <Bar dataKey="quantity" fill="#17A8F5" name='Số lượng sản phẩm' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Row>
      <Row className='d-flex justify-content-between align-items-center mx-4 flex-wrap'>
        <Col xl={5} className='d-flex justify-content-center align-items-center flex-column px-0 my-4 py-3' style={{ background: 'white' }}>
          <p style={{ fontSize: '14px' }} className='pb-4 pt-4 my-0'><h4>Sản phẩm gần hết hàng:</h4>
            {
              productAll?.data?.map((item, index) => {
                if (item.quantity <= 20) {
                  return (
                    <div className='d-flex justify-content-between align-items-center'>
                      <p className='py-0 my-0' key={index}>-{item.name} (còn {item.quantity} cái)</p>
                      <Link to={`/admin/product/${item.id}/detail`}>chi tiết</Link>
                    </div>
                  )
                }
              })
            }
          </p>
          <Link style={{ textDecoration: 'none' }} to='/admin/userlist'>Đến trang quản lý sản phẩm</Link>
        </Col>
        <Col xl={5} className='d-flex justify-content-center align-items-center flex-column px-0 my-4 py-3' style={{ background: 'white' }}>
          <p style={{ fontSize: '14px' }} className='pb-4 pt-4 my-0'><h4>Sản phẩm còn số lượng lớn:</h4>
            {
              productAll?.data?.map((item, index) => {
                if (item.quantity >= 100) {
                  return (
                    <div className='d-flex justify-content-between align-items-center'>
                      <p className='py-0 my-0' key={index}>-{item.name} (còn {item.quantity} cái)</p>
                      <Link to={`/admin/product/${item.id}/detail`}>chi tiết</Link>
                    </div>
                  )
                }
              })
            }
          </p>
          <Link style={{ textDecoration: 'none' }} to='/admin/userlist'>Đến trang quản lý sản phẩm</Link>
        </Col>
      </Row>

      {/* Profit */}
      <Row className="section px-0 mx-3 py-0">
        <h5 className="section-title">Thống kê doanh thu theo tháng</h5>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={profit?.data} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Tooltip />
              <Legend />
              {/* <Bar dataKey="totalAvenue" fill="#FB8833" /> */}
              <Bar dataKey="amount" fill="green" name='Tổng doanh thu tháng' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Row>
      {/* <Row className='d-flex justify-content-between align-items-center px-0 my-4 py-3 mx-0'>
        <Button style={{width: 'auto', background: '#17A8F5', border: 'none'}} onClick={() => setType('month')}>Tháng</Button>
        <Button style={{width: 'auto', background: '#17A8F5', border: 'none'}} onClick={() => setType('all')}>Năm</Button>
      </Row> */}
    </div>
  )
}

export default DashboardScreen

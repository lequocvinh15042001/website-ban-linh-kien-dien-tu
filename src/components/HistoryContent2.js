import React , {useEffect} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useUserContext } from "../context/user_context";

import HistoryColumns from "./HistoryColumns";
import HistoryItem from "./HistoryItem";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { LinkContainer } from "react-router-bootstrap";
import ReactTooltip from "react-tooltip";
import Contact from "./Contact";
import { cancelOrderByUser } from "../actions/orderActions";

const HistoryContent = ({history}) => {
  const dispatch = useDispatch()
  // const {
  //   myUser: { name, email },
  // } = useUserContext();
  // let itemCount = 0;
  console.log("Chuyển qua history", history);
  // console.log(history.data.productElecList);
  const userLogin = useSelector((state)=> state.userLogin)
  console.log(userLogin.userInfo);

  const {id} = userLogin

  const {success} = useSelector((state)=> state.cancelOrder)

  useEffect(() => {
  }, [success]);


  // cancel Order
  const cancelOrder = (id) =>{
    dispatch(cancelOrderByUser(id))
    window.location.reload()
  }

  return (
    <Wrapper className="section-center">
      <div className="link-container">
        <Link to="/products" className="link-btn">
          Tiếp tục mua sắm
        </Link>
      </div>
      <br /> <br />

      <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px', background: '#edf1f5' }}>
      <div className='d-flex align-items-center justify-content-between flex-wrap px-4' style={{ background: 'white', width: '100%' }}>
      </div>
      <Row className='align-items-center mx-2 mt-2 px-4' style={{ background: 'white' }}>
        <Col className='px-0'>
          <h5 style={{ fontSize: '20px', fontWeight:'700' }} className='pb-4 pt-4'>ĐƠN HÀNG</h5>
        </Col>
        <Col className='d-flex justify-content-end px-0'>
          <h6 style={{ fontSize: '14px', background:"black", color:"white", borderRadius:"5px"} } className='p-2'>Tổng số lượng: {history?.length} đơn hàng đã đặt</h6>
        </Col>
      </Row>
      <Row className='d-flex justify-content-end align-items-center mx-4 mt-0 px-4' style={{ background: 'white' }}>
        {/* <div style={{ width: 'auto', fontSize: '20px' }} className='d-flex justify-content-center align-items-center'>
          <i style={{ width: 'auto' }} className="fas fa-sort-amount-down-alt"></i>
        </div> */}
      </Row>
      {/* {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : ( */}
        <div className='mx-2' style={{ height: 'auto' }}>
          <Table responsive striped>
            <thead style={{ background: 'white' }}>
              <tr>
                <th>STT</th>
                <th className='text-center'>Tên sản phẩm</th>
                <th className='text-center'>Tổng đơn</th>
                <th className='text-center'>Thông tin</th>
                {/* <th className='text-center'>Thông tin giao</th> */}
                <th className='text-center'>Trạng thái</th>
                <th className='text-center'>Loại thanh toán</th>
                <th className='text-center'>Ngày/giờ đặt</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {history?.map((product, index) => (
                <tr style={{ margin: '60px 0' }} key={product.id}>
                {/*STT */}
                  <td style={{ fontWeight: 'bold' }} >{index + 1}</td>

                  {/* Tên */}
                  <td>
                  {
                    product.items?.map((item, indexx) =>{
                        return(
                            <td key={indexx}
                            style={{
                                display: "flex",
                                padding:"3px 0 10px 0", 
                                }}>
                            <img 
                            src = {item.image[0].url}
                            style={{
                                width: '60px',
                                borderRadius:"5px",
                                }} /> 
                            <br></br>

                            <span className="text-center d-flex align-items-center"
                            style={{
                            color: "darkblue", 
                            fontWeight: "500",
                            width: '100px',
                            paddingLeft:"5px",
                            lineHeight:'18px',
                  
                            }}>
                            
                               SL: {item.quantity} cái <br></br> SP: {item.name} <br></br> Giá: {(item.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                            </span>
                            <br></br>
                        </td>
                        )
                    })
                  }
                  </td>
                  {
                    // product?.map((item, indexx) =>{
                    //     <td>{item[indexx].name}</td>
                    // })
                  }
                  {/* Tổng đơn */}
                  <td className='text-end'>{product.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>

                  {/* Thông tin */}
                  <td className='text-start'>
                    <span className="text-danger" style={{ fontSize: '15px', fontWeight:'700' }}>Tên người nhận: </span>
                  {product.receiveOrder.receiveName}
                  <br></br>
                  <br></br>
                  <span className="text-dark" style={{ fontSize: '15px', fontWeight:'700' }}>SĐT người nhận: </span>
                  {product.receiveOrder.receivePhone}
                  <br></br>
                  <br></br>
                  <span className="text-dark font-weight-light" style={{ fontSize: '15px', fontWeight:'700' }}>Địa chỉ giao hàng: </span>
                  <br></br>
                  <span style={{lineHeight:"30px"}}>
                  {product.receiveOrder.receiveAddress},
                  </span>
                  <span style={{lineHeight:"20px", paddingLeft: "5px"}}>
                  {product.receiveOrder.receiveVillage},
                    </span>
                  <span style={{lineHeight:"20px", paddingLeft: "5px"}}>
                  {product.receiveOrder.receiveDistrict},
                    </span>
                  <span style={{lineHeight:"20px", paddingLeft: "5px"}}>
                  {product.receiveOrder.receiveProvince}
                    </span>
                  </td>

                  {/* Trạng thái*/}
                  <td className='text-center' style={{width:"100px"}}>
                    {
                      (product.state === 'delivery') ?
                        <div className='d-flex justify-content-center align-items-center'>
                          <p style={{ background: '#FFFF00', color: '#000000', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 py-1 px-2'>Đang vận chuyển...</p>
                        </div> :
                        (product.state === 'process') ?
                        <div className='d-flex justify-content-center align-items-center'>
                          <p style={{ background: 'green', color: '#e7fff8', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 py-1 px-2'>Đang xử lý...</p>
                        </div>: (product.state === 'cancel') ?
                        <div className='d-flex justify-content-center align-items-center'>
                          <p style={{ background: 'red', color: '#e7fff8', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 py-1 px-2'>Đã hủy</p>
                        </div>:
                        <div className='d-flex justify-content-center align-items-center'>
                        <p style={{ background: '#00FF00', color: '#000000', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 py-1 px-2'>Đã nhận hàng ✓</p>
                        </div>   
                    }
                  </td>
                  <td className='text-center'>
                    {product.receiveOrder.paymentType}
                  </td>
                  <td className='text-end'>
                    {product.createdDate}
                  </td>
                  <td className='text-center' style={{width:"100px"}}>
                    {
                        (product.state === 'delivery') ?
                        <div className='d-flex justify-content-center align-items-center'>
                        <p style={{ background: '#e47200', color: '#e7fff8', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 py-1 px-2'>Không thể hủy</p>
                        </div> :
                        (product.state === 'process') ?
                        <div>
                        <p style={{ background: '#e47200', color: '#e7fff8', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 p-1 text-center'>Có thể hủy</p>
                        <Button onClick={() => cancelOrder(product.id)} style={{background: 'red', color: 'white', border: 'none', fontSize: '10px', width: 'auto'}}>Hủy đơn hàng</Button>
                        </div>: (product.state === 'cancel') ?
                        <div className='d-flex justify-content-center align-items-center'>
                        <p style={{ background: '#e47200', color: '#e7fff8', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 p-1'>Hủy thành công</p>
                        </div>:
                        <div className='d-flex justify-content-center align-items-center'>
                        <p style={{ background: '#e47200', color: '#e7fff8', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 p-1'>Thành công!</p>
                        </div>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        </div>
        {/* <Contact></Contact> */}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .tag {
    font-size: 1.2rem;
  }
  .para {
    margin-bottom: 0px;
  }
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;
export default HistoryContent;

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useUserContext } from "../context/user_context";

import HistoryColumns from "./HistoryColumns";
import HistoryItem from "./HistoryItem";
import { useSelector } from "react-redux";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { LinkContainer } from "react-router-bootstrap";
import ReactTooltip from "react-tooltip";

const HistoryContent = ({history}) => {
  // const {
  //   myUser: { name, email },
  // } = useUserContext();
  // let itemCount = 0;
  console.log("Chuyển qua history", history?.list);
  // console.log(history.data.productElecList);
  const userLogin = useSelector((state)=> state.userLogin)
  console.log(userLogin.userInfo);

  const {id} = userLogin

  return (
    <Wrapper className="section-center">
      <div className="link-container">
        <Link to="/products" className="link-btn">
          continue shopping
        </Link>
      </div>
      <br /> <br />
      <h2>previously purchased items</h2>
      <br /> <br />
      {history?.list?.map(list => {
        // const { id, totalPrice, totalProduct, createdDate, items, receiveOrder } = data;
        // if ( id === data.userId) {
          return (
            // <div className="section-center" key={list.id}>
            //   <div className="center">
            //     {/* <p className="para">
            //       Bought On:{" "}
            //       <span className="tag">
            //         {boughtAt.substr(0, 10)},{boughtAt.substr(10, 5)}
            //       </span>
            //     </p> */}
            //     <p className="para">
            //       Total Product: <span className="tag">{list?.totalProduct}</span>
            //     </p>
            //     <p className="para">
            //       Total Price: <span className="tag">{list?.totalPrice}</span>
            //     </p>
            //   </div>
            //   <br />
            //   <HistoryColumns />
            //   <HistoryItem key={id} {...list}/>
            //   {/* {list?.map(product => {
            //     const { id } = product;
            //     console.log("hehehehehee");
            //     return <HistoryItem key={id} {...product} />;
            //   })} */}
            //   <hr />
            //   <br /> <br />
            // </div>

            
            <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px', background: '#edf1f5' }}>
      <div className='d-flex align-items-center justify-content-between flex-wrap px-4' style={{ background: 'white', width: '100%' }}>
      </div>
      <Row className='align-items-center mx-4 mt-4 px-4' style={{ background: 'white' }}>
        <Col className='px-0'>
          <h5 style={{ fontSize: '16px' }} className='pb-4 pt-4'>DANH SÁCH SẢN PHẨM ĐÃ ĐẶT</h5>
        </Col>
        <Col className='d-flex justify-content-end px-0'>
          <h6 style={{ fontSize: '14px' }} className='pb-4 pt-4'>Tổng số lượng: 10 sản phẩm</h6>
        </Col>
      </Row>
      <Row className='d-flex justify-content-end align-items-center mx-4 mt-0 px-4' style={{ background: 'white' }}>
        {/* <div style={{ width: 'auto', fontSize: '20px' }} className='d-flex justify-content-center align-items-center'>
          <i style={{ width: 'auto' }} className="fas fa-sort-amount-down-alt"></i>
        </div> */}
        <Form.Select style={{ width: 'auto' }} aria-label="Default select example">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </Form.Select>
      </Row>
      {/* {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : ( */}
        <div className='mx-4' style={{ height: 'auto' }}>
          <Table responsive striped>
            <thead style={{ background: 'white' }}>
              <tr>
                <th>#</th>
                <th>Tên sản phẩm</th>
                <th className='text-end'>Giá bán</th>
                <th className='text-end'>Đã bán</th>
                {/* <th className='text-center'>Số diện thoại</th> */}
                <th className='text-center'>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {history.list?.map((product, index) => (
                <tr style={{ margin: '60px 0' }} key={product.id}>
                  <td style={{ fontWeight: 'bold' }}>{index}</td>
                  <td>{product.name}</td>
                  <td className='text-end'>{product.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                  <td className='text-end'>{product.sold}</td>
                  <td className='text-center'>
                    {
                      (product.state === 'enable') ?
                        <div className='d-flex justify-content-center align-items-center'>
                          <p style={{ background: '#00c292', color: '#e7fff8', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 py-1 px-2'>Hoạt động</p>
                        </div> :
                        <div className='d-flex justify-content-center align-items-center'>
                          <p style={{ background: '#e46a76', color: '#e7fff8', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 py-1 px-2'>Đã khóa</p>
                        </div>
                    }
                  </td>
                  <td className='d-flex justify-content-center'>
                    <LinkContainer style={{ width: 'auto', height: 'auto' }} data-tip data-for="tip1" to={`/admin/product/${product.id}/detail`}>
                      <Button
                        disabled={product.state === 'disable' ? 'true' : ''}
                        variant='secondary' className='my-0 mx-0'>
                        <i className='fas fa-eye'></i>
                      </Button>
                    </LinkContainer>
                    <ReactTooltip id="tip1" place="top" effect="solid">
                      Chi tiết
                    </ReactTooltip>

                    <LinkContainer style={{ width: 'auto', height: 'auto' }} data-tip data-for="tip2" to={`/admin/product/${product.id}/edit`}>
                      <Button
                        disabled={product.state === 'disable' ? 'true' : ''}
                        style={{ background: '#03a9f3' }}
                        className='my-0 mx-2'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <ReactTooltip id="tip2" place="top" effect="solid">
                      Chỉnh sửa
                    </ReactTooltip>

                    {/* Block product */}
                    {
                      product.state === 'enable' ?
                        <Button data-tip data-for="tip3"
                          style={{ background: '#ee5261', border: '2px solid #ee5261', width: 'auto', height: 'auto' }}
                          className='my-0 mx-0'
                          //onClick={() => handleShowBlock(product.id)}
                        >
                          <i className="fas fa-lock"></i>
                        </Button>
                        :
                        <Button data-tip data-for="tip4"
                          style={{ background: '#00c292', border: '2px solid #00c292', width: 'auto', height: 'auto' }}
                          className='my-0 mx-0'
                          //onClick={() => handleShowUnlock(product.id)}
                        >
                          <i className="fas fa-unlock"></i>
                        </Button>
                    }
                    <ReactTooltip id="tip3" place="top" effect="solid">
                      Khóa
                    </ReactTooltip>
                    <ReactTooltip id="tip4" place="top" effect="solid">
                      Mở khóa
                    </ReactTooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      {/* )} */}
      
    </div>
          );
        // }
      })}
      <hr />
      {/* {totalProduct ? null : (
        <p style={{ fontSize: "3rem" }}>You have not purchased anything :(</p>
      )} */}
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

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <Wrapper className="page-100">
      <section>
        <h1>Success</h1>
        <h3>Cảm ơn bạn đã đặt hàng ♥️</h3>
        <Link to="/" className="btn">
          trở về trang chủ
        </Link>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  background: white;
  margin-top: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
    color:red;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`;

export default PaymentSuccess;

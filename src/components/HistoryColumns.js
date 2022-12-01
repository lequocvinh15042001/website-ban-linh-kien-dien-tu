import React from "react";
import styled from "styled-components";

const HistoryColumns = () => {
  console.log("qua collumn nè");
  return (
    <Wrapper>
      <div className="content">
        <h5>Thông tin</h5>
        <h5>Thành tiền</h5>
        <h5>Ngày đặt hàng</h5>
      </div>
      <hr />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: none;
  @media (min-width: 776px) {
    display: block;
    .content {
      display: grid;
      grid-template-columns: 330px 1fr 1fr auto;
      justify-items: center;
      column-gap: 1rem;
      h5 {
        color: var(--clr-grey-5);
        font-weight: 400;
      }
    }

    span {
      width: 2rem;
      height: 2rem;
    }
    hr {
      margin-top: 1rem;
      margin-bottom: 3rem;
    }
  }
`;

export default HistoryColumns;

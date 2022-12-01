import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const StarsProduct = ({ stars, reviews }) => {
  const starArray = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <BsStarFill />
        ) : stars >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });

  return (
    <Wrapper>
      <div className="stars">{starArray}</div>
      <div style={{fontSize: '10px', paddingTop:"5px"}} className="reviews">({reviews} Đánh giá)</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex-end;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 10px;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default StarsProduct;

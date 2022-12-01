import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import heroBcg from "../assets/poster1.jpg";
import heroBcg2 from "../assets/poster2.jpg";

const Hero = () => {
  return (
    <Wrapper className="section-center">
      <article className="content">
        <h1>
          Electric's World
        </h1>
        <p>
          Chúng tôi tự hào vì dịch vụ cung cấp đến cho bạn những sản phẩm linh kiện điện tử tuyệt vời nhất!
        </p>
        <Link to="/products" className="btn hero-btn">
          Đặt hàng ngay
        </Link>
      </article>
      <article className="img-container">
        <img src={heroBcg} alt="herobcgimage" className="main-img" />
        <img src={heroBcg2} alt="herobcgimage2" className="accent-img" />
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 60vh;
  margin-top: 6rem;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: darkblue;
    font-size: 2rem;

    animation-duration: 4s;
    animation-name: slidein;


  }
  @keyframes slidein {
    from {
      margin-left: 100%;
      width: 300%;
    }
  
    to {
      margin-left: 0%;
      width: 100%;
    }
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    h1 {
      margin-bottom: 3rem;
    }
    p {
      font-size: 1rem;
    }
    .hero-btn {
      padding: 2rem 2rem !important;
      font-size: 1rem !important;
      color: darkblue;
      font-weight: 700;
      transition: transform 250ms;
      :hover{
        transform: translateY(-20px);
        background-color: darkblue;
        color: white;
      }
    }
    .img-container {
      display: block;
      position: relative;
      transition: transform 450ms;
      :hover{
          transition: transform 125ms;
          transform: translateY(-7px);
      }
    }
    .main-img {
      width: 100%;
      height: 500px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 350px;
      transform: translateX(-30%);
      border-radius: var(--radius);
    }
    .img-container::before {
      content: "";
      position: absolute;
      width: 10%;
      height: 80%;
      background: var(--clr-primary-9);
      bottom: 0%;
      left: -7%;
      border-radius: var(--radius);
    }
  }
`;

export default Hero;

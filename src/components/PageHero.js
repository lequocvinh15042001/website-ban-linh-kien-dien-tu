import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PageHero = ({ title, product }) => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3 style={{color: 'black', textDecoration: 'none', fontSize: '14px'}}>
          <Link style={{color: 'black', textDecoration: 'none'}} to="/"><i className="fas fa-home"></i> Trang chủ</Link>
          {product && <Link style={{color: 'black', textDecoration: 'none'}} to="/products"><i className="fas fa-chevron-right"></i> Sản phẩm</Link>}<i className="fas fa-chevron-right"></i> {title}
        </h3>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 10vh;
  display: flex;
  align-items: center;

  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`;

export default PageHero;

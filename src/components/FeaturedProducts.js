import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";

import { useProductsContext } from "../context/products_context";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, listCategory } from '../actions/productActions'


const FeaturedProducts = () => {
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList
  console.log(products);

  useEffect(() => {
    dispatch(listProducts())
    // dispatch(listCategory())
  }, [])

  const {
    // productsLoading: loading,
    // productsError: error,
    featuredProducts: featured,
  } = useProductsContext();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Lỗi truy vấn..." />;
  }

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>Sản phẩm, linh kiện điện tử</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {products.data?.list?.slice(0, 6).map((product) => {
          return <Product key={(product.id)} {...product} />;
        })}
      </div>
      <Link className="btn" to="/product">
        Xem tất cả
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
  }
`;

export default FeaturedProducts;

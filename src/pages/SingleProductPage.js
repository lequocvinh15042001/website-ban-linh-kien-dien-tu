import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import { Products } from ".";
import { createProductReview, listProductDetails, listReviews } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../actions/orderActions";

const SingleProductPage = () => {
  // const {
  //   // singleProductLoading: loading,
  //   // singleProductError: error,
  //   // singleProduct: product,
  //   fetchSingleProduct,
  // } = useProductsContext();
  // const { id } = useParams();
  const history = useNavigate();

  // useEffect(() => {
  //   fetchSingleProduct(`${url}${id}`);
  //   // eslint-disable-next-line
  // }, [id]);

  // useEffect(() => {
  //   if (error) {
  //     setTimeout(() => {
  //       history.push("/");
  //     }, 4000);
  //   }
  // }, [error]);

  const [qty, setQty] = useState(1)
  const [rate, setRate] = useState(5)
  const [content, setContent] = useState('')
  // console.log('==', content);

  const navigate = useNavigate();

  const productId = useParams().id
  const dispatch = useDispatch()

  console.log(productId);

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  // console.log('===', userInfo);

  const { reviews, error: errorGetComment } = useSelector(state => state.getReview)
  // console.log('==', reviews.data?.list);

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  console.log(product);
  // console.log('==', product);

  useEffect(() => {
    dispatch(listProductDetails(productId))
    dispatch(listReviews(productId))
  }, [productId])

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="fetching product" />;
  }

  // const {
  //   name,
  //   price,
  //   description,
  //   stock,
  //   stars,
  //   id: sku,
  //   reviews,
  //   images,
  //   company,
  // } = product;

  // submit Comment   
  const submitComment = () => {
    // console.log('==', commentProduct)
    if (userInfo) {
      dispatch(createProductReview(content, productId, rate))
      window.location.reload()
    }
  }

  // view Comment
  const viewComment = () => {
    window.location.href = '#comment'
  }

  return (
    <Wrapper>
      <PageHero title={(product.data?.name)} product />
      <div className="section section-center page py-3 my-5">
        <Link to="/products" className="py-3 px-5" style={{ textTransform: 'none', fontSize: '14px', border:'2px solid #cccccc', color: 'gray', textDecoration: 'none', borderRadius: '5px' }}>
          <i style={{ fontSize: '16px', color: 'gray' }} className="fas fa-long-arrow-alt-left me-3"></i> Quay lại
        </Link>
        <div className="d-flex justify-content-between flex-wrap mt-5" key={(product.id)}>
          <ProductImages images={product.data?.images} />
          <div style={{margin: '0 auto'}}>
            <h2 className="mb-3">{(product.data?.name)}</h2>
            {/* <Stars stars={(product.data?.rate)} reviews={reviews} /> */}
            <Stars stars={(product.data?.rate)} />
            <h5 style={{fontSize: '20px'}} className="price my-4">{(product.data?.price)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h5>
            <p style={{fontSize: '14px'}} className="desc">{(product.data?.description)}</p>
            <p className="info">
              <span style={{fontSize: '14px'}}>Tình trạng :</span>
              {(product.data?.quantity) > 0 ? <p style={{fontSize: '14px'}}>Còn hàng</p> : <p style={{fontSize: '14px'}}>Hết hàng</p>}
            </p>
            <p className="info" style={{fontSize: '14px'}}>
              <span style={{fontSize: '14px'}}>Danh mục :</span>
              {(product.data?.category)}
            </p>
            {/* <p className="info">
              <span>Thương hiệu :</span>
              {(product.supplier?.id?.name)}
            </p> */}
            <hr />
            {(product.data?.quantity) > 0 && <AddToCart product={product} key={(product.id)} />}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;

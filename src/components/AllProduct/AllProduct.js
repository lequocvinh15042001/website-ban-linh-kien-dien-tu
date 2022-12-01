import React, { useEffect, useState, useRef } from 'react';
import { useFilterContext } from "../../context/filter_context";
import "./AllProduct.scss";
import { formatPrice } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { listCategory, listProducts } from '../../actions/productActions';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Stars from '../Stars';
import StarsProduct from '../StarsProduct';
import { Table, Button, Row, Col, Pagination, Modal, Form, Image } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Loader';
const List = () => {

    const [data, setData] = useState([])
    
  const [showAll, setShowAll] = useState(true)

  const refContainer = useRef(null);

  const {
    filters: {
      text,
      category,
      company,
      color,
      minPrice,
      price,
      maxPrice,
      shipping,
    },
    updateFilters,
    clearFilters,
    allProducts,
  } = useFilterContext();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { categories } = useSelector(state => state.categoryList)
  const productList = useSelector(state => state.productList)
    const { loading, error, products, page } = productList

    console.log(products);



  console.log(categories);
  const arrProductGetCateId = []

  const getProductByCategotyId = (products, id) => {
    products.forEach(product => {
      if (product.category.id === id) {
        arrProductGetCateId.push(product)
      }
    });

  }
  
  const getCategoryId = (id) => {
    console.log(id);
    if(!id || id === undefined)
    {
        setData(products.data?.list)
        return;
    }else
    {
    arrProductGetCateId.length = 0
    getProductByCategotyId(products.data.list, id)
    setData(arrProductGetCateId)
    setShowAll(false)
    return;
    }

  }
  useEffect(() => {
    getCategoryId()
    dispatch(listCategory())
  }, [loading, error]);

    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(5);

  const num = products?.data?.totalQuantity
  // console.log(num);

  const paginationPage = (num, pageSize) => {
    let page = 0
    if ((num / pageSize) > ((num / pageSize) - (num % pageSize) / pageSize)) {
      page = ((num / pageSize) - (num % pageSize) / pageSize + 1)
    } else if ((num % pageSize) === 0) {
      page = (num / pageSize)
    }
    return page
  }

  let pages = paginationPage(num, pageSize)

  useEffect(() => {
    dispatch(listProducts(pageNum - 1, 20))
    // dispatch(listCategory())
  }, [pageNum, pageSize])

  return (
    <Wrapperr className="page">

        <div className="section-center products">
 <Wrapper>
      <div className="content">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <h5 className="content">Danh mục sản phẩm</h5>

                <div>
                  <button
                    style={{ color: "darkblue", fontSize: "15px" }}
                    name="category"
                    type="button"
                    key="all"
                    onClick={() => getCategoryId()}
                  >
                    Tất cả
                  </button>
                  {categories?.data?.map((c, index) => {
                    return (
                      <button
                        onClick={() => getCategoryId(c.id)}
                        style={{ color: "darkblue", fontSize: "15px" }}
                        name="category"
                        type="button"
                        key={index}
                        className={`${category === c?.name.toLowerCase() ? "active" : null
                          }`}
                      >
                        {c.name}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              id="company"
              value={company}
              onChange={updateFilters}
              className="company"
            >
              {companies.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((c, index) => {
                if (c === "all") {
                  return (
                    <button
                      key={index}
                      name="color"
                      onClick={updateFilters}
                      data-color="all"
                      className={`${
                        color === "all" ? "all-btn active" : "all-btn"
                      }`}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name="color"
                    style={{ background: c }}
                    className={`${
                      color === c ? "active color-btn" : "color-btn"
                    }`}
                    data-color={c}
                    onClick={updateFilters}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              min={minPrice}
              max={maxPrice}
              value={price}
            />
          </div> */}
              {/* <div className="form-control">
            <label htmlFor="shipping">Free Shipping </label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              checked={shipping}
              onChange={updateFilters}
            />
          </div> */}
            </form>
            {/* <button type="button" className="clear-btn" onClick={clearFilters}>
          clear filters
        </button> */}
          </div>
        </Wrapper>

        <section className='product py-5 bg-ghost-white' id="products">
          <div className="container flex" style={{ paddingBottom: "2rem" }}>
            {/* <h6>Chọn số lượng hiển thị</h6> */}
            {/* <Row className='d-flex justify-content-end align-items-center' style={{ background: 'white' }}> */}
            {/* <Form.Select onChange={(e) => setPageSize(e.target.value)} style={{ width: 'auto', marginLeft:"1rem" }} aria-label="Default select example">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">Tất cả</option>
                    </Form.Select> */}
                {/* </Row> */}
            {/* </div> */}
            <div className='container'>
                <div className='product-content'>
                {loading && <Loader />}
                    <div className='product-items grid'>
                        {
                            data?.map(product => (
                                <div className='product-item bg-white' key={product.id}>
                                    <div className='product-item-img'>
                                    <NavLink to={`/products/${product.id}`} className="link">
                                        <img src={product.images[0].url} alt="" />
                                    </NavLink>
                                    <div className="product-item-cat text-white text-uppercase bg-black">
                                        <StarsProduct stars={(product.rate)} className="product-item-cat-text"/>
                                    </div>
                                    </div>
                                    <div style={{
                                    border:"2px solid black", backgroundColor:"darkgoldenrod",
                                    padding:"2px",
                                    textAlign: "center",
                                    borderRadius: "3px",
                                    justifyContent:"center",
                                    alignItems:"center"
                                    }}>
                                        <span  className='text-white fw-5'>
                                            {product.category.name}
                                        </span>
                                    </div>
                                    <div className='product-item-body'>
                                        <h6 className="product-item-title text-pine-green fw-4 fs-15">{product.name}</h6>
                                        <div className="product-item-price text-regal-blue fw-7 fs-18">{(product.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                  {/* )) */}
                {/* } */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Wrapperr>

  )
}

const Wrapperr = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 3rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 250px 1fr;
    }
  }
`;

const Wrapper = styled.section`
  .content{
    font-size: 1rem;
    font-weight: 600;
  }
  .form{
    min-width: 15rem;
    // border: 1px solid darkblue;
    padding: 10px;
    border-radius: 5px;
    padding-top:8rem;
  }
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
    :hover{
      width 2s, height 4s
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-primary-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
    
    transition: transform 500ms;
    :hover{
      transform: translateY(-10px);
    }
    
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-primary-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;


export default List
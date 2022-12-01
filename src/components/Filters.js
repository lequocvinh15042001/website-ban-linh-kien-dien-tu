import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { listCategory } from "../actions/productActions";
import { useState } from "react";
import {useNavigate} from "react-router-dom"

const Filters = () => {

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

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  const { categories } = useSelector(state => state.categoryList)
    // console.log(products);

  // const categories = getUniqueValues(allProducts, "category");
  // const companies = getUniqueValues(allProducts, "company");
  // const colors = getUniqueValues(allProducts, "colors");

  useEffect(() => {
    dispatch(listCategory())
    // refContainer.current.focus();
  }, [dispatch]);

  console.log(categories);
  let arrProductGetCateId = []

  const getProductByCategotyId = (products, id) => {
    products.forEach(product => {
      if (product.category.id === id) {
        arrProductGetCateId.push(product)
      }
    });
  }
  console.log('==', arrProductGetCateId)

  const getCategoryId = (id) => {
    arrProductGetCateId.length = 0
    getProductByCategotyId(products.data?.list, id)
    setData(arrProductGetCateId)
    setShowAll(false)
    navigate(`/products#${id}`)
    window.location.href = `#${id}`
    // console.log('==', id)
  }

  return (
    <Wrapper>
      <div className="content">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          {/* <div className="form-control">
            <input
              ref={refContainer}
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              // onChange={updateFilters}
            />
          </div> */}
          <div className="form-control">
            <h5 className="content">Danh mục sản phẩm</h5>
            <div>
              {categories?.data?.map((c, index) => {
                return (
                  <button
                  onClick={() => getCategoryId(c.id)} 
                    style={{color:"darkblue", fontSize:"15px"}}
                    name="category"
                    type="button"
                    key={index}
                    className={`${
                      category === c?.name.toLowerCase() ? "active" : null
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
  );
};

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
    
    transition: transform 250ms;
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

export default Filters;

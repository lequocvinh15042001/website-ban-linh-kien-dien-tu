import React, { useEffect } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { listProducts } from "../actions/productActions";

import { useFilterContext } from "../context/filter_context";

const Sort = () => {
  const {
    // filteredProducts: products,
    gridView,
    setGridView,
    setListView,
    sort,
    updateSort,
  } = useFilterContext();
  const dispatch = useDispatch()
  
  const productList = useSelector((state) => state.productList)
  const { products } = productList

  useEffect(() => {
      dispatch(listProducts())
  }, [dispatch,])

  return (
    <Wrapper>
      {/* <div className="btn-container">
        <button
          type="button"
          onClick={setGridView}
          className={`${gridView ? "active" : null}`}
        >
          <BsFillGridFill />
        </button>
        <button
          type="button"
          onClick={setListView}
          className={`${!gridView ? "active" : null}`}
        >
          <BsList />
        </button>
      </div> */}
      <p>Có {products.data?.list?.length} sản phẩm được tìm thấy</p>
      <hr />
      <form>
        <label htmlFor="sort">Lọc theo</label>
        <select
          name="sort"
          id="sort"
          className="sort-input"
          value={sort}
          onChange={updateSort}
        >
          <option value="price-lowest">Giá (lowest)</option>
          <option value="price-highest">Giá (highest)</option>
          <option value="name-a">Tên (a-z)</option>
          <option value="name-z">Tên (z-a)</option>
        </select>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  color: var(--font);
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--font);
      color: var(--font);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-primary-6);
      color: #fff;
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--bcg);
    color: var(--font);
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
  input {
    background: var(--bcg);
    color: var(--font);
  }
`;

export default Sort;

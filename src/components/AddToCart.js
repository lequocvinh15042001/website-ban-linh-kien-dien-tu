import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";
import { addToCart } from "../actions/cartActions";
import { useDispatch } from "react-redux";

const AddToCart = ({ product }) => {
  // const { addToCart } = useCartContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { id, stock, colors } = product;
  console.log(product);
  //const [mainColor, setMainColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  //nút cộng trừ
  const increase = () => {
    setAmount((old) => {
      let temp = old + 1;
      if (temp > product.data?.quantity) temp = product.data?.quantity;
      return temp;
    });
  };
  const decrease = () => {
    setAmount((old) => {
      let temp = old - 1;
      if (temp < 1) temp = 1;
      return temp;
    });
  };

  const addToCartHandler = () => {
    //navigate(`/cart`)
    dispatch(addToCart(product.data?.id, amount))
    // console.log("-------------------", product.data?.id, amount);
    navigate(`/cart/${product.data?.id}?qty=${amount}`)
    // window.location.reload()
  }
  return (
    <Wrapper>
      {/* Đọc màu ra mà hông có */}
      {/* <div className="colors">
        <span>colors :</span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                className={`color-btn ${mainColor === color ? "active" : null}`}
                style={{ background: color }}
                onClick={() => setMainColor(color)}
              >
                {mainColor === color ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div> */}
      <div className="d-flex justify-content-between flex-wrap">
        <div className="d-flex justify-content-between align-items-center" style={{margin: '0 auto'}}>
          <h4 className="my-0 me-3">
            Số lượng: 
          </h4>
          <AmountButtons
            amount={amount}
            increase={increase}
            decrease={decrease}
          />
        </div>
        <button 
          style={{ background: '#3399ff', color: 'white', fontSize: '14px', width: 'auto', textTransform: 'none', padding: '10px 20px', margin: '10px auto' }}
          //to="/cart"
          className="btn"
          onClick={() => {
            addToCartHandler()
          }}
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
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
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
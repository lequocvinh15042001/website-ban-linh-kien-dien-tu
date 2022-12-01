import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import CartColumns from "./CartColumns";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";

import { useCartContext } from "../context/cart_context";
import { useDispatch } from "react-redux";
import { removeFormCart } from "../actions/cartActions";

const CartContent = ({cart}) => {
  // const { cart, clearCart } = useCartContext();
  const dispatch = useDispatch();
  const removeFromCartHandler = (id) => {
    dispatch(removeFormCart(id))
  }
  return (
    <Wrapper className="section section-center">
      <CartColumns />
      {cart.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <hr />

      <div className="link-container">
        <Link to="/products" className="link-btn">
          Tiếp tục mua sắm
        </Link>
        <button onClick={() => removeFromCartHandler(null)} className="link-btn clear-btn">
          Xóa
        </button>
      </div>
      <CartTotals />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;
export default CartContent;

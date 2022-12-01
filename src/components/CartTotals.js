import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";

import { formatPrice } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../actions/cartActions";
import { NavLink } from "react-router-dom";

const CartTotals = () => {
  const { totalAmount, shippingFee } = useCartContext();
  const { myUser, loginWithRedirect } = useUserContext();
  const dispatch = useDispatch()
  const userLogin = useSelector((state)=> state.userLogin)
  console.log(userLogin.userInfo);


  const {carts} = useSelector(state => state.cartList)
  // const { cartItems } = cart
  console.log('-=-=', carts)

  useEffect(() => {
      dispatch(getCart())
      //dispatch(addToCart(productId, quantity))

  }, [])
  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            Tổng loại sản phẩm : <span>{carts?.data?.totalProduct}</span>
          </h5>
          {/* <p>
            shipping fee: <span>{formatPrice(shippingFee)}</span>
          </p> */}
          <hr />
          <h4>
            Tổng tiền :<span>{carts?.data?.totalPrice}</span>
          </h4>
        </article>
        {userLogin.userInfo ? (
          <NavLink to={`/shipping/${carts?.data?.id}`}>
            <button  className="btn">
              Thanh toán
            </button>
          </NavLink>
        ) : (
          <button type="button" onClick={loginWithRedirect} className="btn">
            Đăng nhập để thanh toán
          </button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;

import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { CartContent, PageHero } from "../components";

import { useCartContext } from "../context/cart_context";
import { listProductDetails } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteProductInCart, getCart, removeFormCart } from '../actions/cartActions'
import CartItem from "../components/CartItem";
import CartColumns from "../components/CartColumns";
import CartTotals from "../components/CartTotals";


const CartPage = (id, amount) => {
  // const { cart } = useCartContext();

  let location = useLocation();
  const productId = useParams().id
  // console.log('==', productId)
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1
  // console.log('==', quantity)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {carts} = useSelector(state => state.cartList)
  // const { cartItems } = cart
  console.log('-=-=', carts)

  useEffect(() => {
      dispatch(getCart())
  }, [productId, quantity])

  const removeFromCartHandler = (id) => {
    // dispatch(deleteProductInCart(id))
  }

  if (carts?.data?.totalProduct < 1) {
    return (
      <main>
        <PageHero title="cart" />
        <Wrapper className="page">
          <div className="empty">
            <br />
            <br />
            <h2>Không có sản phẩm được thêm :(</h2> <br />
            <Link to="/products" className="btn">
              Tiếp tục mua sắm
            </Link>
          </div>
        </Wrapper>
      </main>
    );
  }

  return (
    <main>
      <PageHero title="cart" />
      <Wrapper className="page section section-center">
        {/* <CartContent cart={cartItems}/> */}
        {/* <Wrapper className="section section-center"> */}
          <CartColumns />
          {carts?.data?.items?.map((item) => {
            return <CartItem key={item.itemId} {...item} />;
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
          <CartTotals/>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
  }
`;

export default CartPage;

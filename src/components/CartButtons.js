import React from "react";
import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useProductsContext } from "../context/products_context";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";

import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";

const CartButtons = ({userInfo}) => {
  const { closeSidebar } = useProductsContext();
  const { totalItems, clearCart } = useCartContext();
  const { loginWithRedirect, myUser, logout } = useUserContext();

  console.log(totalItems);
  console.log(userInfo);

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  console.log('==', cartItems)

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
    window.location.reload()
}

  const renderMenuControl = () => {
    if (
        userInfo?.role === "role_admin"
    ) {
        return (
            <LinkContainer to='/admin/userlist'>
                <NavDropdown.Item>Trang Admin</NavDropdown.Item>
            </LinkContainer>
        );
    } else {
        return null;
    }
};

  return (
    <Wrapper className="cart-btn-wrapper">
      <Link to="/cart" className="cart-btn" onClick={closeSidebar}>
        Cart
        <span className="cart-container">
          <FaShoppingCart />
          {/* Này làm cái cộng lại nha */}
          <span className="cart-value">10</span>         
           {/* <span className="cart-value">{cartItems[0].count + cartItems[1].count}</span> */}
        </span>
      </Link>
      {userInfo ? (
        <button
          onClick={() => {
            clearCart();
            logout({ returnTo: window.location.origin });
          }}
          type="button"
          className="auth-btn"
        >
          Logout <FaUserMinus />
        </button>
      ) : (
        <button onClick={loginWithRedirect} type="button" className="auth-btn">
          Login <FaUserPlus />
        </button>
      )}
      {userInfo ? (
          <NavDropdown title={`Xin chào, ${userInfo.name}`} id='nav-dropdown'>
              {renderMenuControl()}
              <LinkContainer to='/profile'>
                  <NavDropdown.Item>Thông tin</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/changepassword'>
                  <NavDropdown.Item>Đổi mật khẩu</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>Đăng xuất</NavDropdown.Item>
          </NavDropdown>
      ) : <LinkContainer to='/login'>
          <Nav.Link className='text-primary'>
              <i className='fas fa-user'></i> Đăng nhập
          </Nav.Link>
        </LinkContainer>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;
export default CartButtons;

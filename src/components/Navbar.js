import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";

import logo from "../assets/logo.svg";
import logoDark from "../assets/logo-dark.svg";
import { links } from "../utils/constants";
import CartButtons from "./CartButtons";

import { useThemeContext } from "../context/theme_context";
import { useProductsContext } from "../context/products_context";
import { useUserContext } from "../context/user_context";
import ThemeChange from './ThemeChange';
import Search from './Search';


const Nav = () => {
  const { theme } = useThemeContext();

  const { openSidebar } = useProductsContext();
  const { myUser } = useUserContext();

  // const navigate = useNavigate();
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  console.log(userInfo);

  return (
    <>
      <NavContainer>
        <div className="nav-center">
          <div className="nav-header">
            {theme === "light-theme" ? (
              <Link to="/">
                <img src={logo} alt="nav logo" />
              </Link>
            ) : (
              <Link to="/">
                <img src={logoDark} alt="nav logo" />
              </Link>
            )}
            <button onClick={openSidebar} type="button" className="nav-toggle">
              <FaBars />
            </button>
          </div>
          <Search />
          <ul className="nav-links">
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <Link to={url}>{text}</Link>
                </li>
              );
            })}
            {userInfo && (
              <>
                <li>
                  <Link to="/history">history</Link>
                </li>
                <li>
                  <Link to="/scan">scan</Link>
                </li>
              </>
            )}
          </ul>
          <CartButtons userInfo={userInfo} />
        </div>
      </NavContainer>
    </>
  );
};

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    height: 5rem;
    margin: 0 auto;
    max-width: var(--max-width);
    position: fixed;
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      // margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    margin-right:15px;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      z-index:9999;
      background-color: white;
      border-radius: 3px;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 0.75rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.75rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`;

export default Nav;

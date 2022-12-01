import React from "react";
import styled from "styled-components";

import { formatPrice } from "../utils/helpers";

const HistoryItem = ({ id, items, state, totalPrice, totalProduct, receiveOrder,createdDate}) => {
  const today = new Date();

  console.log("hehe:", id, items, state, totalPrice, totalProduct, receiveOrder,createdDate  );

  if (state !== "in cart")
  {
  return (
    <Wrapper>
      <div className="title">
        {
          items.map(product => {
            return(
              <div className="image-item">
                <img src={product.image[0].url} /> 
                <h5 className="name">{product.name}</h5>
              </div>
              // <h5 className="name">{product.name}</h5>
            )

          })
        }
        <div>
          <p className="name">
            Address:<span>
            {receiveOrder.receiveName},
            {receiveOrder.receivePhone},
            {receiveOrder.receiveVillage},
            {receiveOrder.receiveDistrict},
            {receiveOrder.receiveProvince},
            {receiveOrder.receiveAddress},
            {receiveOrder.paymentType}.
            </span>
          </p>  
          <p style={{ marginBottom: "0px" }}>
            Quantity: <span>{totalProduct}</span>
          </p>

          <h5 className="price-small">price: {totalPrice}</h5>
        </div>
      </div>
      <h5 className="price">{totalPrice}</h5>

      {/* <h5 className="subtotal">{` ${today.getDate()} ${
        today.getMonth() + 1
      } ,${today.getFullYear()}`}</h5> */}
       <h5 className="subtotal">{createdDate}</h5>
    </Wrapper>
  );
    }else return null;
};

const Wrapper = styled.article`
.image-item{
    width: 60px;
    display: flex;
    position: relative;
}
  .subtotal {
    display: none;
  }
  .price {
    display: none;
  }
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .title {
    height: 100%;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }

  .color {
    color: darkblue;
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: var(--radius);
    }
  }
  .price-small {
    color: var(--clr-primary-5);
  }
  .amount-btns {
    width: 75px;
    button {
      width: 1rem;
      height: 0.5rem;
      font-size: 0.75rem;
    }
    h2 {
      font-size: 1rem;
    }
  }
  .remove-btn {
    color: var(--clr-white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }
  @media (max-width: 775px) {
    .title {
      margin-left: 40px;
    }
  }
  @media (min-width: 776px) {
    .hidelarge {
      display: none;
    }
    .subtotal {
      display: block;
      margin-bottom: 0;
      color: var(--clr-grey-5);
      font-weight: 400;
      font-size: 1rem;
    }
    .price-small {
      display: none;
    }
    .price {
      display: block;
      font-size: 1.2rem;
      color: var(--clr-primary-5);
      font-weight: 400;
      margin-left: -10px;
    }
    .name {
      font-size: 0.85rem;
    }
    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    grid-template-columns: 340px 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;
    img {
      height: 100%;
    }
    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
    .amount-btns {
      width: 100px;
      button {
        width: 1.5rem;
        height: 1rem;
        font-size: 1rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
  }
`;

export default HistoryItem;

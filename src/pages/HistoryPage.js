import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { HistoryContent, PageHero, Loading } from "../components";
import firebase from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../actions/cartActions";
import { getOrder } from "../actions/orderActions";
import HistoryContent2 from "../components/HistoryContent2";

// const history = {
//   "isSuccess": "true",
//   "message": "Get order success",
//   "data": {
//       "id": "63736adb196bfa2faf22bc76",
//       "userId": "6358b5c98a8e064b4bae617c",
//       "userName": "Vinh_ADMIN",
//       "totalProduct": 1,
//       "totalPrice": 46000,
//       "items": [
//           {
//               "itemId": "63736adb196bfa2faf22bc77",
//               "name": "Nguồn 5V",
//               "image": [
//                   {
//                       "imageId": "bf7d37a2-e5af-4b2d-9734-c7e5dbd1946b",
//                       "url": "https://res.cloudinary.com/dnqm1rkqr/image/upload/v1667728653/Electronic/w9shugyjn5rarkpiqmv0.jpg"
//                   },
//                   {
//                       "imageId": "7d3e100f-aaa8-4ec2-bf41-019bc23f2455",
//                       "url": "https://res.cloudinary.com/dnqm1rkqr/image/upload/v1667728655/Electronic/dzlciutydz5d3tzik1yl.jpg"
//                   }
//               ],
//               "price": 46000,
//               "quantity": 2
//           }
//       ],
//       "state": "process",
//       "receiveOrder": {
//           "receiveName": "sdad",
//           "receivePhone": "d3213231",
//           "receiveAddress": "ádsad",
//           "receiveProvince": "dấd",
//           "receiveDistrict": "đasad",
//           "receiveVillage": "dsadsad",
//           "paymentType": "Tiền mặt"
//       },
//       "createdDate": "15/11/2022 17:33:18"
//   }
// }



const HistoryPage = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  // const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true)
  const [myorder, setMyOrder] = useState([])

  const order = useSelector(state => state.orderList)

  const history = order.orders

  const orderList = history?.data

  console.log("lấy được rồi:", orderList)

  useEffect(() => {
    dispatch(getOrder());
    // setHistory(carts);
    setLoading(false);
  }, []);



  // const {carts} = useSelector(state => state.cartList)
  // const {orderItems} = useSelector (state => state.orderItems)
  // // const { cartItems } = cart
  // console.log('order list', carts)
  // console.log("order: ", orderItems);

  // console.log("đã order: ", orderList);

  const arrOrder = []
  const checkOrrder = () => {
    orderList?.list?.forEach(item => {
      if (item.state !== 'in cart') {
        arrOrder.push(item)
      }
    });
  }
  checkOrrder()

  console.log("đã order: ", arrOrder);

  if (loading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  if (orderList?.list?.length < 1) {
    return (
      <main>
        <PageHero title="history" />
        <Wrapper className="page">
          <div className="empty">
            <br />
            <br />
            <h2>No purchase history :(</h2> <br />
            <Link to="/products" className="btn">
              continue shopping
            </Link>
          </div>
        </Wrapper>
      </main>
    );
  }

  return (
    <main>
      <PageHero title="history" />
      <Wrapper className="page">
        <HistoryContent2 history={arrOrder} />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
  }
`;

export default HistoryPage;

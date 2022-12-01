import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD, CART_LIST_REQUEST, CART_LIST_SUCCESS, CART_LIST_FAIL, CART_DELETE_REQUEST, CART_DELETE_SUCCESS, CART_DELETE_FAIL, SHIPPING_ADD_REQUEST } from "../constants/cartsConstants";

export const addToCart = (productId, quantity) => async(dispatch, getState) => {

    console.log('số lượng mới: ',quantity);
    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.accessToken}`,
        }
    }

    console.log(config);
    const {data} = await axios.post(`http://localhost:8080/api/cart`,{productId,quantity}, config)
    console.log('Cart mới cập nhật: ', data);

    // dispatch({
    //     type: CART_ADD_ITEM,
    //     payload: {
    //         product: data.data?.id,
    //         name: data.data?.name,  
    //         image: data.data?.images[0]?.url,
    //         price: data.data?.price,
    //         quantity: data.data?.quantity,
    //         //count
    //     }
    // })

    // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// export const getCart = () => async(dispatch, getState) => {

//     const {
//         userLogin: { userInfo },
//     } = getState()

//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${userInfo.accessToken}`,
//         }
//     }

//     console.log(config);
//     const {data} = await axios.get(`http://localhost:8080/api/cart`, config)
//     console.log('==', data);

//     // dispatch({
//     //     type: CART_ADD_ITEM,
//     //     payload: {
//     //         product: data.data?.id,
//     //         name: data.data?.name,  
//     //         image: data.data?.images[0]?.url,
//     //         price: data.data?.price,
//     //         quantity: data.data?.quantity,
//     //         //count
//     //     }
//     // })

//     // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
// }
export const getCart = () => async (dispatch, getState) => {
    try {

        const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.accessToken}`,
        }
    }
      dispatch({ type: CART_LIST_REQUEST })
  
      const { data } = await axios.get(`http://localhost:8080/api/cart`, config)
  
      dispatch({
        type: CART_LIST_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: CART_LIST_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
    }
  }
  
  export const deleteProductInCart = (id, navigate) => async (dispatch, getState) => {
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.accessToken}`,
        }
      }
  
      await axios.delete(`http://localhost:8080/api/cart/remove/${id}`, config)
      navigate('/cart')
  }
  
  export const addShippingToCart = (id, {shipping}) => async(dispatch, getState) => {
    console.log(id);
    console.log(shipping);

    console.log(id);
    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.accessToken}`,
        }
    }

    console.log(config);
    const {data} = await axios.post(`http://localhost:8080/api/cart/addshipping/${id}`, shipping, config)
    console.log('==', data);
    dispatch({
        type: SHIPPING_ADD_REQUEST,
        payload: data
      })
}  

export const removeFormCart = (_id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: _id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
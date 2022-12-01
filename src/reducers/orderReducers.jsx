import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_CREATE_RESET,
  ORDER_ALL_REQUEST,
  ORDER_ALL_SUCCESS,
  ORDER_ALL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_SET_DELEVERY_REQUEST,
  ORDER_SET_DELEVERY_SUCCESS,
  ORDER_SET_DELEVERY_FAIL,
  ORDER_SET_PAID_REQUEST,
  ORDER_SET_PAID_SUCCESS,
  ORDER_SET_PAID_FAIL,
  SHIPPER_ORDER_ALL_PROCESS_REQUEST,
  SHIPPER_ORDER_ALL_PROCESS_SUCCESS,
  SHIPPER_ORDER_ALL_PROCESS_FAIL,
  SHIPPER_ORDER_ALL_STATE_REQUEST,
  SHIPPER_ORDER_ALL_STATE_SUCCESS,
  SHIPPER_ORDER_ALL_STATE_FAIL,
  SHIPPER_ORDER_CHOOSE_REQUEST,
  SHIPPER_ORDER_CHOOSE_SUCCESS,
  SHIPPER_ORDER_CHOOSE_FAIL,
  SHIPPER_ORDER_PAID_REQUEST,
  SHIPPER_ORDER_PAID_SUCCESS,
  SHIPPER_ORDER_PAID_FAIL,
  SHIPPER_ORDER_CANCEL_REQUEST,
  SHIPPER_ORDER_CANCEL_SUCCESS,
  SHIPPER_ORDER_CANCEL_FAIL,
  SHIPPER_ORDER_DETAIL_REQUEST,
  SHIPPER_ORDER_DETAIL_SUCCESS,
  SHIPPER_ORDER_DETAIL_FAIL,
  ORDER_LIST_DETAIL_REQUEST,
  ORDER_LIST_DETAIL_SUCCESS,
  ORDER_LIST_DETAIL_FAIL,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
  ORDER_PROFIT_REQUEST,
  ORDER_PROFIT_SUCCESS,
  ORDER_PROFIT_FAIL,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { loading: true, orders: [] }
    case GET_ORDER_SUCCESS:
      return { loading: false, orders: action.payload }
    case GET_ORDER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const cancelOrderReducer = (state = { }, action) => {
  switch (action.type) {
    case CANCEL_ORDER_REQUEST:
      return { loading: true }
    case CANCEL_ORDER_SUCCESS:
      return { loading: false, success: action.payload }
    case CANCEL_ORDER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//Vinh
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_LIST_MY_RESET:
      return { orders: [] }
    default:
      return state
  }
}

// Admin - Order
export const orderAllReducer = (state = { orderAll: [] }, action) => {
  switch (action.type) {
    case ORDER_ALL_REQUEST:
      return {
        loading: true,
      }
    case ORDER_ALL_SUCCESS:
      return {
        loading: false,
        orderAll: action.payload,
      }
    case ORDER_ALL_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderListAdminReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderListDetailAdminReducer = (state = { orderState: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_DETAIL_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_DETAIL_SUCCESS:
      return {
        loading: false,
        orderState: action.payload,
      }
    case ORDER_LIST_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderDetailAdminReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderSetDeliveryReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_SET_DELEVERY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_SET_DELEVERY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_SET_DELEVERY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderSetPaidReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_SET_PAID_REQUEST:
      return {
        loading: true,
      }
    case ORDER_SET_PAID_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_SET_PAID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderProfitReducer = (state = { profit: [] }, action) => {
  switch (action.type) {
    case ORDER_PROFIT_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PROFIT_SUCCESS:
      return {
        loading: false,
        profit: action.payload,
        success: true
      }
    case ORDER_PROFIT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

//---------------------------------------------SHIPPER----------------------------------------------//
// Get all order PROCESS
export const orderProcessListShipperReducer = (state = { orderProcess: [] }, action) => {
  switch (action.type) {
    case SHIPPER_ORDER_ALL_PROCESS_REQUEST:
      return {
        loading: true,
      }
    case SHIPPER_ORDER_ALL_PROCESS_SUCCESS:
      return {
        loading: false,
        orderProcess: action.payload,
      }
    case SHIPPER_ORDER_ALL_PROCESS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

// Get all order By shipper
export const orderListShipperReducer = (state = { orderAllShipper: [] }, action) => {
  switch (action.type) {
    case SHIPPER_ORDER_ALL_STATE_REQUEST:
      return {
        loading: true,
      }
    case SHIPPER_ORDER_ALL_STATE_SUCCESS:
      return {
        loading: false,
        orderAllShipper: action.payload,
      }
    case SHIPPER_ORDER_ALL_STATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

// Choose order By shipper
export const chooseOrderByShipperReducer = (state = { }, action) => {
  switch (action.type) {
    case SHIPPER_ORDER_CHOOSE_REQUEST:
      return {
        loading: true,
      }
    case SHIPPER_ORDER_CHOOSE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      }
    case SHIPPER_ORDER_CHOOSE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

// Paid order By shipper
export const paidOrderByShipperReducer = (state = { }, action) => {
  switch (action.type) {
    case SHIPPER_ORDER_PAID_REQUEST:
      return {
        loading: true,
      }
    case SHIPPER_ORDER_PAID_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      }
    case SHIPPER_ORDER_PAID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

// Cancel order By shipper
export const cancelOrderByShipperReducer = (state = { }, action) => {
  switch (action.type) {
    case SHIPPER_ORDER_CANCEL_REQUEST:
      return {
        loading: true,
      }
    case SHIPPER_ORDER_CANCEL_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      }
    case SHIPPER_ORDER_CANCEL_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

// Cancel order By shipper
export const detailOrderByShipperReducer = (state = { orderDetail: {}}, action) => {
  switch (action.type) {
    case SHIPPER_ORDER_DETAIL_REQUEST:
      return {
        loading: true,
      }
    case SHIPPER_ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        orderDetail: action.payload,
      }
    case SHIPPER_ORDER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
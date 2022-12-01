import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD, CART_LIST_REQUEST, CART_LIST_SUCCESS, CART_LIST_FAIL } from '../constants/cartsConstants'

export const cartReducer = (state = { cartItems: [], shippingAddress: {}, paymentMethod: '' }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            const existItem = state.cartItems.find(x => x.product === item.product)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        default:
            return state
    }
}

export const cartListReducer = (state = { carts: [] }, action) => {
    switch (action.type) {
      case CART_LIST_REQUEST:
        return { loading: true, carts: [] }
      case CART_LIST_SUCCESS:
        return { loading: false, carts: action.payload }
      case CART_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
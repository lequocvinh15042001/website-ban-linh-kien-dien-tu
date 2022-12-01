import {
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_GET_REVIEW_REQUEST,
  PRODUCT_GET_REVIEW_SUCCESS,
  PRODUCT_GET_REVIEW_FAIL,
  PRODUCT_LIST_ADMIN_REQUEST,
  PRODUCT_LIST_ADMIN_SUCCESS,
  PRODUCT_LIST_ADMIN_FAIL,
  PRODUCT_ALL_REQUEST,
  PRODUCT_ALL_SUCCESS,
  PRODUCT_ALL_FAIL,
  PRODUCT_LOCK_REQUEST,
  PRODUCT_LOCK_SUCCESS,
  PRODUCT_LOCK_FAIL,
  PRODUCT_UNLOCK_REQUEST,
  PRODUCT_UNLOCK_SUCCESS,
  PRODUCT_UNLOCK_FAIL,
  ADMIN_GET_ALL_REVIEW_REQUEST,
  ADMIN_GET_ALL_REVIEW_SUCCESS,
  ADMIN_GET_ALL_REVIEW_FAIL,
  REVIEW_LOCK_REQUEST,
  REVIEW_LOCK_FAIL,
  REVIEW_UNLOCK_REQUEST,
  REVIEW_UNLOCK_SUCCESS,
  REVIEW_UNLOCK_FAIL,
  REVIEW_LOCK_SUCCESS
} from '../constants/productConstants'
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from '../constants/productConstants'
import { PRODUCT_CATEGORY_REQUEST, PRODUCT_CATEGORY_SUCCESS, PRODUCT_CATEGORY_FAIL } from '../constants/productConstants'

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_REQUEST:
      return { loadings: true, categories: [] }
    case PRODUCT_CATEGORY_SUCCESS:
      return { loadings: false, categories: action.payload }
    case PRODUCT_CATEGORY_FAIL:
      return { loadings: false, errors: action.payload }
    default:
      return state
  }
}

// Admin
export const productAllAdminReducer = (state = { productAll: [] }, action) => {
  switch (action.type) {
    case PRODUCT_ALL_REQUEST:
      return { loading: true, productAll: [] }
    case PRODUCT_ALL_SUCCESS:
      return { loading: false, productAll: action.payload }
    case PRODUCT_ALL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productListAdminReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_ADMIN_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_ADMIN_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_ADMIN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getReviewReducer = (
  state = { reviews: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_GET_REVIEW_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_GET_REVIEW_SUCCESS:
      return { loading: false, reviews: action.payload }
    case PRODUCT_GET_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//Admin
export const productLockReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_LOCK_REQUEST:
      return { loading: true }
    case PRODUCT_LOCK_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_LOCK_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productUnlockReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UNLOCK_REQUEST:
      return { loading: true }
    case PRODUCT_UNLOCK_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_UNLOCK_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_UPDATE_RESET:
      return { product: {} }
    default:
      return state
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true, comment: action.payload }
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//Admin review
export const reviewAllAdminReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ADMIN_GET_ALL_REVIEW_REQUEST:
      return { loading: true, reviews: [] }
    case ADMIN_GET_ALL_REVIEW_SUCCESS:
      return { loading: false, reviews: action.payload }
    case ADMIN_GET_ALL_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const reviewLockReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_LOCK_REQUEST:
      return { loading: true }
    case REVIEW_LOCK_SUCCESS:
      return { loading: false, success: true }
    case REVIEW_LOCK_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const reviewUnlockReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_UNLOCK_REQUEST:
      return { loading: true }
    case REVIEW_UNLOCK_SUCCESS:
      return { loading: false, success: true }
    case REVIEW_UNLOCK_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
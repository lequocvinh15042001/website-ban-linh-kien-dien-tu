import { BLOCK_CATEGORY_ADMIN_FAIL, BLOCK_CATEGORY_ADMIN_REQUEST, BLOCK_CATEGORY_ADMIN_SUCCESS, CREATE_CATEGORY_ADMIN_FAIL, CREATE_CATEGORY_ADMIN_REQUEST, CREATE_CATEGORY_ADMIN_RESET, CREATE_CATEGORY_ADMIN_SUCCESS, PRODUCT_CATEGORY_ADMIN_FAIL, PRODUCT_CATEGORY_ADMIN_REQUEST, PRODUCT_CATEGORY_ADMIN_SUCCESS, PRODUCT_CATEGORY_DETAIL_ADMIN_FAIL, PRODUCT_CATEGORY_DETAIL_ADMIN_REQUEST, PRODUCT_CATEGORY_DETAIL_ADMIN_SUCCESS, UNLOCK_CATEGORY_ADMIN_FAIL, UNLOCK_CATEGORY_ADMIN_REQUEST, UNLOCK_CATEGORY_ADMIN_SUCCESS } from '../constants/productConstants'

export const categoryListAdminReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case PRODUCT_CATEGORY_ADMIN_REQUEST:
            return { loading: true, categories: [] }
        case PRODUCT_CATEGORY_ADMIN_SUCCESS:
            return { loading: false, categories: action.payload }
        case PRODUCT_CATEGORY_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const categoryDetailsReducer = (
    state = { category: {} },
    action
  ) => {
    switch (action.type) {
      case PRODUCT_CATEGORY_DETAIL_ADMIN_REQUEST:
        return { ...state, loading: true }
      case PRODUCT_CATEGORY_DETAIL_ADMIN_SUCCESS:
        return { loading: false, category: action.payload }
      case PRODUCT_CATEGORY_DETAIL_ADMIN_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

export const blockCategoryReducer = (state = {}, action) => {
    switch (action.type) {
      case BLOCK_CATEGORY_ADMIN_REQUEST:
        return { loading: true }
      case BLOCK_CATEGORY_ADMIN_SUCCESS:
        return { loading: false, success: true }
      case BLOCK_CATEGORY_ADMIN_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const unlockCategoryReducer = (state = {category: {}}, action) => {
    switch (action.type) {
      case UNLOCK_CATEGORY_ADMIN_REQUEST:
        return { loading: true }
      case UNLOCK_CATEGORY_ADMIN_SUCCESS:
        return { loading: false, success: true, category: action.payload }
      case UNLOCK_CATEGORY_ADMIN_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const createCategoryReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_CATEGORY_ADMIN_REQUEST:
        return { loading: true }
      case CREATE_CATEGORY_ADMIN_SUCCESS:
        return { loading: false, success: true, category: action.payload }
      case CREATE_CATEGORY_ADMIN_FAIL:
        return { loading: false, error: action.payload }
      case CREATE_CATEGORY_ADMIN_RESET:
        return {}
      default:
        return state
    }
  }
  
//   export const categoryUpdateReducer = (state = { category: {} }, action) => {
//     switch (action.type) {
//       case CATEGORY_UPDATE_REQUEST:
//         return { loading: true }
//       case CATEGORY_UPDATE_SUCCESS:
//         return { loading: false, success: true, category: action.payload }
//       case CATEGORY_UPDATE_FAIL:
//         return { loading: false, error: action.payload }
//       case CATEGORY_UPDATE_RESET:
//         return { category: {} }
//       default:
//         return state
//     }
//   }
  
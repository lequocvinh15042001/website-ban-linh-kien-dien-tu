import {
  USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_CHANGEPASSWORD_REQUEST, USER_CHANGEPASSWORD_SUCCESS, USER_CHANGEPASSWORD_FAIL, USER_FORGOTPASSWORD_REQUEST, USER_FORGOTPASSWORD_SUCCESS, USER_FORGOTPASSWORD_FAIL, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,

  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_UNLOCK_REQUEST,
  USER_UNLOCK_SUCCESS,
  USER_UNLOCK_FAIL,
  USER_ALL_REQUEST,
  USER_ALL_SUCCESS,
  USER_ALL_FAIL,
  SHIPPER_REGISTER_REQUEST,
  SHIPPER_REGISTER_SUCCESS,
  SHIPPER_REGISTER_FAIL,
  USER_LIST_DETAIL_REQUEST,
  USER_LIST_DETAIL_SUCCESS,
  USER_LIST_DETAIL_FAIL,
  SHIPPER_VERIFY_REGISTER_REQUEST,
  SHIPPER_VERIFY_REGISTER_SUCCESS,
  SHIPPER_VERIFY_REGISTER_FAIL,
  USER_NEW_PASSWORD_REQUEST,
  USER_NEW_PASSWORD_SUCCESS,
  USER_NEW_PASSWORD_FAIL,

} from "../constants/userConstants"

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload.data }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CHANGEPASSWORD_REQUEST:
      return { loading: true }
    case USER_CHANGEPASSWORD_SUCCESS:
      return { loading: false, userChangePass: action.payload }
    case USER_CHANGEPASSWORD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOTPASSWORD_REQUEST:
      return { loading: true }
    case USER_FORGOTPASSWORD_SUCCESS:
      return { loading: false, userForgotPass: action.payload }
    case USER_FORGOTPASSWORD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//Admin
export const userAllAdminReducer = (state = { userAll: [] }, action) => {
  switch (action.type) {
    case USER_ALL_REQUEST:
      return { loading: true, userAll: [] }
    case USER_ALL_SUCCESS:
      return { loading: false, userAll: action.payload }
    case USER_ALL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

export const userListDetailReducer = (state = { userDetail: [] }, action) => {
  switch (action.type) {
    case USER_LIST_DETAIL_REQUEST:
      return { loading: true }
    case USER_LIST_DETAIL_SUCCESS:
      return { loading: false, userDetail: action.payload }
    case USER_LIST_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUnlockReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UNLOCK_REQUEST:
      return { loading: true }
    case USER_UNLOCK_SUCCESS:
      return { loading: false, success: true }
    case USER_UNLOCK_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}

// sHIPPER register
export const shipperRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case SHIPPER_REGISTER_REQUEST:
      return { loading: true }
    case SHIPPER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case SHIPPER_REGISTER_FAIL:
      return { loading: false, error: action.payload.message }
    default:
      return state
  }
}

export const verifyShipperRegisterReducer = (state = { verify: {} }, action) => {
  switch (action.type) {
    case SHIPPER_VERIFY_REGISTER_REQUEST:
      return { loading: true }
    case SHIPPER_VERIFY_REGISTER_SUCCESS:
      return { loading: false, success: true, verify: action.payload }
    case SHIPPER_VERIFY_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const newPassworsAfterForgotReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_NEW_PASSWORD_REQUEST:
      return { loading: true }
    case USER_NEW_PASSWORD_SUCCESS:
      return { loading: false, success: true }
    case USER_NEW_PASSWORD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
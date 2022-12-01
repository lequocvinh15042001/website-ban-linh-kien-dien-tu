import {
  USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
  USER_CHANGEPASSWORD_REQUEST, USER_CHANGEPASSWORD_SUCCESS, USER_CHANGEPASSWORD_FAIL, USER_FORGOTPASSWORD_REQUEST, USER_FORGOTPASSWORD_SUCCESS, USER_FORGOTPASSWORD_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,

  USER_DETAILS_RESET,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
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
  SHIPPER_VERIFY_REGISTER_FAIL,
  SHIPPER_VERIFY_REGISTER_SUCCESS,
  USER_NEW_PASSWORD_REQUEST,
  USER_NEW_PASSWORD_SUCCESS,
  USER_NEW_PASSWORD_FAIL,
} from "../constants/userConstants";

import axios from 'axios'
import { data } from "@tensorflow/tfjs";

// Login
export const login = (user) => async (dispatch) => {
  console.log(user);
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const { data } = await axios.post('http://localhost:8080/api/auth/login', user, config)
    console.log('==', data);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data.data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.error ? error.response.data.error : error.error,
    })
  }
}

// Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}

// Register
export const register = (name, email, password, phone, address) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      }
    }

    const { data } = await axios.post('http://localhost:8080/api/auth/registermail', { name, email, password, phone, address }, config)
    console.log('==register', data)

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    // localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.error ? error.response.data.error : error.error,
    })
  }
}

//user Detail
export const getUserDetails = (id) => async (dispatch, getState) => {
  console.log('==', id)
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`
      }
    }
    // console.log('==', userInfo)

    const { data } = await axios.get(`http://localhost:8080/api/users/${id}`, config)
    // console.log('==', data)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

//Update Info
export const updateUserProfile = (id, user) => async (dispatch, getState) => {
  // console.log('==', user)
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`
      }
    }

    const { data } = await axios.put(`http://localhost:8080/api/users/${id}`, user, config)
    console.log('===', data)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

// Change Password
export const changePassword = (id, newpass, oldpass) => async (dispatch, getState) => {
  console.log('==123', newpass)
  console.log('==456', oldpass)
  try {
    dispatch({
      type: USER_CHANGEPASSWORD_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`
      }
    }

    const { data } = await axios.put(`http://localhost:8080/api/users/password/${id}`, { newpass, oldpass }, config)

    dispatch({
      type: USER_CHANGEPASSWORD_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_CHANGEPASSWORD_FAIL,
      payload: error.response && error.response.data.error ? error.response.data.error : error.response.data.message,
    })
    console.log('==', error.response);
  }
}

// Forgot Password
export const getOTP = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FORGOTPASSWORD_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post(`http://localhost:8080/api/auth/getotp?email=${email}`, config)

    dispatch({
      type: USER_FORGOTPASSWORD_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_FORGOTPASSWORD_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

//Admin
// Get All User
export const getAllUsersAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ALL_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.get('http://localhost:8080/api/admin/manage/get/users', config)

    dispatch({
      type: USER_ALL_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_ALL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

// Get User Page
export const listUsers = (page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }
    console.log(page);
    const { data } = await axios.get(`http://localhost:8080/api/admin/manage/users?page=${page}`, config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    })
  }
}

// Get user list state
export const detailStateUserAdmin = (role, page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_DETAIL_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.get(`http://localhost:8080/api/admin/manage/getrole/users?role=${role}&page=${page}`, config)

    dispatch({
      type: USER_LIST_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_LIST_DETAIL_FAIL,
      payload: message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    await axios.delete(`http://localhost:8080/api/admin/manage/users/${id}`, config)

    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    })
  }
}

export const unlockUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UNLOCK_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    var config = {
      method: 'put',
      url: `http://localhost:8080/api/admin/manage/users/unblockuser/${id}`,
      headers: {
        'Authorization': `Bearer ${userInfo.accessToken}`
      }
    };

    axios(config)
      .then(function (response) {
        dispatch({
          type: USER_UNLOCK_SUCCESS,
          payload: response.data
        })
      })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.put(`http://localhost:8080/api/users/${user.id}`, user, config)

    dispatch({ type: USER_UPDATE_SUCCESS })

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })

    dispatch({ type: USER_DETAILS_RESET })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    })
  }
}

// Shipper
// Register
export const registerShipper = (name, email, password, phone, address) => async (dispatch) => {
  try {
    dispatch({
      type: SHIPPER_REGISTER_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      }
    }

    const { data } = await axios.post('http://localhost:8080/api/auth/registermail/shipper', { name, email, password, phone, address }, config)
    // console.log('==register', data)

    dispatch({
      type: SHIPPER_REGISTER_SUCCESS,
      payload: data
    })

    // localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: SHIPPER_REGISTER_FAIL,
      payload: error?.response?.data
    })
  }
}

// Register
export const verifyRegisterShipper = (user) => async (dispatch) => {
  console.log('===', user.otp, user.email)
  try {
    dispatch({
      type: SHIPPER_VERIFY_REGISTER_REQUEST
    })

    var data = JSON.stringify({
      "otp": user.otp,
      "email": user.email,
      "type": user.type
    });

    var config = {
      method: 'post',
      url: 'http://localhost:8080/api/auth/verify',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      dispatch({
        type: SHIPPER_VERIFY_REGISTER_SUCCESS,
        payload: response.data
      })
      .catch(function (error) {
        dispatch({
          type: SHIPPER_VERIFY_REGISTER_FAIL,
          payload: error
        })
      });
    })

  } catch (error) {
    dispatch({
      type: SHIPPER_VERIFY_REGISTER_FAIL,
      payload: error
    })
  }
}


// Set new password after forgot password
export const newPassworsAfterForgot = (resetPass) => async (dispatch) => {
  console.log('===', resetPass)
  try {
    dispatch({
      type: USER_NEW_PASSWORD_REQUEST
    })

    var data = JSON.stringify({
      "resetpass": resetPass.resetpass
    });

    var config = {
      method: 'put',
      url: `http://localhost:8080/api/users/resetpassword/${resetPass?.id}`,
      headers: { 
        'Authorization': `Bearer ${resetPass?.token}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      dispatch({
        type: USER_NEW_PASSWORD_SUCCESS,
        payload: response?.data
      })
      console.log('===', response?.data)
    })

  } catch (error) {
    dispatch({
      type: USER_NEW_PASSWORD_FAIL,
      payload: error?.response?.data
    })
  }
}
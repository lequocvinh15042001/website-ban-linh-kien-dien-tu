import axios from 'axios'
import { PRODUCT_CATEGORY_REQUEST, PRODUCT_CATEGORY_SUCCESS, PRODUCT_CATEGORY_FAIL, PRODUCT_GET_REVIEW_REQUEST, PRODUCT_GET_REVIEW_SUCCESS, PRODUCT_GET_REVIEW_FAIL, PRODUCT_CATEGORY_ADMIN_REQUEST, PRODUCT_CATEGORY_ADMIN_SUCCESS, PRODUCT_CATEGORY_ADMIN_FAIL, PRODUCT_CATEGORY_DETAIL_ADMIN_REQUEST, PRODUCT_CATEGORY_DETAIL_ADMIN_SUCCESS, PRODUCT_CATEGORY_DETAIL_ADMIN_FAIL, BLOCK_CATEGORY_ADMIN_REQUEST, BLOCK_CATEGORY_ADMIN_SUCCESS, BLOCK_CATEGORY_ADMIN_FAIL, UNLOCK_CATEGORY_ADMIN_REQUEST, UNLOCK_CATEGORY_ADMIN_SUCCESS, UNLOCK_CATEGORY_ADMIN_FAIL, CREATE_CATEGORY_ADMIN_REQUEST, CREATE_CATEGORY_ADMIN_FAIL, CREATE_CATEGORY_ADMIN_SUCCESS, PRODUCT_LOCK_REQUEST, PRODUCT_LOCK_SUCCESS, PRODUCT_LOCK_FAIL, PRODUCT_LIST_ADMIN_REQUEST, PRODUCT_LIST_ADMIN_SUCCESS, PRODUCT_LIST_ADMIN_FAIL, PRODUCT_ALL_REQUEST, PRODUCT_ALL_SUCCESS, PRODUCT_ALL_FAIL, PRODUCT_ADD_IMAGE_SUCCESS, PRODUCT_ADD_IMAGE_REQUEST, PRODUCT_DELETE_IMAGE_SUCCESS, PRODUCT_DELETE_IMAGE_REQUEST, PRODUCT_DELETE_IMAGE_FAIL, PRODUCT_ADD_IMAGE_FAIL, PRODUCT_UNLOCK_SUCCESS, PRODUCT_UNLOCK_FAIL, PRODUCT_UNLOCK_REQUEST, ADMIN_GET_ALL_REVIEW_REQUEST, ADMIN_GET_ALL_REVIEW_SUCCESS, ADMIN_GET_ALL_REVIEW_FAIL, REVIEW_LOCK_REQUEST, REVIEW_LOCK_SUCCESS, REVIEW_LOCK_FAIL, REVIEW_UNLOCK_REQUEST, REVIEW_UNLOCK_SUCCESS, REVIEW_UNLOCK_FAIL } from '../constants/productConstants'
import {
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from '../constants/productConstants'
import { logout } from './userActions'

export const listCategory = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CATEGORY_REQUEST })

    const { data } = await axios.get('http://localhost:8080/api/categories')

    dispatch({
      type: PRODUCT_CATEGORY_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_CATEGORY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

// Admin
export const listCategoryAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CATEGORY_ADMIN_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.get('http://localhost:8080/api/admin/manage/categories', config)

    dispatch({
      type: PRODUCT_CATEGORY_ADMIN_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_CATEGORY_ADMIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const detailCategoryAdmin = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CATEGORY_DETAIL_ADMIN_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`http://localhost:8080/api/categories/${id}`, config)

    dispatch({
      type: PRODUCT_CATEGORY_DETAIL_ADMIN_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_CATEGORY_DETAIL_ADMIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const blockCategoryAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOCK_CATEGORY_ADMIN_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.delete(`http://localhost:8080/api/admin/manage/categories/deactive/${id}`, config)

    dispatch({
      type: BLOCK_CATEGORY_ADMIN_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: BLOCK_CATEGORY_ADMIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const unlockCategoryAdmin = (id, category) => async (dispatch, getState) => {
  try {
    dispatch({ type: UNLOCK_CATEGORY_ADMIN_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.put(`http://localhost:8080/api/admin/manage/categories/${id}`, category, config)

    dispatch({
      type: UNLOCK_CATEGORY_ADMIN_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: UNLOCK_CATEGORY_ADMIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const createCategoryAdmin = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_CATEGORY_ADMIN_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.post(`http://localhost:8080/api/admin/manage/categories`, category, config)

    dispatch({
      type: CREATE_CATEGORY_ADMIN_SUCCESS,
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
      type: CREATE_CATEGORY_ADMIN_FAIL,
      payload: message,
    })
  }
}

//------------------------------------------------------------------------------------// 
export const listProducts = (page, size) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get(`http://localhost:8080/api/productelec/all?page=${page}&size=${size}`)

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getAllProductsAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_ALL_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.get('http://localhost:8080/api/admin/manage/productelec/productelec/get/all', config)

    dispatch({
      type: PRODUCT_ALL_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: PRODUCT_ALL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const listProductsAdmin = (page, size) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_ADMIN_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.get(`http://localhost:8080/api/admin/manage/productelec/productelec/all?page=${page}&size=${size}`, config)

    dispatch({
      type: PRODUCT_LIST_ADMIN_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_ADMIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const listProductDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.get(`http://localhost:8080/api/productelec/${id}`, config)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

//Admin
export const lockProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_LOCK_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    await axios.delete(`http://localhost:8080/api/admin/manage/productelec/deactive/${id}`, config)

    dispatch({
      type: PRODUCT_LOCK_SUCCESS,
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
      type: PRODUCT_LOCK_FAIL,
      payload: message,
    })
  }
}

export const unlockProduct = (id) => async (dispatch, getState) => {
  console.log('====', id);
  try {
    dispatch({ type: PRODUCT_UNLOCK_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    var config = {
      method: 'put',
      url: `http://localhost:8080/api/admin/manage/productelec/unblock/${id}`,
      headers: {
        'Authorization': `Bearer ${userInfo.accessToken}`
      }
    };

    axios(config)
      .then(function (response) {
        dispatch({
          type: PRODUCT_UNLOCK_SUCCESS,
          payload: response.data
        })
      })

  } catch (error) {
    dispatch({
      type: PRODUCT_UNLOCK_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    console.log(product);
    //console.log(config.headers.Authorization);
    const { data } = await axios.post(`http://localhost:8080/api/admin/manage/productelec/add`, product, config)

    console.log(data);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
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
      type: PRODUCT_CREATE_FAIL,
      payload: message,
    })
  }
}

export const deleteImageProduct = (image) => async (dispatch, getState) => {
  console.log('==', image.id, image.imageId);
  try {
    dispatch({
      type: PRODUCT_DELETE_IMAGE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    var data = JSON.stringify({
      "imageId": image.imageId
    });
    
    var config = {
      method: 'delete',
      url: `http://localhost:8080/api/admin/manage/productelec/deleteimages/${image.id}`,
      headers: { 
        'Authorization': `Bearer ${userInfo.accessToken}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)

    dispatch({
      type: PRODUCT_DELETE_IMAGE_SUCCESS,
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
      type: PRODUCT_DELETE_IMAGE_FAIL,
      payload: message,
    })
  }
}

export const addImageProduct = (id, image) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_ADD_IMAGE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    //console.log(config.headers.Authorization);
    const { data } = await axios.post(`http://localhost:8080/api/admin/manage/productelec/uploadimages/${id}`, image, config)

    console.log(data);

    dispatch({
      type: PRODUCT_ADD_IMAGE_SUCCESS,
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
      type: PRODUCT_ADD_IMAGE_FAIL,
      payload: message,
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
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
    console.log("product: ", product);
    const { data } = await axios.put(
      `http://localhost:8080/api/admin/manage/productelec/update/${product.id}`,
      product,
      config
    )

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createProductReview = (content, productId, rate) => async (
  dispatch,
  getState
) => {
  console.log('===', content, productId, rate)
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    var data = JSON.stringify({
      "content": content,
      "productId": productId,
      "rate": rate
    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:8080/api/comment',
      headers: { 
        'Authorization': `Bearer ${userInfo.accessToken}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
        payload: response.data
      })
    })

  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const listReviews = (id) => async (dispatch) => {
  console.log('==', id)
  try {
    dispatch({ type: PRODUCT_GET_REVIEW_REQUEST })

    const { data } = await axios.get(`http://localhost:8080/api/comment/${id}`)
    console.log('==', data)

    dispatch({
      type: PRODUCT_GET_REVIEW_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_GET_REVIEW_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST })

    const { data } = await axios.get(`/api/products/top`)

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Admin Review
export const getAllCommentsAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_GET_ALL_REVIEW_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.get('http://localhost:8080/api/admin/manage/comment/findall', config)
    // console.log('===', data)

    dispatch({
      type: ADMIN_GET_ALL_REVIEW_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: ADMIN_GET_ALL_REVIEW_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}


export const blockReviewAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_LOCK_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    }

    const { data } = await axios.delete(`http://localhost:8080/api/admin/manage/comment/block/${id}`, config)

    dispatch({
      type: REVIEW_LOCK_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: REVIEW_LOCK_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const unlockReviewAdmin = (id) => async (dispatch, getState) => {
  console.log('===', id)
  try {
    dispatch({ type: REVIEW_UNLOCK_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    var config = {
      method: 'put',
      url: `http://localhost:8080/api/admin/manage/comment/setenable/${id}`,
      headers: { 
        'Authorization': `Bearer ${userInfo.accessToken}`
      }
    };
    
    axios(config)
    .then(function (response) {
      dispatch({
        type: REVIEW_UNLOCK_SUCCESS,
        payload: response.data
      })
    })

  } catch (error) {
    dispatch({
      type: REVIEW_UNLOCK_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
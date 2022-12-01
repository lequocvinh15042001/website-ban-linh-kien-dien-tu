import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Pagination, Modal, Form, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
  getAllProductsAdmin,
  listProductsAdmin,
  lockProduct,
  createProduct,
  listCategory,
  unlockProduct
} from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const ProductListScreen = () => {
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [message, setMessage] = useState('')

  // Add product
  const [name, setName] = useState('');
  const [description, setDescription] = useState('')
  const [price, setPtice] = useState(0)
  const [idCategory, setIdCategory] = useState('');
  const [quantity, setQuantity] = useState(0)
  const [images, setImages] = useState('')


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { categories } = useSelector(state => state.categoryList)

  const { productAll } = useSelector(state => state.productAllAdmin)

  const { loading, error, products, page } = useSelector((state) => state.productListAdmin)
  // console.log('==', productAll?.data?.length);

  const num = productAll?.data?.length

  const paginationPage = (num, pageSize) => {
    let page = 0
    if ((num / pageSize) > ((num / pageSize) - (num % pageSize) / pageSize)) {
      page = ((num / pageSize) - (num % pageSize) / pageSize + 1)
    } else if ((num % pageSize) === 0) {
      page = (num / pageSize)
    }
    return page
  }

  let pages = paginationPage(num, pageSize)

  const productDelete = useSelector((state) => state.productLock)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productUnlock = useSelector((state) => state.productUnlock)
  const {
    loading: loadingUnlock,
    error: errorUnlock,
    success: successUnlock,
  } = productUnlock

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (userInfo || userInfo.role === "role_admin") {
      dispatch(getAllProductsAdmin())
      dispatch(listProductsAdmin(pageNum - 1, pageSize))
      dispatch(listCategory())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, successUnlock, createdProduct, pageNum, pageSize])

  // Block Product
  const [show, setShow] = useState(false);
  const handleCloseBlock = () => setShow(false);
  const [idDelete, setIdDelete] = useState('')
  const handleShowBlock = (id) => {
    setShow(true);
    setIdDelete(id)
  }

  const blockHandler = (id) => {
    setShow(false);
    dispatch(lockProduct(id))
    // window.location.reload()
  }

  // Unlock user
  const [showUnlock, setShowUnlock] = useState(false);
  const handleCloseUnlock = () => setShowUnlock(false);
  const [idUnlock, setIdUnlock] = useState('')
  const handleShowUnlock = (id) => {
    setShowUnlock(true);
    setIdUnlock(id)
  }

  const unlockHandler = (id) => {
    setShowUnlock(false);
    dispatch(unlockProduct(id))
  }

  // Add product
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => {
    setIdCategory(categories?.data?.[0].id)
    setShowAdd(true);
  }

  const addHandler = () => {
    if (name.trim().length === 0 || description.trim().length === 0 || price.trim().length === 0 
    || quantity.trim().length === 0) {
      setMessage("Vui lòng điền đủ thông tin")
    } else {
      setShowAdd(false);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', idCategory);
      formData.append('quantity', quantity);
      formData.append('images', images);
      dispatch(createProduct(formData))
    }
  }




  return (
    <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px', background: '#edf1f5' }}>
      <div className='d-flex align-items-center justify-content-between flex-wrap px-4' style={{ background: 'white', width: '100%' }}>
        <div className='d-flex align-items-center justify-content-between py-4'>
          <div className='d-flex align-items-center'>
            <i className='fas fa-home'></i>
            <a href='/admin/dashboard' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Trang điều khiển</a>
          </div>
          <div className='d-flex align-items-center'>
            <i className="fas fa-chevron-right mx-2"></i>
            <a href='/admin/productlist' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Quản lý sản phẩm</a>
          </div>
        </div>
        <div className='d-flex justify-content-end py-4'>
          <Button className='my-0' style={{ background: '#03a9f3', border: 'none', fontSize: '14px', textTransform: 'none', width: 'auto' }} onClick={handleShowAdd}>
            Thêm sản phẩm
          </Button>
        </div>
      </div>
      <Row className='align-items-center mx-4 mt-4 px-4' style={{ background: 'white' }}>
        <Col className='px-0'>
          <h5 style={{ fontSize: '16px' }} className='pb-4 pt-4'>DANH SÁCH SẢN PHẨM</h5>
        </Col>
        <Col className='d-flex justify-content-end px-0'>
          <h6 style={{ fontSize: '14px' }} className='pb-4 pt-4'>Tổng số lượng: {productAll?.data?.length} sản phẩm</h6>
        </Col>
      </Row>
      <Row className='d-flex justify-content-end align-items-center mx-4 mt-0 px-4' style={{ background: 'white' }}>
        {/* <div style={{ width: 'auto', fontSize: '20px' }} className='d-flex justify-content-center align-items-center'>
          <i style={{ width: 'auto' }} className="fas fa-sort-amount-down-alt"></i>
        </div> */}
        <Form.Select onChange={(e) => setPageSize(e.target.value)} style={{ width: 'auto' }} aria-label="Default select example">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </Form.Select>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='mx-4' style={{ height: 'auto' }}>
          <Table responsive striped>
            <thead style={{ background: 'white' }}>
              <tr>
                <th>#</th>
                <th>Tên sản phẩm</th>
                <th className='text-end'>Giá bán</th>
                <th className='text-end'>Đã bán</th>
                {/* <th className='text-center'>Số diện thoại</th> */}
                <th className='text-center'>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.data?.list?.map((product, index) => (
                <tr style={{ margin: '60px 0' }} key={product.id}>
                  <td style={{ fontWeight: 'bold' }}>{index + (pageNum - 1) * pageSize + 1}</td>
                  <td>{product.name}</td>
                  <td className='text-end'>{product.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                  <td className='text-end'>{product.sold}</td>
                  <td className='text-center'>
                    {
                      (product.state === 'enable') ?
                        <div className='d-flex justify-content-center align-items-center'>
                          <p style={{ background: '#00c292', color: '#e7fff8', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 py-1 px-2'>Hoạt động</p>
                        </div> :
                        <div className='d-flex justify-content-center align-items-center'>
                          <p style={{ background: '#e46a76', color: '#e7fff8', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 py-1 px-2'>Đã khóa</p>
                        </div>
                    }
                  </td>
                  <td className='d-flex justify-content-center'>
                    <LinkContainer style={{ width: 'auto', height: 'auto' }} data-tip data-for="tip1" to={`/admin/product/${product.id}/detail`}>
                      <Button
                        disabled={product.state === 'disable' ? 'true' : ''}
                        variant='secondary' className='my-0 mx-0'>
                        <i className='fas fa-eye'></i>
                      </Button>
                    </LinkContainer>
                    <ReactTooltip id="tip1" place="top" effect="solid">
                      Chi tiết
                    </ReactTooltip>

                    <LinkContainer style={{ width: 'auto', height: 'auto' }} data-tip data-for="tip2" to={`/admin/product/${product.id}/edit`}>
                      <Button
                        disabled={product.state === 'disable' ? 'true' : ''}
                        style={{ background: '#03a9f3' }}
                        className='my-0 mx-2'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <ReactTooltip id="tip2" place="top" effect="solid">
                      Chỉnh sửa
                    </ReactTooltip>

                    {/* Block product */}
                    {
                      product.state === 'enable' ?
                        <Button data-tip data-for="tip3"
                          style={{ background: '#ee5261', border: '2px solid #ee5261', width: 'auto', height: 'auto' }}
                          className='my-0 mx-0'
                          onClick={() => handleShowBlock(product.id)}
                        >
                          <i className="fas fa-lock"></i>
                        </Button>
                        :
                        <Button data-tip data-for="tip4"
                          style={{ background: '#00c292', border: '2px solid #00c292', width: 'auto', height: 'auto' }}
                          className='my-0 mx-0'
                          onClick={() => handleShowUnlock(product.id)}
                        >
                          <i className="fas fa-unlock"></i>
                        </Button>
                    }
                    <ReactTooltip id="tip3" place="top" effect="solid">
                      Khóa
                    </ReactTooltip>
                    <ReactTooltip id="tip4" place="top" effect="solid">
                      Mở khóa
                    </ReactTooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {pages > 1 && (
        <div className='d-flex justify-content-center'>
          <Pagination>
            {[...Array(pages).keys()].map((x) => (
              <Pagination.Item className='mx-1' active={x + 1 === page}
                key={x + 1}
                onClick={() => setPageNum(x + 1)}
              >{x + 1}</Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}
      {/* Modal Block User */}
      <Modal
        show={show}
        onHide={handleCloseBlock}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
          Bạn có chắc chắn muốn khóa sản phẩm này không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseBlock} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
            Hủy
          </Button>
          <Button variant="danger" onClick={() => blockHandler(idDelete)} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Unlock User */}
      <Modal
        show={showUnlock}
        onHide={handleCloseUnlock}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
          Bạn có chắc chắn muốn mở khóa sản phẩm này không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUnlock} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
            Hủy
          </Button>
          <Button variant="success" onClick={() => unlockHandler(idUnlock)} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Form Add Category */}
      <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm sản phẩm mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='text-center' style={{ color: 'red' }}>{message}</p>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontSize: '14px' }}>Tên sản phẩm</Form.Label>
              <Form.Control
                style={{ fontSize: '14px' }}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Nhập tên sản phẩm"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontSize: '14px' }}>Mô tả sản phẩm</Form.Label>
              <Form.Control
                style={{ fontSize: '14px' }}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                as="textarea"
                placeholder="Mô tả sản phẩm"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontSize: '14px' }}>Giá (VNĐ)</Form.Label>
              <Form.Control
                style={{ fontSize: '14px' }}
                onChange={(e) => setPtice(e.target.value)}
                type="number"
                min={1}
                placeholder="Nhập giá"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontSize: '14px' }}>Danh mục</Form.Label>
              <Form.Select style={{ fontSize: '14px' }} onChange={(e) => setIdCategory(e.target.value)} aria-label="Default select example">
                {
                  categories?.data?.map(category => (
                    <option style={{ fontSize: '14px' }} value={category.id}>{category.name}</option>
                  ))
                }
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontSize: '14px' }}>Số lượng</Form.Label>
              <Form.Control
                style={{ fontSize: '14px' }}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                min={1}
                placeholder="Nhập số lượng"
                autoFocus
              />
            </Form.Group>
            {
              images &&
              <Row className='px-0 py-0 my-3'>
                <p style={{ fontSize: '14px' }}>Xem trước</p>
                <Image style={{ width: '30%', margin: '0 auto' }} src={URL.createObjectURL(images)}></Image>
              </Row>
            }
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontSize: '14px' }}>Hình ảnh</Form.Label>
              <Form.Control
                style={{ fontSize: '14px' }}
                onChange={(e) => setImages(e.target.files[0])}
                type="file"
                autoFocus
                multiple
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }} variant="danger" onClick={handleCloseAdd}>
            Hủy
          </Button>
          <Button style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }} variant="primary" onClick={addHandler}>
            Lưu sản phẩm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProductListScreen

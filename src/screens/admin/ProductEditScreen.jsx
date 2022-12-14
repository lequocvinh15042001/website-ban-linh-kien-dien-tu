import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Form, Row, Modal, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { addImageProduct, deleteImageProduct, listCategory, listProductDetails, listProducts, updateProduct } from '../../actions/productActions'

const ProductEditScreen = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [nameCategory, setNameCategory] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [images, setImages] = useState('')

    const productId = useParams().id
    // console.log('==', productId)

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const { categories } = useSelector(state => state.categoryList)
    // console.log('==', categories)

    const { loading, error, product } = useSelector(state => state.productDetails)
    // console.log('==', product)

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    // Get ID Category
    let arrGetCateId = []
    const getCategoryId = () => {
        categories?.data?.forEach(cate => {
            if (nameCategory === cate.name) {
                arrGetCateId.push(cate.id)
            }
        })
    }

    getCategoryId()
    let category = arrGetCateId[0]
    // console.log('==', category);

    useEffect(() => {
        if (successUpdate) {
            // dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
            window.location.reload()
        } else {
            if (!product?.data?.name || product?.data?.id !== productId) {
                dispatch(listProductDetails(productId))
                dispatch(listCategory())
                dispatch(listProducts())
            } else {
                setName(product?.data?.name)
                setDescription(product?.data?.description)
                setPrice(product?.data?.price)
                setNameCategory(product?.data?.category)
                setQuantity(product?.data?.quantity)
            }
        }
    }, [dispatch, navigate, productId, product, categories, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        const product = {
            id: productId,
            name: name,
            description: description,
            price: price,
            category: category,
            quantity: quantity,
            state: 'enable',
        }
        const formData = new FormData();
        formData.append('files', images);
        dispatch(addImageProduct(productId, formData))
        dispatch(updateProduct(product))
    }

    // Block Product
    const [show, setShow] = useState(false);
    const handleCloseBlock = () => setShow(false);
    const [idDelete, setIdDelete] = useState('')
    const [idImageDelete, setIdImageDelete] = useState('')
    const handleShowBlock = (id, idImage) => {
        setShow(true);
        setIdDelete(id);
        setIdImageDelete(idImage)
    }

    const blockHandler = (id, imageId) => {
        setShow(false);
        const image = { id: id, imageId: imageId }
        dispatch(deleteImageProduct(image))
        window.location.reload()
    }



    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px', background: '#edf1f5' }}>
            <div className='d-flex align-items-center justify-content-between py-4 px-4' style={{ background: 'white', width: '100%' }}>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <i className='fas fa-home'></i>
                        <a href='/admin/dashboard' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Trang ??i???u khi???n</a>
                    </div>
                    <div className='d-flex align-items-center'>
                        <i className="fas fa-chevron-right mx-2"></i>
                        <a href='/admin/productlist' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Qu???n l?? s???n ph???m</a>
                    </div>
                    <div className='d-flex align-items-center'>
                        <i className="fas fa-chevron-right mx-2"></i>
                        <Link to={`/admin/product/${productId}/edit`} className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Ch???nh s???a s???n ph???m</Link>
                    </div>
                </div>
            </div>
            <Row className='d-flex align-items-center px-3 mx-0'>
                <Link to='/admin/productlist' className='d-flex align-items-center pt-4 px-4' style={{ textDecoration: 'none', color: 'black' }}>
                    <i style={{ fontSize: '25px', width: 'auto', cursor: 'pointer' }} className="fas fa-long-arrow-alt-left"></i>
                    <p style={{ width: 'auto', cursor: 'pointer' }} className='mx-0 my-0 px-2'>Quay l???i</p>
                </Link>
            </Row>
            <Row className='align-items-center mx-4 mt-4 px-4' style={{ background: 'white' }}>
                <h5 style={{ fontSize: '20px' }} className='d-flex justify-content-center py-3'>Ch???nh s???a th??ng tin s???n ph???m</h5>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    (
                        <>
                            <Row className='d-flex justify-content-center align-items-center'>
                                <Row className='py-1'>
                                    <div>
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='username' className='py-2'>
                                                <Form.Label>
                                                    <h6 style={{ fontSize: '14px' }}>T??n s???n ph???m</h6>
                                                </Form.Label>
                                                <Form.Control style={{ fontSize: '14px' }} type='name' placeholder='Nh???p t??n s???n ph???m' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='username' className='py-2'>
                                                <Form.Label>
                                                    <h6 style={{ fontSize: '14px' }}>M??? t??? s???n ph???m</h6>
                                                </Form.Label>
                                                <Form.Control style={{ fontSize: '14px' }} type='text' as="textarea" placeholder='M?? t??? s???n ph???m' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='username' className='py-2'>
                                                <Form.Label>
                                                    <h6 style={{ fontSize: '14px' }}>Gi?? s???n ph???m</h6>
                                                </Form.Label>
                                                <Form.Control style={{ fontSize: '14px' }} type='name' placeholder='Nh???p gi?? s???n ph???m' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='username' className='py-2'>
                                                <Form.Label>
                                                    <h6 style={{ fontSize: '14px' }}>Danh m???c</h6>
                                                </Form.Label>
                                                <Form.Select className='mb-3' size="sm" value={nameCategory} onChange={(e) => setNameCategory(e.target.value)}>
                                                    {categories?.data?.map(cate => (
                                                        <option>{cate.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group controlId='username' className='py-2'>
                                                <Form.Label>
                                                    <h6 style={{ fontSize: '14px' }}>S??? l?????ng s???n ph???m</h6>
                                                </Form.Label>
                                                <Form.Control style={{ fontSize: '14px' }} type='number' min={0} placeholder='Nh???p s??? l?????ng s???n ph???m' value={quantity} onChange={(e) => setQuantity(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='username' className='py-2'>
                                                <Form.Label>
                                                    <h6 style={{ fontSize: '14px' }}>H??nh ???nh s???n ph???m</h6>
                                                </Form.Label>
                                                {
                                                    product?.data?.images[0] ?
                                                        <Row className='d-flex align-items-center justify-content-center flex-wrap'>
                                                            <Image style={{ width: '30%', margin: '20px 10px 0 0', marginBottom: '10px', border: '1px solid #dddddd', borderRadius: '5px' }} src={product?.data?.images[0]?.url} alt={product?.data?.name}></Image>
                                                            <Button onClick={() => handleShowBlock(product?.data?.id, product?.data?.images[0]?.imageId)} className='py-0 px-0' style={{ width: '100px', height: '40px', fontSize: '14px', background: '#ee5261', border: 'none', textTransform: 'none' }}>X??a ???nh</Button>
                                                        </Row> :
                                                        <Row className='d-flex align-items-center justify-content-center flex-wrap py-5'>
                                                            {
                                                                images &&
                                                                <Row className='px-0 py-0 my-3'>
                                                                    <p style={{ fontSize: '14px' }}>Xem tr?????c</p>
                                                                    <Image style={{ width: '30%', margin: '20px 10px 0 0', marginBottom: '10px', border: '1px solid #dddddd', borderRadius: '5px' }} src={URL.createObjectURL(images)}></Image>
                                                                </Row>
                                                            }
                                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                <Form.Label style={{ fontSize: '14px' }}>H??nh ???nh</Form.Label>
                                                                <Form.Control
                                                                    style={{ fontSize: '14px' }}
                                                                    onChange={(e) => setImages(e.target.files[0])}
                                                                    type="file"
                                                                    autoFocus
                                                                    multiple
                                                                />
                                                            </Form.Group>
                                                        </Row>
                                                }
                                            </Form.Group>
                                            <Form.Group className='d-flex justify-content-center py-3'>
                                                <Button style={{ background: '#03a9f3', border: 'none', fontSize: '14px', textTransform: 'none', width: 'auto', padding: '10px' }} type='submit'>C???p nh???t s???n ph???m</Button>
                                            </Form.Group>
                                        </Form>
                                    </div>
                                </Row>
                                {/* Modal Delete Image */}
                                <Modal
                                    show={show}
                                    onHide={handleCloseBlock}
                                    backdrop="static"
                                    keyboard={false}
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Th??ng b??o</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
                                        B???n c?? ch???c ch???n mu???n x??a ???nh s???n ph???m n??y kh??ng?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseBlock} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
                                            H???y
                                        </Button>
                                        <Button variant="danger" onClick={() => blockHandler(idDelete, idImageDelete)} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
                                            ?????ng ??
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Row>
                        </>
                    )}
            </Row>
        </div>
    )
}

export default ProductEditScreen
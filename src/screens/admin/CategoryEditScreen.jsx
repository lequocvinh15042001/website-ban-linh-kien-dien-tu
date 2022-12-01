import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Form, Row, Card, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { unlockCategoryAdmin, detailCategoryAdmin } from '../../actions/productActions'
import { USER_UPDATE_RESET } from '../../constants/userConstants'

const CategoryEditScreen = () => {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const categoryId = useParams().id
    // console.log('==', userId)

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const { loading, error, category } = useSelector(state => state.categoryDetails)
    console.log('==', category?.data)

    const unlockCategory = useSelector(state => state.unlockCategory)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = unlockCategory

    useEffect(() => {
        if (successUpdate) {
            //   dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/categorylist')
            window.location.reload()
        } else {
            if (!category?.data?.name || category?.data?.id !== categoryId) {
                dispatch(detailCategoryAdmin(categoryId))
            } else {
                setName(category?.data?.name)
            }
        }
    }, [dispatch, navigate, categoryId, category, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (name.trim().length === 0) {
            setMessage("Vui lòng điền đủ thông tin")
        } else {
            dispatch(unlockCategoryAdmin(categoryId, { name: name, state: 'enable' }))
        }

    }

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px', background: '#edf1f5' }}>
            <div className='d-flex align-items-center justify-content-between py-4 px-4' style={{ background: 'white', width: '100%' }}>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <i className='fas fa-home'></i>
                        <a href='/admin/dashboard' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Trang điều khiển</a>
                    </div>
                    <div className='d-flex align-items-center'>
                        <i className="fas fa-chevron-right mx-2"></i>
                        <a href='/admin/categorylist' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Quản lý danh mục</a>
                    </div>
                    <div className='d-flex align-items-center'>
                        <i className="fas fa-chevron-right mx-2"></i>
                        <Link to={`/admin/category/${categoryId}/edit`} className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Chỉnh sửa danh mục</Link>
                    </div>
                </div>
            </div>
            <Row className='d-flex align-items-center px-3 mx-0'>
                <Link to='/admin/categorylist' className='d-flex align-items-center pt-4 px-4' style={{ textDecoration: 'none', color: 'black' }}>
                    <i style={{ fontSize: '25px', width: 'auto', cursor: 'pointer' }} className="fas fa-long-arrow-alt-left"></i>
                    <p style={{ width: 'auto', cursor: 'pointer' }} className='mx-0 my-0 px-2'>Quay lại</p>
                </Link>
            </Row>
            <Row className='align-items-center mx-4 mt-4 px-4' style={{ background: 'white' }}>
                <h5 style={{ fontSize: '20px' }} className='d-flex justify-content-center py-3'>Chỉnh sửa thông tin danh mục</h5>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    (
                        <>
                            <Row className='d-flex justify-content-center align-items-center'>
                                <Row className='py-1'>
                                    <div>
                                        <p className='text-center' style={{ color: 'red' }}>{message}</p>
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='username' className='py-2'>
                                                <Form.Label>
                                                    <h6 style={{ fontSize: '14px' }}>Tên danh mục</h6>
                                                </Form.Label>
                                                <Form.Control style={{ fontSize: '14px' }} type='name' placeholder='Nhập tên danh mục' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Form.Group className='d-flex justify-content-center py-3'>
                                                <Button style={{ background: '#03a9f3', border: 'none', fontSize: '14px', textTransform: 'none', width: 'auto', padding: '10px' }} type='submit'>Cập nhật danh mục</Button>
                                            </Form.Group>
                                        </Form>
                                    </div>
                                </Row>
                            </Row>
                        </>
                    )}
            </Row>
        </div>
    )
}

export default CategoryEditScreen
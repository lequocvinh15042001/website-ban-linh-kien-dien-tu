import { React, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Col, Row, Card, Button } from 'react-bootstrap'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { detailCategoryAdmin } from '../../actions/productActions';

const CategoryDetailScreen = () => {
    const [isCopied, setIsCopied] = useState(false);

    const categoryId = useParams().id
    console.log('==', categoryId)

    const dispatch = useDispatch()

    const { loading, error, category } = useSelector(state => state.categoryDetails)
    console.log('==', category)


    useEffect(() => {
        dispatch(detailCategoryAdmin(categoryId))
    }, [dispatch, categoryId])

    // Copy Text
    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

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
                        <Link to={`/admin/category/${categoryId}/detail`} className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Chi tiết danh mục</Link>
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
                <h5 style={{ fontSize: '20px' }} className='d-flex justify-content-center py-3'>Chi tiết thông tin danh mục</h5>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    (
                        <>
                            <Row className='d-flex justify-content-center align-items-center py-3'>
                                <Row className='py-3'>
                                    <Col style={{ fontSize: '14px' }} xl={3}>
                                        <h6 style={{fontSize: '14px'}}>ID danh mục</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0' style={{ width: 'auto' }}>{category?.data?.id}</p>
                                        <CopyToClipboard text={category?.data?.id} onCopy={onCopyText}>
                                            <span className='px-0 mx-3' style={{ width: 'auto', cursor: 'pointer' }}>{isCopied ? "Đã sao chép" : <i className="fas fa-copy"></i>}</span>
                                        </CopyToClipboard>
                                    </Col>
                                </Row>
                                <Row className='py-3'>
                                    <Col style={{ fontSize: '14px' }} xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Trạng thái danh mục</h6>
                                    </Col>
                                    {
                                        (category?.data?.state === 'enable') ?
                                            <Col xl={8} className='d-flex justify-content-start align-items-center'>
                                                <p style={{ background: '#00c292', color: '#e7fff8', borderRadius: '5px' }} className='mx-0 my-0 py-1 px-2'>Hoạt động</p>
                                            </Col> :
                                            <Col xl={8} className='d-flex justify-content-start align-items-center'>
                                                <p style={{ background: '#e46a76', color: '#e7fff8', borderRadius: '5px' }} className='mx-0 my-0 py-1 px-2'>Đã khóa</p>
                                            </Col>
                                    }
                                </Row>
                                <Row className='py-3'>
                                    <Col style={{ fontSize: '14px' }} xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Tên danh mục</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0'>{category?.data?.name}</p>
                                    </Col>
                                </Row>
                            </Row>
                        </>
                    )}
            </Row>
        </div>
    )
}

export default CategoryDetailScreen
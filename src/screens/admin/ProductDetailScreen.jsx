import { React, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Col, Row, Card, Button, Image } from 'react-bootstrap'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listProductDetails } from '../../actions/productActions';

const ProductDetailAdminScreen = () => {
    const [isCopied, setIsCopied] = useState(false);

    const productId = useParams().id
    // console.log('==', productId)

    const dispatch = useDispatch()

    const { loading, error, product } = useSelector(state => state.productDetails)
    console.log('==', product)


    useEffect(() => {
        dispatch(listProductDetails(productId))
    }, [dispatch, productId])

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
                        <a href='/admin/productlist' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Quản lý sản phẩm</a>
                    </div>
                    <div className='d-flex align-items-center'>
                        <i className="fas fa-chevron-right mx-2"></i>
                        <Link to={`/admin/product/${productId}/detail`} className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Chi tiết sản phẩm</Link>
                    </div>
                </div>
            </div>
            <Row className='d-flex align-items-center px-3 mx-0'>
                <Link to='/admin/productlist' className='d-flex align-items-center pt-4 px-4' style={{ textDecoration: 'none', color: 'black' }}>
                    <i style={{ fontSize: '25px', width: 'auto', cursor: 'pointer' }} className="fas fa-long-arrow-alt-left"></i>
                    <p style={{ width: 'auto', cursor: 'pointer' }} className='mx-0 my-0 px-2'>Quay lại</p>
                </Link>
            </Row>
            <Row className='align-items-center mx-4 mt-4 px-4 py-3' style={{ background: 'white' }}>
                <h5 style={{fontSize: '20px'}} className='d-flex justify-content-center py-3'>Chi tiết thông tin sản phẩm</h5>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    (
                        <>
                            <Row className='d-flex justify-content-center align-items-center pb-5'>
                                <Row className='py-3 d-flex justify-content-center align-items-center'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>ID sản phẩm</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0' style={{ width: 'auto' }}>{product?.data?.id}</p>
                                        <CopyToClipboard text={product?.data?.id} onCopy={onCopyText}>
                                            <span className='px-0 mx-3' style={{ width: 'auto', cursor: 'pointer' }}>{isCopied ? "Đã sao chép" : <i className="fas fa-copy"></i>}</span>
                                        </CopyToClipboard>
                                    </Col>
                                </Row>
                                <Row className='py-3 d-flex justify-content-center align-items-center'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Trạng thái sản phẩm</h6>
                                    </Col>
                                    {
                                        (product?.data?.state === 'enable') ?
                                            <Col xl={8} className='d-flex justify-content-start align-items-center'>
                                                <p style={{ background: '#00c292', color: '#e7fff8', borderRadius: '5px' }} className='mx-0 my-0 py-1 px-2'>Hoạt động</p>
                                            </Col> :
                                            <Col xl={8} className='d-flex justify-content-start align-items-center'>
                                                <p style={{ background: '#e46a76', color: '#e7fff8', borderRadius: '5px' }} className='mx-0 my-0 py-1 px-2'>Đã khóa</p>
                                            </Col>
                                    }
                                </Row>
                                <Row className='py-3 d-flex justify-content-center align-items-center'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Tên sản phẩm</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0'>{product?.data?.name}</p>
                                    </Col>
                                </Row>
                                <Row className='py-3 d-flex justify-content-center align-items-center'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Danh mục</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0'>{product?.data?.category}</p>
                                    </Col>
                                </Row>
                                <Row className='py-3 d-flex justify-content-center align-items-center'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Mô tả sản phẩm</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0'>{product?.data?.description}</p>
                                    </Col>
                                </Row>
                                <Row className='py-3 d-flex justify-content-center align-items-center'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Số lượng</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0'>{product?.data?.quantity}</p>
                                    </Col>
                                </Row>
                                <Row className='py-3 d-flex justify-content-center align-items-center'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Đã bán</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0'>{product?.data?.sold}</p>
                                    </Col>
                                </Row>
                                <Row className='py-3 d-flex justify-content-center align-items-center'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Đánh giá</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0'>{product?.data?.rate} sao</p>
                                    </Col>
                                </Row>
                                <Row className='py-3 d-flex justify-content-center align-items-center'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Ngày tạo sản phẩm</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0'>{product?.data?.createdDate}</p>
                                    </Col>
                                </Row>
                                <Row className='py-3 d-flex justify-content-center align-items-center'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Lần cuối cập nhật</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0'>{product?.data?.updateDate}</p>
                                    </Col>
                                </Row>
                                <Row className='py-3 d-flex justify-content-center align-items-center'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Hình ảnh</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex flex-wrap'>
                                        {
                                            product?.data?.images?.map(image => (
                                                <Image style={{width: '30%', margin: '20px 10px 0 0', marginBottom: '10px', border:'1px solid #dddddd', borderRadius: '5px'}} src={image.url} alt={product?.data?.name}></Image>
                                            ))
                                        }
                                    </Col>
                                </Row>
                            </Row>
                        </>
                    )}
            </Row>
        </div>
    )
}

export default ProductDetailAdminScreen
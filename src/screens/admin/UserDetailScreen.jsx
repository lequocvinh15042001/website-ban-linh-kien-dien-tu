import { React, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Col, Row, Card, Button } from 'react-bootstrap'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { getUserDetails } from '../../actions/userActions';

const UserDetailScreen = () => {
    const [isCopied, setIsCopied] = useState(false);

    const userId = useParams().id
    // console.log('==', userId)

    const dispatch = useDispatch()

    const { loading, error, user } = useSelector(state => state.userDetails)
    // console.log('==', user)


    useEffect(() => {
        dispatch(getUserDetails(userId))
    }, [dispatch, userId])

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
                        <a href='/admin/userlist' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Quản lý người dùng</a>
                    </div>
                    <div className='d-flex align-items-center'>
                        <i className="fas fa-chevron-right mx-2"></i>
                        <Link to={`/admin/user/${userId}/detail`} className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Chi tiết người dùng</Link>
                    </div>
                </div>
            </div>
            <Row className='d-flex align-items-center px-3 mx-0'>
                <Link to='/admin/userlist' className='d-flex align-items-center pt-4 px-4' style={{ textDecoration: 'none', color: 'black' }}>
                    <i style={{ fontSize: '25px', width: 'auto', cursor: 'pointer' }} className="fas fa-long-arrow-alt-left"></i>
                    <p style={{ width: 'auto', cursor: 'pointer' }} className='mx-0 my-0 px-2'>Quay lại</p>
                </Link>
            </Row>
            <Row className='align-items-center mx-4 mt-4 px-4 py-3' style={{ background: 'white' }}>
                <h5 style={{ fontSize: '20px' }} className='d-flex justify-content-center py-3'>Chi tiết thông tin người dùng</h5>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    (
                        <>
                            <Row className='d-flex justify-content-center align-items-center'>
                                <Row className='py-3'>
                                    <Col xl={3}>
                                        <h6 style={{ fontSize: '14px' }}>ID người dùng</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0' style={{ width: 'auto' }}>{user?.data?.id}</p>
                                        <CopyToClipboard text={user?.data?.id} onCopy={onCopyText}>
                                            <span className='px-0 mx-3' style={{ width: 'auto', cursor: 'pointer' }}>{isCopied ? "Đã sao chép" : <i className="fas fa-copy"></i>}</span>
                                        </CopyToClipboard>
                                    </Col>
                                </Row>
                                <Row className='py-3'>
                                    <Col xl={3}>
                                        <h6 style={{ fontSize: '14px' }}>Vai trò</h6>
                                    </Col>

                                    {
                                        (user?.data?.role === 'role_user') ?
                                            <Col xl={8} className='d-flex'>
                                                <p className='mx-0 my-0' style={{ color: '#03a9f3' }}>Người dùng</p>
                                            </Col> : (user?.data?.role === 'role_shipper') ?
                                                <Col xl={8} className='d-flex'>
                                                    <p className='mx-0 my-0' style={{ color: 'blue' }}>Shipper</p>
                                                </Col> :
                                                <Col xl={8} className='d-flex'>
                                                    <p className='mx-0 my-0' style={{ color: '#e46a76' }}>Quản trị viên</p>
                                                </Col>
                                    }
                                </Row>
                                <Row className='py-3'>
                                    <Col xl={3}>
                                        <h6 style={{ fontSize: '14px' }}>Trạng thái tài khoản</h6>
                                    </Col>
                                    {
                                        (user?.data?.state === 'active') ?
                                            <Col xl={8} className='d-flex justify-content-start align-items-center'>
                                                <p style={{ background: '#00c292', color: '#e7fff8', borderRadius: '5px' }} className='mx-0 my-0 py-1 px-2'>Hoạt động</p>
                                            </Col> :
                                            <Col xl={8} className='d-flex justify-content-start align-items-center'>
                                                <p style={{ background: '#e46a76', color: '#e7fff8', borderRadius: '5px' }} className='mx-0 my-0 py-1 px-2'>Đã khóa</p>
                                            </Col>
                                    }
                                </Row>
                                <Row className='py-3'>
                                    <Col xl={3}>
                                        <h6 style={{ fontSize: '14px' }}>Tên người dùng</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0'>{user?.data?.name}</p>
                                    </Col>
                                </Row>
                                <Row className='py-3'>
                                    <Col xl={3}>
                                        <h6 style={{ fontSize: '14px' }}>Email người dùng</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0'>{user?.data?.email}</p>
                                    </Col>
                                </Row>
                                <Row className='py-3'>
                                    <Col xl={3}>
                                        <h6 style={{ fontSize: '14px' }}>Số điện thoại</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        {
                                            user?.data?.phone ? <p className='mx-0 my-0'>{user?.data?.phone}</p> : <p className='mx-0 my-0'>Chưa cập nhật</p>
                                        }
                                    </Col>
                                </Row>
                                <Row className='py-3'>
                                    <Col xl={3}>
                                        <h6 style={{ fontSize: '14px' }}>Địa chỉ</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        {
                                            user?.data?.address ? <p className='mx-0 my-0'>{user?.data?.address}</p> : <p className='mx-0 my-0'>Chưa cập nhật</p>
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

export default UserDetailScreen
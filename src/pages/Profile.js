import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../actions/userActions';
import Message from '../components/Message'
import Loader from '../components/Loader';

const Profile = () => {
    const [isCopied, setIsCopied] = useState(false);

    const userId = useParams().id
    console.log('==', userId)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    console.log(userInfo);


    useEffect(() => {
        dispatch(getUserDetails(userId))
    }, [userId])

    // Copy Text
    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    return (
        <div className='container' style={{"paddingTop":"10rem"}}>
            <div className='d-flex align-items-center justify-content-between py-4 px-4' style={{ background: 'white', width: '100%' }}>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <i className='fas fa-home'></i>
                        <a href='/' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Trang chủ</a>
                    </div>
                    <div className='d-flex align-items-center'>
                        <i className="fas fa-chevron-right mx-2"></i>
                        <a href='/profile' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Thông tin người dùng</a>
                    </div>
                </div>
            </div>
            {/* <Row className='d-flex align-items-center px-3 mx-0'>
                <Link to='/' className='d-flex align-items-center pt-4 px-4' style={{ textDecoration: 'none', color: 'black' }}>
                    <i style={{ fontSize: '25px', width: 'auto', cursor: 'pointer' }} className="fas fa-long-arrow-alt-left"></i>
                    <p style={{ width: 'auto', cursor: 'pointer' }} className='mx-0 my-0 px-2'>Quay lại</p>
                </Link>
            </Row> */}
            <Row className='align-items-center mx-4 mt-4 px-4 py-3' style={{ background: 'white' }}>
                <h5 style={{fontSize: '20px'}} className='d-flex justify-content-center py-3'>Chi tiết thông tin người dùng</h5>
                {
                        <>
                            <Row className='d-flex justify-content-center align-items-center'>
                                <Row className='py-3'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>ID người dùng</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0' style={{ width: 'auto' }}>{userInfo.id}</p>
                                        {/* <CopyToClipboard text={user?.data?.id} onCopy={onCopyText}>
                                            <span className='px-0 mx-3' style={{ width: 'auto', cursor: 'pointer' }}>{isCopied ? "Đã sao chép" : <i className="fas fa-copy"></i>}</span>
                                        </CopyToClipboard> */}
                                    </Col>
                                </Row>
                                <Row className='py-3'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Vai trò</h6>
                                    </Col>

                                    {
                                        (userInfo.role === 'role_user') ?
                                            <Col xl={8} className='d-flex'>
                                                <p className='mx-0 my-0' style={{ color: '#03a9f3' }}>Người dùng</p>
                                            </Col> :
                                            <Col xl={8} className='d-flex'>
                                                <p className='mx-0 my-0' style={{ color: '#e46a76' }}>Quản trị viên</p>
                                            </Col>
                                    }
                                </Row>
                                {/* <Row className='py-3'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Trạng thái tài khoản</h6>
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
                                </Row> */}
                                <Row className='py-3'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Tên người dùng</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0'>{userInfo.name}</p>
                                    </Col>
                                </Row>
                                <Row className='py-3'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Email người dùng</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        <p className='mx-0 my-0'>{userInfo.email}</p>
                                    </Col>
                                </Row>
                                <Row className='py-3'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Số điện thoại</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        {
                                            userInfo.phone ? <p className='mx-0 my-0'>{userInfo.phone}</p> : <p className='mx-0 my-0'>Chưa cập nhật</p>
                                        }
                                    </Col>
                                </Row>
                                <Row className='py-3'>
                                    <Col xl={3}>
                                        <h6 style={{fontSize: '14px'}}>Địa chỉ</h6>
                                    </Col>
                                    <Col xl={8} className='d-flex'>
                                        {
                                            userInfo.address ? <p className='mx-0 my-0'>{userInfo.address}</p> : <p className='mx-0 my-0'>Chưa cập nhật</p>
                                        }
                                    </Col>
                                </Row>
                            </Row>
                        </>
                    }
            </Row>
        </div>
    )
}

export default Profile
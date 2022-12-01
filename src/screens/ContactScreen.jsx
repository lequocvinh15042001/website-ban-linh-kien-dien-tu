import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const ContactScreen = () => {
    const defaultProps = {
        center: {
            lat: 10.8504205,
            lng: 106.7716593
        },
        zoom: 12
    };
    return (
        <Container className='p-4 mt-5 pt-5' style={{border: '2px solid #cccccc', borderRadius: '15px'}}>
            <Row style={{ height: '65vh', width: '100%' }} className='mt-5'>
                <Col xl={6}>
                    <Row className='mb-3'>
                        <h6>Địa chỉ cửa hàng:</h6>
                        <div className='d-flex align-items-center'>
                            <i className="fas fa-map-marker-alt"></i>
                            <p className='mx-2 my-0'>Số 1, Võ Văn Ngân, TP. Thủ Đức, TP. Hồ Chí Minh</p>
                        </div>
                    </Row>
                    <Row className='mb-3'>
                        <h6>Số điện thoại:</h6>
                        <div className='d-flex align-items-center'>
                            <i className="fas fa-mobile-alt"></i>
                            <p className='mx-2 my-0'>+84 939 816 450</p>
                        </div>
                    </Row>
                    <Row className='mb-3'>
                        <h6>Email:</h6>
                        <div className='d-flex align-items-center'>
                            <i className="fas fa-envelope"></i>
                            <p className='mx-2 my-0'>thegioidientu@gmail.com</p>
                        </div>
                    </Row>
                    <Row className='mb-3'>
                        <h6>Mở cửa: <span style={{color: '#009900'}}>8h sáng - 21h30 tối</span></h6>
                    </Row>
                    <Row className='mb-3'>
                        <h6>Thông báo:</h6>
                        <div className='d-flex align-items-center'>
                            <p className='my-0'>Cám ơn quý khách đã tin tưởng và mua sắm tại Thế giới điện tử. Trong quá trình mua sắm, nếu có 
                            vấn đề, quý khách có thể liên hệ với chúng tôi qua các thông tin trên để được hướng dẫn và xử lý. Trân trọng.</p>
                        </div>
                    </Row>
                </Col>
                <Col xl={6}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                    >
                        <AnyReactComponent
                            lat={41.40338}
                            lng={2.17403}
                            text="My Marker"
                        />
                    </GoogleMapReact>
                </Col>
            </Row>
        </Container>
    )
}

export default ContactScreen
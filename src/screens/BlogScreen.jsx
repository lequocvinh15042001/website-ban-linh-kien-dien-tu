import React from 'react'
import { Container, Image, Row } from 'react-bootstrap'
import YouTube from "react-youtube";
var cElement = null;

const BlogScreen = () => {
    const opts = {
        height: "390",
        width: "640",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0
        }
    };
    const _onReady = event => {
        console.log("_onReady");
        cElement = event;
        // event.target.playVideo();
    };

    const _onStateChange = event => {
        // event.target.pauseVideo()
    };
    return (
        <Container className='py-5 mt-5'>
            <Row className='pb-4'>
                <h3 className='text-center pt-5'>Khám phá cùng Thế giới điện tử</h3>
            </Row>
            <Row>
                <Row>
                    <h4 className='pb-2'>1. Robot học lệnh</h4>
                </Row>
                <Row>
                    <p>- Chuẩn bị: Điều khiển: 1 arduino uno r3.
                        1 chiết áp (biến trở xoay) giá trị 10k ôm - 200K ôm
                        1 servo bất kì
                        3 nút ấn.
                        Còn lại là nguồn và đồ ráp mạch.
                    </p>
                    <p>- Sơ đồ mạch:
                    </p>
                    <Image style={{ width: '50%', margin: '0 auto' }} src='http://k2.arduino.vn/img/2016/12/31/0/3434_88215469-1483176698-0-1-servo.png'></Image>
                    <p>- Code Arduino lấy tại: <a href='http://arduino.vn/tutorial/1393-lam-robot-tu-hoc-lenh-don-gian'>http://arduino.vn/tutorial/1393-lam-robot-tu-hoc-lenh-don-gian</a>
                    </p>
                </Row>
                <Row >
                    <YouTube className='d-flex justify-content-center'
                        videoId={"RcphBwnrz6Q"}
                        opts={opts}
                        onReady={_onReady}
                        onStateChange={_onStateChange}
                    />
                    <i className='text-center py-3'>Video tham khảo. Nguồn: Arduino VN</i>
                </Row>
            </Row>
            <Row>
                <Row>
                    <h4 className='pb-2'>2. Robot cánh tay 5 bậc</h4>
                </Row>
                <Row>
                    <p>- Chuẩn bị: Điều khiển: 1 arduino uno r3.
                        5 chiết áp (biến trở xoay) giá trị 10k ôm - 200K ôm
                        5 servo bất kì
                        3 nút ấn.
                        Còn lại là nguồn và đồ ráp mạch.
                    </p>
                    <p>- Sơ đồ mạch:
                    </p>
                    <Image style={{ width: '50%', margin: '0 auto' }} src='http://k1.arduino.vn/img/2016/12/31/0/3472_12315469-1483176695-0-1-servo---copy.png'></Image>
                    <p>- Code Arduino lấy tại: <a href='http://arduino.vn/tutorial/1393-lam-robot-tu-hoc-lenh-don-gian'>http://arduino.vn/tutorial/1393-lam-robot-tu-hoc-lenh-don-gian</a>
                    </p>
                </Row>
                <Row >
                    <YouTube className='d-flex justify-content-center'
                        videoId={"kpoXd7oO1sI"}
                        opts={opts}
                        onReady={_onReady}
                        onStateChange={_onStateChange}
                    />
                    <i className='text-center py-3'>Video tham khảo. Nguồn: Arduino VN</i>
                </Row>
                <Row >
                    <YouTube className='d-flex justify-content-center'
                        videoId={"EVahdY-8iPI"}
                        opts={opts}
                        onReady={_onReady}
                        onStateChange={_onStateChange}
                    />
                    <i className='text-center py-3'>Video tham khảo. Nguồn: Arduino VN</i>
                </Row>
            </Row>
            <Row>
                <Row>
                    <h4 className='pb-2'>3. Định vị GPS</h4>
                </Row>
                <Row>
                    <p>- Chuẩn bị: 1 Kit Arduino Uno VN01, 1 LCD Keypad shield, 1 Module GPS L80, dây nối.
                    </p>
                    <p>- Sơ đồ mạch:
                    </p>
                    <Image style={{ width: '50%', margin: '0 auto' }} src='http://mlab.vn/image/data/Bai%20viet%20ky%20thuat/Bai%20viet%20ki%20thuat%202/cam%20nhietdo%20doam%20ghi%20thenho/Temp_hum_bb.jpg'></Image>
                    <p>- Code Arduino lấy tại: <a href='https://mlab.vn/index.php?_route_=53361-huong-dan-lap-trinh-module-gps-l80-va-arduino.html'>https://mlab.vn/index.php?_route_=53361-huong-dan-lap-trinh-module-gps-l80-va-arduino.html</a>
                    </p>
                </Row>
                <Row >
                    <YouTube className='d-flex justify-content-center'
                        videoId={"vAc2Cg729dI"}
                        opts={opts}
                        onReady={_onReady}
                        onStateChange={_onStateChange}
                    />
                    <i className='text-center py-3'>Video tham khảo. Nguồn: Arduino VN</i>
                </Row>
            </Row>
            <Row>
                <Row>
                    <h4 className='pb-2'>4. Máy tính cầm tay</h4>
                </Row>
                <Row>
                    <p>- Chuẩn bị: Arduino UNO,
                        16 x 2 LCD Display,
                        4 x 4 Matrix Keypad Module or 16 Push buttons,
                        10 KΩ Potentiometer,
                        Bread board ( Prototyping board ),
                        Connecting wires
                    </p>
                    <p>- Sơ đồ mạch:
                    </p>
                    <Image style={{ width: '50%', margin: '0 auto' }} src='https://4.bp.blogspot.com/-OZiA_ejJ7bI/WIg0TGINusI/AAAAAAAAA-w/AJgTgszLL0Y3jkF3LRwWYnQrA9RVuva2gCLcB/s1600/Arduino-Calculator-Circuit-1024x472.png'></Image>
                    <p>- Code Arduino lấy tại: <a href='hhttps://thangshare.blogspot.com/2017/01/mach-tao-may-tinh-cam-tay-su-dung-arduino-uno.html'>https://thangshare.blogspot.com/2017/01/mach-tao-may-tinh-cam-tay-su-dung-arduino-uno.html</a>
                    </p>
                </Row>
                <Row >
                    <YouTube className='d-flex justify-content-center'
                        videoId={"KS83Y6l8u_s"}
                        opts={opts}
                        onReady={_onReady}
                        onStateChange={_onStateChange}
                    />
                    <i className='text-center py-3'>Video tham khảo. Nguồn: Arduino VN</i>
                </Row>
            </Row>
        </Container>
    )
}

export default BlogScreen
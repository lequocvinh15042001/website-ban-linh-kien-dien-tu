import React, { Fragment } from "react";
import styled from "styled-components";

import { PageHero } from "../components";
import aboutImg from "../assets/elec.jpg";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const AboutPage = () => {
  const defaultProps = {
    center: {
      lat: 10.8504205,
      lng: 106.7716593
    },
    zoom: 12
  };
  return (
    <Fragment>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="heroimage" className="" />
        <article>
          <div className="title">
            <h2>Giới thiệu</h2>
            <div className="underline"></div>
          </div>
          <p>
            {/* <GoogleMapReact
            bootstrapURLKeys={{ key: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC1qV4AS7bjTPtqF1KkCX7wF0r3vvnJdmQ&callback=initMap" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >
            <AnyReactComponent
                lat={41.40338}
                lng={2.17403}
                text="My Marker"
            />
          </GoogleMapReact> */}
            <p>
              Cửa hàng mua bán linh kiện THẾ GIỚI ĐIỆN TỬ được thành lập năm 2017. Nhờ sự tin tưởng và ủng hộ của Quý Khách hàng, đặc biệt là các Bạn sinh viên học sinh, cửa hàng chúng tôi luôn mong muốn đem đến sự tiện ích trong giao dịch mua bán cho Quý Khách. Với kỷ nguyên truyền thông đa phương tiện, dù ở bất cứ nơi đâu, Quý Khách hàng vẫn có thể chọn mua những sản phẩm của chúng tôi với chất lượng đồng nhất và giá cả tốt nhất. Hãy gọi cho chúng tôi để bạn được phục vụ tốt nhất.

              Cửa hàng chúng tôi chuyên kinh doanh linh kiện phụ kiện ngành điện tử, và dụng cụ trang thiết bị chuyên dụng trong ngành. Bên cạnh đó, chúng tôi còn sản xuất và kinh doanh nhiều module, kit phát triển phục vụ cho công tác nghiên cứu học tập và các loại sản phẩm, mạch điện thông minh ứng dụng trong đời sống. Ngoài ra, chúng tôi còn nhận thiết kế, đặt hàng các sản phẩm theo yêu cầu của Quý Khách, tư vấn và hỗ trợ kỹ thuật.

              Chân thành cảm ơn sự ủng hộ của Quý Khách.
            </p>
          </p>
          <p>
            Hotline: (+84) 999 99 999
          </p>
        </article>
      </Wrapper>
    </Fragment>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
    transition: transform 250ms;
    :hover{
      transform: translateY(-20px);
    }
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;

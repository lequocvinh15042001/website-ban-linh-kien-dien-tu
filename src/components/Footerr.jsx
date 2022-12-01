import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
function Footerr() {
  const data = [
    {
      type: "Sản phẩm",
      subTypes: [
        "Mạch, nguồn",
        "Cảm biến",
        "Màn hình",
        "Cáp",
        "LED",
      ],
    },
    {
      type: "Dịch vụ",
      subTypes: [
        "Chất lượng",
        "Giao hàng nhanh chóng",
        "Đổi hàng quy tính",
        "An toàn"
      ],
    },
    {
      type: "Liên hệ",
      subTypes: ["Địa chỉ: Số 1, Võ Văn Ngân", "SĐT: +84 930 131 121", "Email: thegioidientu@gmail.com"],
    }
  ];
  const socialLinks = [
    <BsFacebook />,
    <BsInstagram />,
    <BsTwitter />,
    <BsLinkedin />,
  ];
  return (
    <footer className="py-3 mx-3">
      <div className="brand-container">
        <div className="brand">
          <span>Nhóm 8</span>
          <span className="dot">.</span>
        </div>
        <p className="description">
          Thiết kế website buôn bán linh kiện điện tử (Spring boot, ReactJS, MongoDB)
        </p>

        <ul className="social-links">
          {socialLinks.map((link, index) => (
            <li key={index}>{link}</li>
          ))}
        </ul>
      </div>
      <div className="links">
        {data.map(({ type, subTypes }, index) => {
          return (
            <div className="link" key={index}>
              <h3 className="title">{type}</h3>
              <ul>
                {subTypes.map((type, index) => (
                  <li key={index}>
                    <a href="#">{type}</a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </footer>
  );
}

export default Footerr;

import React from "react";
import styled from "styled-components";

import { ThemeChange } from "./index";

const ContactHelp = () => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>Nhập thông tin phản hồi để được liên hệ hỗ trợ</h3>
        <div className="content">
          <p>
            {" "}
            Chúng tôi mong muốn nhận được những phản hồi từ khách hàng, nhằm giúp nâng cao chất lượng dịch vụ!
          </p>
          <p>
            {" "}
            Hotline: (+84) 9999 999 99
          </p>
          <form
            method="POST"
            action="https://formspree.io/f/xbjpwdyq"
            className="contact-form"
          >
            <textarea
              type="email"
              name="_replyto"
              placeholder="Nhập thông tin phản hồi"
              className="form-input"
            />
            <button type="submit" className="submit-btn">
              Gửi
            </button>
          </form>
        </div>
        <div
          className="section-center"
          style={{
            textAlign: "center",
            alignItems: "center",
            alignContent: "center",
            marginTop: "50px",
          }}
        ></div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 2rem 0;
  h3 {
    text-transform: none;
  }
  p {
    line-height: 2;
    max-width: 45em;
    color: var(--dark-blue);
  }
  .contact-form {
    width: 90vw;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr auto;

  }

  .form-input,
  .submit-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid var(--clr-black);
  }
  .form-input {
    border-right: none;
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
    height: 100px;
    justify-items:center;
  }
  .submit-btn {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
  .form-input::placeholder {
    color: var(--clr-black);
    text-transform: capitalize;
  }
  .submit-btn {
    background: var(--dark-blue);
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);
    color: orange;
  }
  .submit-btn:hover {
    color: var(--dark-blue);
    background-color: orange;
  }
  @media (min-width: 992px) {
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 8rem;
      margin-top: 2rem;
    }
    p {
      margin-bottom: 0;
    }
  }
  @media (min-width: 1280px) {
    padding: 15rem 0 5rem 0;
  }
`;

export default ContactHelp;

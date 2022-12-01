import React, { useState } from "react";
import styled from "styled-components";

const ProductImages = ({ images = [{ url: "" }] }) => {
  const [main, setMain] = useState(images[0]);
  console.log(images);

  return (
    <Wrapper style={{ margin: '0 auto' }}>
      <img src={main.url} alt="main_image" className="main" style={{ width: '400px', height: '400px' }} />
      <div className="gallery">
        {images.map((image, index) => {
          return (
            <img
              className={`${image.url === main.url ? "active" : null}`}
              key={index}
              // alt={image.filename}
              src={image.url}
              onClick={() => setMain(images[index])}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: auto;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
                
    transition: transform 250ms;
    :hover{
      transform: translateY(-20px);
    }
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    border: 2px solid var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    img {
      width: 100%;
      padding: 0%;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (max-width: 780px) {
    .main {
      height: 300px;
    }
    img {
      width: 100%;
      padding: 0%;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;

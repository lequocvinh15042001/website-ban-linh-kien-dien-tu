import React from "react";
import styled from "styled-components";

import { Filters, ProductList, Sort, PageHero } from "../components";
import Comment from "../components/Comment";
import Contact from "../components/Contact";
import AllProduct from "./../components/AllProduct/AllProduct"

const ProductsPage = () => {
  return (
    <main id="main">
      <PageHero title="Sản phẩm" />
        <div>
          {/* <Filters /> */}
          <AllProduct/>
        </div>
    </main>
  );
};

// const Wrapper = styled.div`
//   .products {
//     display: grid;
//     gap: 3rem 1.5rem;
//     margin: 3rem auto;
//   }
//   @media (min-width: 768px) {
//     .products {
//       grid-template-columns: 250px 1fr;
//     }
//   }
// `;

export default ProductsPage;

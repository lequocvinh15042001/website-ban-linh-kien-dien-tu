import React from "react";
import styled from "styled-components";
import {Row, Col} from "antd";

import Product from "./Product";

const GridView = ({ products }) => {
  return (
<div>
        {products.data?.list?.map((product) => {
          return(
          <Row  gutter={[16, 16]}>
          <Col span={6}>
                    <Product key={product.id} {...product} />;
          </Col>
          </Row>
        )})}
        </div>
  );
  
}; 

export default GridView;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listProducts } from "../actions/productActions";

import { useFilterContext } from "../context/filter_context";

import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  // const { filteredProducts: products, gridView } = useFilterContext();

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [loadMore, setLoadMore] = useState(8)

  const productList = useSelector((state) => state.productList)
  //const { loading, error, products, page, pages } = productList
  const { loading, error, products, page } = productList
  console.log('===',products);

  useEffect(() => {
      dispatch(listProducts())
  }, [
    dispatch,
  ])

  if (products.data?.list?.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Xin lỗi, không tìm thấy sản phẩm...
      </h5>
    );
  }

  if (!products) {
    return <ListView products={products}></ListView>;
  }

  return <GridView products={products}></GridView>;
};

export default ProductList;

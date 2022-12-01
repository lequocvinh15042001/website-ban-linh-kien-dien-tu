import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useThemeContext } from "./context/theme_context";
import useAlan from "./hooks/useAlan";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  AuthWrapper,
  Scan,
  History,
  ItemList,
} from "./pages";
import AdminUserList from "./pages/adminPages/AdminUserList";
import AdminDetailUser from "./pages/adminPages/AdminUserDetail";
import AdminCategoryList from "./pages/adminPages/AdminCategoryList";
import AdminCategoryDetail from "./pages/adminPages/AdminCategoryDetail";
import AdminEditCategory from "./pages/adminPages/AdminCategoryEdit";
import AdminProductList from "./pages/adminPages/AdminProductList";
import AdminDetailProduct from "./pages/adminPages/AdminProductDetail";
import AdminOrdertList from "./pages/adminPages/AdminOrderList";
import AdminOrderDetail from "./pages/adminPages/AdminOrderDetail";
import HomeClient from "./pages/clientPages/HomeClient";
import AboutClient from "./pages/clientPages/AboutClient";
import CartClient from "./pages/clientPages/CartClient";
import ProductsClient from "./pages/clientPages/ProductClient";
import SingleProductClient from "./pages/clientPages/SingleProductClient";
import CheckoutClient from "./pages/clientPages/CheckoutClient";
import ShippingScreenClient from "./pages/clientPages/ShippingScreenClient";
import PaymentScreenClient from "./pages/clientPages/PaymentScreenClient";
import ErrorClient from "./pages/clientPages/ErrorClient";
import "./scss/index.scss";
import ForgotPasswordClient from "./pages/clientPages/ForgotPasswordClient";
import ChangePasswordClient from "./pages/clientPages/ChangePasswordClient";
import MyOrderClient from "./pages/clientPages/MyOrderClient";
import UserDetailClient from "./pages/clientPages/UserDetailClient";
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import AdminEditProduct from "./pages/adminPages/AdminProductEdit";
import LoginShipperScreen from "./screens/shipper/LoginShipperScreen";
import HomeShipperScreen from "./screens/shipper/HomeShipperScreen";
import RegisterShipperScreen from "./screens/shipper/RegisterShipperScreen";
import LoginAdminScreen from "./screens/admin/LoginAdminScreen";
import VerifyShipperScreen from "./screens/shipper/VerifyShipperScreen";
import BlogClient from "./pages/clientPages/BlogClient";
import ContactClient from "./pages/clientPages/ContactClient";
import VerifyClient from "./pages/clientPages/VerifyClient";
import ForgotPasswordShipper from "./screens/shipper/ForgotPasswordShipperScreen";
import ResetPasswordShipperScreen from "./screens/shipper/ResetPasswordShipperScreen";
import AdminCommentList from "./pages/adminPages/AdminCommentList";
import VerifyForgotPasswordShipperScreen from "./screens/shipper/VerifyForgotPasswordShipperScreen";
import ForgotPassword from "./screens/ForgotPassword";
import VerifyForgotPasswordScreen from "./screens/VerifyForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

function App() {
  const { theme } = useThemeContext();

  useAlan();

  useEffect(() => {
    if (theme === "dark-theme") {
      // set dark mode theme
      document.documentElement.className = "dark-theme";
    } else {
      // remove dark mode
      document.documentElement.className = "light-theme";
    }
  }, [theme]);

  return (
    <AuthWrapper>
      {/* <Navbar />
        <Sidebar /> */}
      <Routes>
        <Route exact path="/" element={<HomeClient />} />
        <Route exact path="/about" element={<AboutClient />} />

        <Route path='/login' element={<LoginPage />} />
        <Route path='/verify/:email' element={<VerifyClient />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route exact path="/cart" element={<CartClient />}>
        </Route>

        <Route exact path="/cart/:id" element={<CartClient />}>
        </Route>

        <Route exact path="/products#:id" element={<ProductsClient />}>

        </Route>

        <Route exact path="/products" element={<ProductsClient />}>

        </Route>

        <Route exact path="/history" element={<History />}>

        </Route>

        <Route exact path="/scan" element={<Scan />}>

          {/* <ItemList /> */}
        </Route>

        <Route exact path="/products/:id" element={<SingleProductClient />} />

        <Route exact path="/checkout" element={<CheckoutClient />} />

        <Route path='/shipping/:id' element={<ShippingScreenClient />} />

        <Route path='/success' element={<PaymentScreenClient />} />

        <Route path="*" element={<ErrorClient />}></Route>

        <Route path='/changepassword' element={<ChangePasswordClient />} />

        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route exact path="/forgotpassword/verify/:email" element={<VerifyForgotPasswordScreen />} />
        <Route exact path="/resetpassword" element={<ResetPasswordScreen />} />

        <Route path='/myorder' element={<MyOrderClient />} />

        <Route path='/profile' element={<UserDetailClient />} />

        <Route path='/blog' element={<BlogClient />} />

        <Route path='/contact' element={<ContactClient />} />

        {/* Admin */}
        <Route exact path="/admin/login" element={<LoginAdminScreen />} />
        {/* Dashboard */}
        <Route exact path="admin/dashboard" element={<AdminDashboard />} />
        {/* User */}
        <Route exact path="admin/userlist" element={<AdminUserList />} />
        <Route exact path="admin/user/:id/detail" element={<AdminDetailUser />} />
        {/* Category */}
        <Route exact path="admin/categorylist" element={<AdminCategoryList />} />
        <Route exact path="admin/category/:id/detail" element={<AdminCategoryDetail />} />
        <Route exact path="admin/category/:id/edit" element={<AdminEditCategory />} />
        {/* Product */}
        <Route exact path="admin/productlist" element={<AdminProductList />} />
        <Route exact path="admin/product/:id/detail" element={<AdminDetailProduct />} />
        <Route exact path="admin/product/:id/edit" element={<AdminEditProduct />} />
        {/* Order */}
        <Route exact path="admin/orderlist" element={<AdminOrdertList />} />
        <Route exact path="admin/order/:id/detail" element={<AdminOrderDetail />} />
        {/* Comment */}
        <Route exact path="admin/commentlist" element={<AdminCommentList />} />

        {/* Shipper */}
        <Route exact path="/shipper/login" element={<LoginShipperScreen />} />
        <Route exact path="/shipper/verify/:email" element={<VerifyShipperScreen />} />
        <Route exact path="/shipper/register" element={<RegisterShipperScreen />} />
        <Route exact path="/shipper/home" element={<HomeShipperScreen />} />
        <Route exact path="/shipper/forgotpassword" element={<ForgotPasswordShipper />} />
        <Route exact path="/shipper/forgotpassword/verify/:email" element={<VerifyForgotPasswordShipperScreen />} />
        <Route exact path="/shipper/resetpassword" element={<ResetPasswordShipperScreen />} />

      </Routes>
      {/* <Footer /> */}
      {/* </Fragment> */}
    </AuthWrapper>
  );
}

export default App;

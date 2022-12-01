import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";

import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";
import { ScanProvider } from "./scanner/context";
import { ThemeProvider } from "./context/theme_context";
import { Provider } from 'react-redux';
import store from './store';


ReactDOM.render(
  <Auth0Provider
  domain={process.env.REACT_APP_AUTH_DOMAIN}
  clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
  redirectUri={window.location.origin}
  cacheLocation="localstorage"
>
  <Provider store={store}>
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <ScanProvider>
              <ThemeProvider>
                <Router>
                  <App />
                </Router>
              </ThemeProvider>
            </ScanProvider>
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);

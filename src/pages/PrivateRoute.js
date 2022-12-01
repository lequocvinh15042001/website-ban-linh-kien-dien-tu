import React, { Fragment } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth0();

  return (
    <Fragment>
    <Route
      render={() => {
        return user ? children : <Navigate to="/" />;
      }}
      {...rest}
    ></Route>
    </Fragment>
  );
};
export default PrivateRoute;

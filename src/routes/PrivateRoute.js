import React from "react";

// REACT REDUX
import { useSelector } from "react-redux";

// REACT ROUTER DOM
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    ></Route>
  );
};

export default PrivateRoute;

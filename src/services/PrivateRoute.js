import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      AuthService.getCurrentUser() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/loginv2",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;

import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.user.name}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token: {currentUser.token}</strong>{" "}
        </p>
        <p>
          <strong>Id: {currentUser.user._id}</strong> {currentUser._id}
        </p>
        <p>
          <strong>Email: {currentUser.user.email}</strong> {currentUser.email}
        </p>
      </div>
    );
  }
}

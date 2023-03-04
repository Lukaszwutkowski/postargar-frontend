import React from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { connect } from "react-redux";
import * as authActions from "../redux/authActions";
import UserPage from "./UserPage";

export class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
    error: "",
  };

  onChangeUsername = (event) => {
    const value = event.target.value;
    this.setState({ username: value });
  };

  onChangePassword = (event) => {
    const value = event.target.value;
    this.setState({ password: value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    // Perform validation
    if (this.state.username === "" || this.state.password === "") {
      this.setState({ error: "Please enter a username and password." });
    } else if (this.state.password.length < 8) {
      this.setState({ error: "Password must be at least 8 characters long." });
    } else {
      // If validation passes, proceed with login
      axios
        .post("http://localhost:8080/api/1.0/login", {
          username: this.state.username,
          password: this.state.password,
        })
        .then((response) => {
          const token = response.data.access_token;
          this.setState({ token: token });
          this.mapDispatchToProps(UserPage);
        })
        .catch((error) => {
          // Handle error
          this.setState({ error: "Login failed. Please try again." });
        });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6">
            <Form onSubmit={this.onSubmit}>
              <h1>Login</h1>

              {this.state.error && (
                <Alert color="danger">{this.state.error}</Alert>
              )}

              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </FormGroup>

              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </FormGroup>

              <Button color="primary" type="submit">
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      postLogin: (body) => dispatch(authActions.loginHandler(body)),
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);

import React from "react";

export class UserSignupPage extends React.Component {
  state = {
    displayName: "",
    username: "",
    password: "",
    passwordRepeat: "",
    errors: {},
  };

  onChangeDisplayName = (event) => {
    const value = event.target.value;
    this.setState({ displayName: value });
  };

  onChangeUsername = (event) => {
    const value = event.target.value;
    this.setState({ username: value });
  };

  onChangePassword = (event) => {
    const value = event.target.value;
    this.setState({ password: value });
  };

  onChangePasswordRepeat = (event) => {
    const value = event.target.value;
    this.setState({ passwordRepeat: value });
  };

  validateInput = () => {
    const { displayName, username, password, passwordRepeat } = this.state;
    const errors = {};
    if (!displayName.trim()) {
      errors.displayName = "Display name is required";
    }
    if (!username.trim()) {
      errors.username = "Username is required";
    }
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (password !== passwordRepeat) {
      errors.passwordRepeat = "Passwords do not match";
    }
    this.setState({ errors });
  };

  onClickSignup = () => {
    const user = {
      username: this.state.username,
      displayName: this.state.displayName,
      password: this.state.password,
    };
    this.props.actions.postSignup(user);
  };

  render() {
    const { displayName, username, password, passwordRepeat, errors } =
      this.state;

    return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title text-center mb-4">Sign Up</h1>
                <form>
                  <div className="form-group">
                    <label htmlFor="displayNameInput">Your display name</label>
                    <input
                      placeholder="Your display name"
                      type="text"
                      className={`form-control ${
                        errors.displayName ? "is-invalid" : ""
                      }`}
                      id="displayNameInput"
                      value={displayName}
                      onChange={this.onChangeDisplayName}
                      onBlur={this.validateInput}
                    />
                    {errors.displayName && (
                      <div className="invalid-feedback">
                        {errors.displayName}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input
                      placeholder="Your username"
                      type="text"
                      className={`form-control ${
                        errors.username ? "is-invalid" : ""
                      }`}
                      id="usernameInput"
                      value={username}
                      onChange={this.onChangeUsername}
                      onBlur={this.validateInput}
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input
                      placeholder="Your password"
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="passwordInput"
                      value={password}
                      onChange={this.onChangePassword}
                      onBlur={this.validateInput}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordRepeatInput">Repeat Password</label>
                    <input
                      placeholder="Repeat your password"
                      type="password"
                      className={`form-control ${
                        errors.passwordRepeat ? "is-invalid" : ""
                      }`}
                      id="passwordRepeatInput"
                      value={passwordRepeat}
                      onChange={this.onChangePasswordRepeat}
                      onBlur={this.validateInput}
                    />
                    {errors.passwordRepeat && (
                      <div className="invalid-feedback">
                        {errors.passwordRepeat}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={this.onClickSignup}
                  >
                    Sign up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
UserSignupPage.defaultProps = {
  actions: {
    postSignup: () =>
      new Promise((resolve, reject) => {
        resolve({});
      }),
  },
};

export default UserSignupPage;

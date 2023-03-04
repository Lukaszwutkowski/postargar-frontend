import React from "react";
import UserList from "../components/UserList";
import { connect } from "react-redux";

class HomePage extends React.Component {
  render() {
    const { isLoggedIn } = this.props.loggedInUser;

    return (
      <div data-testid="homepage">
        <div className="row">
          {isLoggedIn && (
            <div className="col-8">
              <h2>Submit your POSTAGRAM here!</h2>
            </div>
          )}
          <div className={isLoggedIn ? "col-4" : "col-12"}>
            <UserList />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state,
  };
};

export default connect(mapStateToProps)(HomePage);

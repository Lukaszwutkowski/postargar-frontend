import React, { Component } from "react";
import * as apiCalls from "../api/apiCalls";
import UserListItem from "./UserListItem";

class UserList extends Component {
  state = {
    page: {
      content: [],
      number: 0,
      size: 3,
    },
    loadError: undefined,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = (requestedPage = 0) => {
    apiCalls
      .listUsers({ page: requestedPage, size: 3 })
      .then((response) => {
        this.setState({
          page: response.data,
          loadError: undefined,
        });
      })
      .catch((error) => {
        this.setState({ loadError: "User load failed" });
      });
  };

  onClickNext = () => {
    const nextPage = this.state.page.number + 1;
    this.loadData(nextPage);
  };

  onClickPrevious = () => {
    const previousPage = this.state.page.number - 1;
    this.loadData(previousPage);
  };

  render() {
    const { content, first, last } = this.state.page;
    return (
      <div className="card">
        <h3 className="card-title m-auto">Users</h3>
        <div className="list-group list-group-flush" data-testid="usergroup">
          {content.map((user) => (
            <UserListItem key={user.username} user={user} />
          ))}
        </div>
        <div className="clearfix">
          {!first && (
            <span
              className="badge badge-light float-left"
              style={{ cursor: "pointer" }}
              onClick={this.onClickPrevious}
            >
              &lt; previous
            </span>
          )}
          {!last && (
            <span
              className="badge badge-light float-right"
              style={{ cursor: "pointer" }}
              onClick={this.onClickNext}
            >
              next &gt;
            </span>
          )}
        </div>
        {this.state.loadError && (
          <span className="text-center text-danger">
            {this.state.loadError}
          </span>
        )}
      </div>
    );
  }
}

export default UserList;

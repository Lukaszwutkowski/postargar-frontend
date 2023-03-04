import React, { useEffect, useReducer } from "react";
import * as apiCalls from "../api/apiCalls";
import { connect } from "react-redux";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, user: action.payload, loading: false };
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const UserPage = ({ userId }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch({ type: "LOADING" });
      try {
        const user = await apiCalls.login(userId);
        dispatch({ type: "SUCCESS", payload: user });
      } catch (error) {
        dispatch({ type: "ERROR", payload: error.message });
      }
    };
    fetchUser();
  }, [userId]);

  const { user, loading, error } = state;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      {/* render other user details */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state,
  };
};

export default connect(mapStateToProps)(UserPage);

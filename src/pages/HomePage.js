import React, { useState, useEffect } from "react";
import * as apiCalls from "../api/apiCalls";
import { connect } from "react-redux";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await apiCalls.login();
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadPosts();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Posts</h1>
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4 mb-4" key={post.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state,
  };
};

export default connect(mapStateToProps)(HomePage);

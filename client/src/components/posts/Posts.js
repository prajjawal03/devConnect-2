import React, { useEffect } from "react";
import PostItem from "./PostItem";
import ProfileForm from "./ProfileForm";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";

const Posts = ({ post: { posts }, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <>
      <ProfileForm />
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} discussion={true} />
        ))}
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPosts })(Posts);

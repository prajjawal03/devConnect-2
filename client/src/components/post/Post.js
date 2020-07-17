import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
const Post = ({ match, getPost, post, loading }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} />
    </>
  );
};
const mapStateToProps = (state) => ({
  post: state.post.post,
  loading: state.post.loading,
});
export default connect(mapStateToProps, { getPost })(Post);

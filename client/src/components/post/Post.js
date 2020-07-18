import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
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
      <CommentForm post={post} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postID={post._id} />
        ))}
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  post: state.post.post,
  loading: state.post.loading,
});
export default connect(mapStateToProps, { getPost })(Post);

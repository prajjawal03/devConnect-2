import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deletePost } from "../../actions/post";
const PostItem = ({ post, discussion = false, deletePost, auth }) => {
  const { name, text, date, user, _id } = post;
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            class="round-img"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p class="post-date">Posted on{date}</p>
        <button type="button" class="btn btn-light">
          <i class="fas fa-thumbs-up"></i>
        </button>
        <button type="button" class="btn btn-light">
          <i class="fas fa-thumbs-down"></i>
        </button>
        {discussion && (
          <>
            <Link to={`/posts/${_id}`} class="btn btn-primary">
              Discussion <span class="comment-count">3</span>
            </Link>
            {!auth.loading && user === auth.user._id && (
              <>
                <button
                  onClick={() => deletePost(_id)}
                  type="button"
                  class="btn btn-danger"
                >
                  <i class="fas fa-times">delete</i>
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deletePost })(PostItem);

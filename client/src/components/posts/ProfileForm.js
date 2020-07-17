import React, { useState } from "react";
import { connect } from "react-redux";
import { createPost } from "../../actions/post";
const ProfileForm = ({ createPost }) => {
  const [text, setText] = useState("");
  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    createPost({ text });
    setText("");
  };
  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form class="form my-1" onSubmit={onSubmit}>
        <textarea
          onChange={onChange}
          value={text}
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
        ></textarea>
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};
export default connect(null, { createPost })(ProfileForm);

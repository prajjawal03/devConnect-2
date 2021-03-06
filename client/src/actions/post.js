import {
  GET_POSTS,
  POST_ERROR,
  CREATE_POST,
  DELETE_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./types";
import { getalert } from "./alert";
import axios from "axios";
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/posts/");
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: err.response.data.msg });
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/post/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.msg,
    });
  }
};
export const createPost = (text) => async (dispatch) => {
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/posts", text, config);
    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });
    dispatch(getalert("post created", "success"));
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.msg,
    });
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/posts/${id}`);
    dispatch({ type: DELETE_POST, payload: id });
    dispatch(getalert("post deleted", "success"));
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.msg,
    });
  }
};
export const addComment = (id, text) => async (dispatch) => {
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/posts/comment/${id}`, text, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(getalert("comment added", "success"));
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.msg,
    });
  }
};
export const deleteComment = (postID, _id) => async (dispatch) => {
  try {
    await axios.delete(`/posts/comment/${postID}/${_id}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: _id,
    });
    dispatch(getalert("comment deleted", "success"));
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.msg,
    });
  }
};

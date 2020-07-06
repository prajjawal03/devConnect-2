import axios from "axios";
import { getalert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_FAIL,
  LOGOUT,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
export const loaduser = () => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);
  try {
    const res = await axios.get("/auth");
    console.log(res);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_FAIL, payload: err.response.data.msg });
  }
};
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  const body = {
    name,
    email,
    password,
  };
  try {
    const res = await axios.post("/user/", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loaduser());
  } catch (err) {
    dispatch(getalert(err.response.data.msg, "danger"));
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  const body = {
    email,
    password,
  };
  try {
    const res = await axios.post("/auth/", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loaduser());
  } catch (err) {
    dispatch(getalert(err.response.data.msg, "danger"));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

import axios from "axios";
import { GET_PROFILE, PROFILE_ERROR } from "./types";
export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.msg,
    });
  }
};

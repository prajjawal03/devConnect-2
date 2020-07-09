import axios from "axios";
import { getalert } from "./alert";
import { GET_PROFILE, CREATE_PROFILE, PROFILE_ERROR } from "./types";
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
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/profile/", formData, config);
    dispatch({
      type: CREATE_PROFILE,
      payload: res.data,
    });
    dispatch(getalert(edit ? "profile updated" : "profile created", "success"));
    if (!edit) history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.msg,
    });
  }
};

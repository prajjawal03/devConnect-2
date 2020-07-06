import { GET_ALERT, REMOVE_ALERT } from "./types";
import { v4 } from "uuid";
export const getalert = (msg, type, timeout = 4000) => async (dispatch) => {
  const id = v4();
  dispatch({
    type: GET_ALERT,
    payload: {
      msg,
      type,
      id,
    },
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

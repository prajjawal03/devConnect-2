import { GET_PROFILE, CREATE_PROFILE, PROFILE_ERROR } from "../actions/types";
const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case CREATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}

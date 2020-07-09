import { GET_KHU_NHA, SET_LOADING } from "../actions/types";

const initialState = {
  khuNhaArr: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_KHU_NHA:
      return {
        ...state,
        khuNhaArr: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

import { GET_LOAI_PHONG, SET_LOADING } from "../actions/types";

const initialState = {
  loaiPhongArr: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOAI_PHONG:
      return {
        ...state,
        loaiPhongArr: action.payload,
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

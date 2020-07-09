import { GET_LOAI_PHONG, SET_LOADING } from "./types";

export const getLoaiPhong = () => {
  return async (dispatch) => {
    setLoading();
    const res = await fetch(`/api/loaiphong/getall`);
    const data = await res.json();
    dispatch({
      type: GET_LOAI_PHONG,
      payload: data.data,
    });
  };
};

//Set Loading
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

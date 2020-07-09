import { GET_KHU_NHA, SET_LOADING } from "./types";

export const getKhuNha = () => {
  return async (dispatch) => {
    setLoading();
    const res = await fetch(`/api/khunha/getall`);
    const data = await res.json();
    dispatch({
      type: GET_KHU_NHA,
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

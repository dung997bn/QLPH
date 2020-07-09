import {
  GET_LIST_TIME_DANG_KY,
  GET_LIST_TIME_KET_THUC,
  DANG_KY,
  SET_LOADING,
  GET_CURRENT_BOOKING,
  GET_PHONG,
  GET_ALL_LANH_DAO,
  GET_LANH_DAO_BY_ID,
  SET_THANH_PHAN_LIST,
  GET_THANH_PHAN_BY_ID,
  XOA_THANH_PHAN,
  RESET_FORM,
} from "./types";
import axios from "axios";
import M from "materialize-css/dist/js/materialize.min.js";

export const getListTimeDangKy = () => {
  return async (dispatch) => {
    setLoading();
    const res = await fetch(`/api/dangky/getlisttime`);
    const data = await res.json();
    dispatch({
      type: GET_LIST_TIME_DANG_KY,
      payload: data.data,
    });
  };
};

export const getListTimeKetThuc = (startTime) => {
  return async (dispatch) => {
    setLoading();
    const res = await fetch(
      `/api/dangky/getlisttime${
        startTime !== "" ? "?startTime=" + startTime : ""
      }`
    );
    const data = await res.json();
    dispatch({
      type: GET_LIST_TIME_KET_THUC,
      payload: data.data,
    });
  };
};

//Get Phong
export const getPhong = () => {
  return async (dispatch) => {
    setLoading();
    const res = await fetch(`/api/phong/getall`);
    const data = await res.json();
    dispatch({
      type: GET_PHONG,
      payload: data.data,
    });
  };
};

//GetLanhDao
export const getLanhDao = () => {
  return async (dispatch) => {
    setLoading();
    const res = await fetch(`/api/lanhdao/getall`);
    const data = await res.json();
    dispatch({
      type: GET_ALL_LANH_DAO,
      payload: data.data,
    });
  };
};
export const getLanhDaoById = (Id) => {
  return async (dispatch) => {
    setLoading();
    const res = await fetch(`/api/lanhdao/get?Id=${Id}`);
    const data = await res.json();
    dispatch({
      type: GET_LANH_DAO_BY_ID,
      payload: data.data,
    });
  };
};
export const getThanhPhanById = (Id) => {
  return async (dispatch) => {
    setLoading();
    const res = await fetch(`/api/lanhdao/get?Id=${Id}`);
    const data = await res.json();
    dispatch({
      type: GET_THANH_PHAN_BY_ID,
      payload: data.data,
    });
  };
};
export const setThanhPhanText = (thanhPhanList) => {
  return {
    type: SET_THANH_PHAN_LIST,
    payload: thanhPhanList,
  };
};

export const xoaThanhPhan = () => {
  return {
    type: XOA_THANH_PHAN,
  };
};
//get Current Booking for modal
export const getCurrentBooking = (idPhong, startTime) => {
  return {
    type: GET_CURRENT_BOOKING,
    idPhong: idPhong,
    startTime: startTime,
  };
};

//Dang ky
export const dangky = (formDangKy) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return async (dispatch) => {
    await axios
      .post("/api/dangky/postForm", JSON.stringify(formDangKy), config)
      .then((response) => {
        M.toast({
          html: "Đăng ký thành công",
        });
        dispatch({
          type: DANG_KY,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        // M.toast({
        //   html: "Đăng ký không thành công. Vui lòng đăng ký lại",
        // });
        return;
      });
  };
};

export const resetForm = () => {
  return {
    type: RESET_FORM,
  };
};

//Set Loading
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

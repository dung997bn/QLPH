import {
  GET_LIST_TIME_DANG_KY,
  GET_LIST_TIME_KET_THUC,
  DANG_KY,
  SET_LOADING,
  GET_CURRENT_BOOKING,
  GET_PHONG,
  GET_ALL_LANH_DAO,
  GET_LANH_DAO_BY_ID,
  GET_THANH_PHAN_BY_ID,
  SET_THANH_PHAN_LIST,
  XOA_THANH_PHAN,
  RESET_FORM,
} from "../actions/types";

const initialState = {
  listTimeDangKy: null,
  loading: false,
  listTimeKetThuc: null,
  currentRoom: 0,
  currentStartTime: "",
  listPhong: null,
  listLanhDao: null,
  lanhDaoState: null,
  thanhPhan: null,
  listThanhPhan: "",
  removed: false,
  msgDangKyForm: "",
  dangKyError: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_TIME_DANG_KY:
      return {
        ...state,
        listTimeDangKy: action.payload,
        loading: false,
      };
    case GET_LIST_TIME_KET_THUC:
      return {
        ...state,
        listTimeKetThuc: action.payload,
        loading: false,
      };
    case GET_CURRENT_BOOKING:
      return {
        ...state,
        currentRoom: action.idPhong,
        currentStartTime: action.startTime,
      };
    case GET_PHONG:
      return {
        ...state,
        listPhong: action.payload,
        loading: false,
      };
    case GET_ALL_LANH_DAO:
      return {
        ...state,
        listLanhDao: action.payload,
        loading: false,
      };
    case GET_LANH_DAO_BY_ID:
      return {
        ...state,
        lanhDaoState: action.payload,
        loading: false,
      };
    case GET_THANH_PHAN_BY_ID:
      return {
        ...state,
        thanhPhan: action.payload,
        loading: false,
      };
    case SET_THANH_PHAN_LIST:
      return {
        ...state,
        listThanhPhan: action.payload,
        loading: false,
      };
    case XOA_THANH_PHAN:
      return {
        ...state,
        listThanhPhan: state.listThanhPhan.substring(
          state.listThanhPhan,
          state.listThanhPhan.lastIndexOf(",")
        ),
        thanhPhan: null,
        removed: !state.removed,
      };
    case DANG_KY:
      return {
        ...state,
        loading: true,
        msgDangKyForm: action.payload,
        dangKyError: "",
      };
    case RESET_FORM:
      return {
        ...state,
        thanhPhan: null,
        listThanhPhan: "",
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

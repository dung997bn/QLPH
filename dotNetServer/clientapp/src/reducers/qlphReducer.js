import {
  GET_WEEKLY_TABLE,
  SET_LOADING,
  GO_TO_PRE_WEEK,
  GO_TO_THIS_WEEK,
  GO_TO_NEXT_WEEK,
  GO_TO_PRE_DAY,
  GO_TO_THIS_DAY,
  GO_TO_NEXT_DAY,
  SET_INFO,
  GET_DAILY_TABLE,
  GO_TO_DAILY,
  SELECT_KHU_NHA,
  SELECT_LOAI_PHONG,
  GO_TO_WEEKLY,
} from "../actions/types";

import moment from "moment";
const initialState = {
  weeklyTable: null,
  dailyTable: null,
  loading: false,
  error: null,
  selectTime: "now",
  selectTimeDay: "nowDay",
  toDay: moment().isoWeekday(1),
  infoDangKy: null,
  idKhuNha: 0,
  idLoaiPhong: 0,
  dateSelected: moment(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WEEKLY_TABLE:
      return {
        ...state,
        weeklyTable: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GO_TO_PRE_WEEK:
      return {
        ...state,
        selectTime: action.payload,
        toDay: action.today,
      };
    case GO_TO_THIS_WEEK:
      return {
        ...state,
        selectTime: action.payload,
        toDay: action.today,
      };
    case GO_TO_NEXT_WEEK:
      return {
        ...state,
        selectTime: action.payload,
        toDay: action.today,
      };

    //Daily
    case GO_TO_DAILY:
      return {
        ...state,
        dateSelected: action.payload,
        loading: false,
      };
    case GET_DAILY_TABLE:
      return {
        ...state,
        dailyTable: action.payload,
        loading: false,
      };
    case GO_TO_WEEKLY:
      return {
        ...state,
        toDay: action.payload,
      };

    case GO_TO_PRE_DAY:
      return {
        ...state,
        selectTimeDay: action.payload,
        dateSelected: action.dateSelected,
      };
    case GO_TO_THIS_DAY:
      return {
        ...state,
        selectTimeDay: action.payload,
        dateSelected: action.dateSelected,
      };
    case GO_TO_NEXT_DAY:
      return {
        ...state,
        selectTimeDay: action.payload,
        dateSelected: action.dateSelected,
      };
    case SET_INFO:
      return {
        ...state,
        infoDangKy: action.payload,
      };
    //Selected
    case SELECT_KHU_NHA:
      return {
        ...state,
        idKhuNha: action.payload,
        dailyTable: null,
        weeklyTable: null,
      };
    case SELECT_LOAI_PHONG:
      return {
        ...state,
        idLoaiPhong: action.payload,
        dailyTable: null,
        weeklyTable: null,
      };

    default:
      return state;
  }
};

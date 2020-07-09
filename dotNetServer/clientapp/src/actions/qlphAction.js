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
} from "./types";
import moment from "moment";

// Weekly
export const getWeeklyTable = (toDay, IdKhuNha, IdLoaiPhong) => {
  return async (dispatch) => {
    setLoading();
    const res = await fetch(
      `/api/home/index?toDay=${
        toDay !== "" ? moment(toDay).format("YYYY-MM-DD") : ""
      }${IdKhuNha > 0 ? "&IdKhuNha=" + IdKhuNha : ""}${
        IdLoaiPhong > 0 ? "&IdLoaiPhong=" + IdLoaiPhong : ""
      }`
    );
    const data = await res.json();

    dispatch({
      type: GET_WEEKLY_TABLE,
      payload: data.data,
    });
  };
};

//Go to weekly
export const goToWeekly = (toDay) => {
  return {
    type: GO_TO_WEEKLY,
    payload: moment(toDay).isoWeekday(1),
  };
};

export const goToPreWeek = (toDay) => {
  return {
    type: GO_TO_PRE_WEEK,
    payload: "pre",
    today: moment(toDay).subtract(7, "days"),
  };
};

export const goToThisWeek = () => {
  return {
    type: GO_TO_THIS_WEEK,
    payload: "now",
    today: moment().isoWeekday(1),
  };
};

export const goToNextWeek = (toDay) => {
  return {
    type: GO_TO_NEXT_WEEK,
    payload: "next",
    today: moment(toDay).add(7, "days"),
  };
};

//Daily
export const goToDaily = (daySelected) => {
  setLoading();
  return {
    type: GO_TO_DAILY,
    payload: daySelected,
  };
};

export const getDailyTable = (idKhuNha, idLoaiPhong, date) => {
  return async (dispatch) => {
    setLoading();
    var url = `/api/home/index/daily?date=${moment(date).format("YYYY-MM-DD")}`;
    if (idKhuNha > 0) {
      url += `&idKhuNha=${idKhuNha}`;
    }
    if (idLoaiPhong > 0) {
      url += `&idLoaiPhong=${idLoaiPhong}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    dispatch({
      type: GET_DAILY_TABLE,
      payload: data.data,
    });
  };
};

export const goToPreDay = (selectedDay) => {
  return {
    type: GO_TO_PRE_DAY,
    payload: "preDay",
    dateSelected: moment(selectedDay).subtract(1, "days"),
  };
};

export const goToThisDay = () => {
  return {
    type: GO_TO_THIS_DAY,
    payload: "nowDay",
    dateSelected: moment(),
  };
};

export const goToNextDay = (selectedDay) => {
  return {
    type: GO_TO_NEXT_DAY,
    payload: "nextDay",
    dateSelected: moment(selectedDay).add(1, "days"),
  };
};

export const setInfo = (item) => {
  return (dispatch) => {
    dispatch({
      type: SET_INFO,
      payload: item,
    });
  };
};

//Selected
export const selectKhuNha = (Id) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_KHU_NHA,
      payload: Id,
    });
  };
};

export const selectLoaiPhong = (Id) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_LOAI_PHONG,
      payload: Id,
    });
  };
};
//Set Loading
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

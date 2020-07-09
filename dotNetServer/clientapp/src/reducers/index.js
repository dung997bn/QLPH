import { combineReducers } from "redux";
import qlphReducer from "./qlphReducer";
import loaiPhongReducer from "./loaiPhongReducer";
import khuNhaReducer from "./khuNhaReducer";
import dangKyReducer from "./dangKyReducer";

export default combineReducers({
  QLPH: qlphReducer,
  LoaiPhong: loaiPhongReducer,
  KhuNha: khuNhaReducer,
  DangKy: dangKyReducer,
});

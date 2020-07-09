import React, { useState, useEffect } from "react";
import ListTimeOptions from "../optionSelectList/ListTimeOptions";
import ListTimeKetThuc from "../optionSelectList/ListTimeKetThucOptions";
import PhongOptions from "../optionSelectList/PhongOptions";
import LanhDaoOptions from "../optionSelectList/LanhDaoOptions";
import LanhDaoInfo from "./LanhDaoInfo";
import ThanhPhanInfo from "./ThanhPhanInfo";
import { connect } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";

import {
  getListTimeKetThuc,
  getLanhDaoById,
  getThanhPhanById,
  xoaThanhPhan,
  dangky,
  resetForm,
} from "../../actions/dangKyAction";
import { goToWeekly } from "../../actions/qlphAction";

const BookingModal = ({
  info,
  DangKy: { currentRoom, currentStartTime, listThanhPhan },
  QLPH: { dateSelected },
  getListTimeKetThuc,
  getLanhDaoById,
  getThanhPhanById,
  xoaThanhPhan,
  dangky,
  resetForm,
  goToWeekly,
}) => {
  const [noiDungCuocHop, setNoiDungCuocHop] = useState("");
  const [phongDangKy, setPhongDangKy] = useState("");
  const [batDau, setBatDau] = useState("");
  const [ketThuc, setKetThuc] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [lanhDao, setLanhDao] = useState(0);
  const [thanhPhan, setThanhPhan] = useState("");
  const [ghiChu, setGhiChu] = useState("");

  useEffect(() => {
    if (currentRoom) {
      setPhongDangKy(currentRoom);
    }
    if (currentStartTime) {
      let hourToSet = moment(currentStartTime, ["h:mm A"]);
      setBatDau(hourToSet.format("HH:mm"));
      getListTimeKetThuc(hourToSet.format("HH:mm"));
    }
    // eslint-disable-next-line
  }, [currentRoom, currentStartTime]);
  const history = useHistory();
  const onSubmitDangKy = () => {
    const email = info.accountInfo.account.userName;
    const tenNguoiDangKy = info.accountInfo.account.name;

    const dangKyForm = {
      noi_dung: noiDungCuocHop,
      id_phong: parseInt(phongDangKy),
      bat_dau: batDau,
      ket_thuc: ketThuc,
      sdt: soDienThoai,
      id_lanhdao: parseInt(lanhDao),
      thanh_phan: listThanhPhan,
      ngay_dang_ky: moment(dateSelected).format("YYYY-MM-DD"),
      ghi_chu: ghiChu,
      ten_nguoi_dang_ky: tenNguoiDangKy,
      email: email,
    };
    dangky(dangKyForm).then(() => {
      setNoiDungCuocHop("");
      setBatDau("");
      setKetThuc("");
      setPhongDangKy("");
      setSoDienThoai("");
      setLanhDao("");
      setThanhPhan("");
      setGhiChu("");
      resetForm();

      goToWeekly(dateSelected);

      setTimeout(function () {
        history.push("/");
      }, 3000);
    });
  };

  return (
    <div id="booking-modal" className="modal" style={{ maxHeight: "85%" }}>
      <div className="modal-content" style={{ fontSize: "14px" }}>
        <h4 style={{ textAlign: "center" }}>Thông tin đăng ký cuộc họp</h4>
        <div className="row">
          <div className="input-field col s12">
            <textarea
              name="noiDungCuocHop"
              value={noiDungCuocHop}
              onChange={(e) => setNoiDungCuocHop(e.target.value)}
              className="materialize-textarea"
            ></textarea>
            <label htmlFor="noiDungCuocHop">Nội dung cuộc họp</label>
          </div>
        </div>

        <div className="row ">
          <div className="col s12 m4">
            <label>Chọn phòng</label>
            <select
              className="browser-default"
              value={phongDangKy}
              name="phongDangKy"
              onChange={(e) => setPhongDangKy(e.target.value)}
            >
              <option selected>Chọn phòng</option>
              <PhongOptions />
            </select>
          </div>
          <div className=" col s12 m4">
            <label>Bắt đầu</label>
            <select
              className="browser-default"
              value={batDau}
              name="batDau"
              required
              onChange={(e) => {
                setBatDau(e.target.value);
                getListTimeKetThuc(e.target.value);
              }}
            >
              <option value="" selected>
                Chọn thời gian bắt đầu
              </option>
              <ListTimeOptions />
            </select>
          </div>
          <div className="col s12 m4">
            <label>Kết thúc</label>
            <select
              className="browser-default"
              value={ketThuc}
              required
              name="ketThuc"
              onChange={(e) => {
                setKetThuc(e.target.value);
              }}
            >
              <option value="" disabled selected>
                Chọn thời gian kết thúc
              </option>
              <ListTimeKetThuc />
            </select>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12 m4">
            <input
              value={soDienThoai}
              name="soDienThoai"
              required
              type="number"
              onChange={(e) => setSoDienThoai(e.target.value)}
            />
            <label htmlFor="soDienThoai">Số điện thoại</label>
          </div>
          <div className="col s12 m8">
            <label>Lãnh đạo</label>
            <select
              className="browser-default"
              value={lanhDao}
              required
              name="lanhDao"
              onChange={(e) => {
                setLanhDao(e.target.value);
                getLanhDaoById(e.target.value);
              }}
            >
              <option value="" disabled selected>
                Chọn lãnh đạo
              </option>
              <LanhDaoOptions />
            </select>
          </div>
        </div>
        <LanhDaoInfo />

        <div className="row">
          <ThanhPhanInfo />
          <div className="col s12 m4">
            <div className="row">
              <label>Chọn thành phần</label>
              <select
                className="browser-default"
                value={thanhPhan}
                required
                name="thanhPhan"
                onChange={(e) => {
                  setThanhPhan(e.target.value);
                  getThanhPhanById(e.target.value);
                }}
              >
                <option value="" selected>
                  Chọn thành phần
                </option>
                <LanhDaoOptions />
              </select>
            </div>
            <div className="row">
              <a
                href="#!"
                className="btn waves-effect waves-teal"
                onClick={() => {
                  xoaThanhPhan();
                }}
              >
                Xóa
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea
              name="ghiChu"
              value={ghiChu}
              onChange={(e) => setGhiChu(e.target.value)}
              className="materialize-textarea"
              required
            ></textarea>
            <label htmlFor="ghiChu">Ghi chú</label>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          style={{ margin: " 0px 0" }}
          className="modal-close waves-effect  btn "
          // disabled
          onClick={() => onSubmitDangKy()}
        >
          Đăng ký
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  DangKy: state.DangKy,
  QLPH: state.QLPH,
});

export default connect(mapStateToProps, {
  getListTimeKetThuc,
  getLanhDaoById,
  getThanhPhanById,
  xoaThanhPhan,
  dangky,
  goToWeekly,
  resetForm,
})(BookingModal);

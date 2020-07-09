import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const BookingDetailModal = ({ infoDangKy }) => {
  const [noiDung, setNoiDung] = useState("");
  const [thanhPhan, setThanhPhan] = useState("");
  const [ghiChu, setGhiChu] = useState("");
  const [phong, setPhong] = useState("");
  const [lanhDao, setLanhDao] = useState("");
  const [batDau, setBatDau] = useState("");
  const [ketThuc, setKetThuc] = useState("");
  useEffect(() => {
    if (infoDangKy) {
      setNoiDung(infoDangKy.noi_dung);
      setThanhPhan(infoDangKy.thanh_phan);
      setGhiChu(infoDangKy.ghi_chu);
      setPhong(infoDangKy.phong);
      setLanhDao(infoDangKy.lanh_dao);
      setBatDau(infoDangKy.bat_dau);
      setKetThuc(infoDangKy.ket_thuc);
      console.log(infoDangKy);
    }

    // eslint-disable-next-line
  }, [infoDangKy]);

  return (
    <div
      id="booking-detail-modal"
      className="modal"
      style={{ maxHeight: "100%" }}
    >
      <div
        className="modal-content"
        style={{ textAlign: "center", fontSize: "16px" }}
      >
        <h4>Thông tin phòng họp</h4>
        <div className="row">
          <h5>
            {phong.ten_phong} ({batDau} - {ketThuc})
          </h5>
        </div>
        <div className="row">
          <h6>{noiDung}</h6>
        </div>
        <div className="row">
          <p>
            <strong>Thành phần: </strong>
            {thanhPhan}
          </p>
        </div>
        <div className="row">
          <p>
            <strong>Chủ trì: </strong>
            {lanhDao.ho_ten}-{lanhDao.chuc_vu}
          </p>
        </div>
        <div className="row">
          <p>
            <strong>Đơn vị công tác: </strong>
            {lanhDao.don_vi_cong_tac}
          </p>
        </div>
        <div className="row">
          <p>
            <strong>Ghi chú: </strong>
            {ghiChu}
          </p>
        </div>
      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-close waves-green btn-flat">
          Quay lại
        </a>
      </div>
    </div>
  );
};

BookingDetailModal.protoType = {
  infoDangKy: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  infoDangKy: state.QLPH.infoDangKy,
});

export default connect(mapStateToProps)(BookingDetailModal);

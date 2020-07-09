import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import KhuNhaOptions from "../optionSelectList/KhuNhaOptions";
import LoaiPhongOptions from "../optionSelectList/LoaiPhongOptions";
import { selectLoaiPhong, selectKhuNha } from "../../actions/qlphAction";
import PropTypes from "prop-types";
import moment from "moment";
import { useHistory } from "react-router-dom";
import DateTimePicker from "./DateTimePicker";

const BodyHeader = ({
  info,
  QLPH: { idKhuNha, idLoaiPhong, dateSelected, toDay },
  selectLoaiPhong,
  selectKhuNha,
}) => {
  const [loaiPhong, setLoaiPhong] = useState(0);
  const [khuNha, setKhuNha] = useState(0);

  const history = useHistory();
  const currentUrl = history.location.pathname;

  useEffect(() => {
    if (idKhuNha) {
      setKhuNha(idKhuNha);
    }
    if (idLoaiPhong) {
      setLoaiPhong(idLoaiPhong);
    }
    // eslint-disable-next-line
  }, []);

  const { authenticationState } = info;
  if (authenticationState === "Authenticated") {
    return (
      <Fragment>
        <div
          className="row"
          style={{ textAlign: "center", marginBottom: "0px" }}
        >
          <h3>Đăng ký phòng họp</h3>
          <div>
            {currentUrl.indexOf("daily") !== -1 ? (
              <h5>Ngày {moment(dateSelected).format("DD/MM/YYYY")}</h5>
            ) : (
              <h5>{`${moment(toDay).format("MMMM")} ${moment(toDay).format(
                "YYYY"
              )} (Tuần ${moment(toDay).week()}) `}</h5>
            )}
          </div>
        </div>
        <div className="row" style={{ marginBottom: "0px" }}>
          <div className="col s12 m6 l8 left-align">
            <DateTimePicker />
          </div>
          <div className="col s12 m3 l2">
            <select
              className="browser-default"
              name="khuNha"
              value={khuNha}
              onChange={(e) => {
                selectKhuNha(e.target.value);
                setKhuNha(e.target.value);
              }}
            >
              <option value="0">Chọn khu nhà</option>
              <KhuNhaOptions />
            </select>
          </div>
          <div className="col s12 m3 l2">
            <select
              className="browser-default"
              name="loaiPhong"
              value={loaiPhong}
              onChange={(e) => {
                selectLoaiPhong(e.target.value);
                setLoaiPhong(e.target.value);
              }}
            >
              <option value="0">Chọn loại phòng</option>
              <LoaiPhongOptions />
            </select>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return null;
  }
};

BodyHeader.protoTypes = {
  QLPH: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  QLPH: state.QLPH,
});

export default connect(mapStateToProps, { selectLoaiPhong, selectKhuNha })(
  BodyHeader
);

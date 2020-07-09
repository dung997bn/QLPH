import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setInfo } from "../../../actions/qlphAction";

const ItemLink = ({ item, setInfo }) => {
  switch (item.tinh_trang) {
    case "Đã chấp nhận":
      return (
        <div style={{ maxHeight: "50px", overflowY: "auto" }}>
          <a
            href="#booking-detail-modal"
            className="modal-trigger"
            onClick={() => setInfo(item)}
          >
            <span
              className="new badge red"
              data-badge-caption=""
            >{`${item.bat_dau}-${item.ket_thuc} :${item.noi_dung}`}</span>
          </a>
        </div>
      );
    case "Đang chờ xử lý":
      return (
        <div style={{ maxHeight: "50px", overflowY: "auto" }}>
          <a
            href="#booking-detail-modal"
            className="modal-trigger"
            onClick={() => setInfo(item)}
          >
            <span
              className="new badge"
              data-badge-caption=""
            >{`${item.bat_dau}-${item.ket_thuc} :${item.noi_dung}`}</span>
          </a>
        </div>
      );

    default:
      return (
        <div style={{ maxHeight: "50px", overflowY: "auto" }}>
          <a
            href="#booking-detail-modal"
            className="modal-trigger"
            onClick={() => setInfo(item)}
          >
            <span
              class="new badge blue"
              data-badge-caption=""
            >{`${item.bat_dau}-${item.ket_thuc} :${item.noi_dung}`}</span>
          </a>
        </div>
      );
  }
};
ItemLink.protoTypes = {
  item: PropTypes.object.isRequired,
  setInfo: PropTypes.func.isRequired,
};

export default connect(null, { setInfo })(ItemLink);

import React from "react";
import { connect } from "react-redux";
import { getCurrentBooking } from "../../../actions/dangKyAction";

const DailySlotColumn = ({ slot, getCurrentBooking }) => {
  const column = slot;
  if (column.is_room) {
    return (
      <td
        className="room"
        colSpan={column.thoi_gian_dang_ky}
        style={{ width: "2%", maxWidth: "2%" }}
      >
        {column.phong.ten_phong}
      </td>
    );
  } else if (column.is_dangky) {
    if (column.tinh_trang === "Đã chấp nhận") {
      return (
        <td colSpan={column.thoi_gian_dang_ky} style={{ background: "red" }}>
          <div style={{ maxHeight: "30px", overflowY: "auto" }}>
            <span>
              <a className="btnInfo" href="#" style={{ color: "black" }}>
                {column.noi_dung}
              </a>
            </span>
          </div>
        </td>
      );
    }
  } else {
    return (
      <td colSpan={column.thoi_gian_dang_ky}>
        <a
          className="modal-trigger blockLink"
          href="#booking-modal"
          onClick={() => getCurrentBooking(column.phong.id, column.bat_dau)}
        ></a>
      </td>
    );
  }
};

export default connect(null, { getCurrentBooking })(DailySlotColumn);

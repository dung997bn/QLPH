import React from "react";
import ItemsSlot from "./ItemsSlot";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { goToDaily } from "../../../actions/qlphAction";

const SlotColumn = ({ slot, goToDaily }) => {
  const column = slot;
  if (column.is_room) {
    return <td className="room">{column.room_name}</td>;
  } else if (column.is_day && column.is_dang_ky) {
    return (
      <td className="blockLink">
        <ItemsSlot listItem={column.list_dang_ky_of_day} />
        <Link
          to="daily"
          className="modal-trigger"
          onClick={() => goToDaily(column.to_day)}
          className="blockLink"
        ></Link>
      </td>
    );
  } else {
    return (
      <td>
        <Link
          to="daily"
          className="modal-trigger"
          onClick={() => goToDaily(column.to_day)}
          className="blockLink"
        ></Link>
      </td>
    );
  }
};

const mapStateToProps = (state) => ({
  QLPH: state.QLPH,
});
export default connect(mapStateToProps, { goToDaily })(SlotColumn);

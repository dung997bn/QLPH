import React, { Fragment, useEffect } from "react";
import Spinner from "../Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getWeeklyTable } from "../../../actions/qlphAction";
import RowTable from "./RowTable";
import WeeklyMediaButton from "./WeeklyMediaButton";

const WeeklyTable = ({
  QLPH: { weeklyTable, loading, selectTime, toDay, idKhuNha, idLoaiPhong },
  getWeeklyTable,
}) => {
  useEffect(() => {
    getWeeklyTable(toDay, idKhuNha, idLoaiPhong);
    // eslint-disable-next-line
  }, [toDay, selectTime, idKhuNha, idLoaiPhong]);
  if (loading || weeklyTable === null) {
    return (
      <Fragment>
        <Spinner />
      </Fragment>
    );
  } else {
    const rows = weeklyTable.rows;
    const dayNames = weeklyTable.rows[0].header;
    return (
      <Fragment>
        <WeeklyMediaButton />
        <table className="centered weekly">
          <thead>
            <tr>
              <th style={{ width: "9%" }}>Phòng:</th>
              {dayNames &&
                dayNames.map((dayName) => (
                  <th style={{ width: "13%" }} key={dayName.day_of_week}>
                    {dayName.week_day} ({dayName.day_of_week})
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {rows &&
              rows.map((row, index) => <RowTable row={row} key={index} />)}
          </tbody>
        </table>
      </Fragment>
    );
  }
};

WeeklyTable.protoTypes = {
  QLPH: PropTypes.object.isRequired,
  getWeeklyTable: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  QLPH: state.QLPH,
});

export default connect(mapStateToProps, { getWeeklyTable })(WeeklyTable);

import React, { useEffect, Fragment } from "react";
import Spinner from "../Spinner";
import { connect } from "react-redux";
import { getDailyTable } from "../../../actions/qlphAction";
import DailyRow from "./DailyRow";
import DailyMediaButton from "./DailyMediaButton";

const DailyTable = ({
  QLPH: {
    dailyTable,
    loading,
    dateSelected,
    selectTimeDay,
    idKhuNha,
    idLoaiPhong,
  },
  getDailyTable,
}) => {
  useEffect(() => {
    getDailyTable(idKhuNha, idLoaiPhong, dateSelected);
    // eslint-disable-next-line
  }, [dateSelected, selectTimeDay, idKhuNha, idLoaiPhong]);
  if (loading || dailyTable === null) {
    return (
      <Fragment>
        <Spinner />
      </Fragment>
    );
  } else {
    const timeHeaders = dailyTable.rows[0].time_headers;
    const rows = dailyTable.rows;
    return (
      <Fragment>
        <DailyMediaButton />
        <table style={{ tableLayout: "fixed" }} className="centered daily">
          <thead>
            <tr>
              <th style={{ width: "8%" }}>Giờ:</th>
              {timeHeaders &&
                timeHeaders.map((header) => (
                  <th key={header.hour}>{header.name_hour}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {rows &&
              rows.map((row, index) => <DailyRow row={row} key={index} />)}
          </tbody>
        </table>
      </Fragment>
    );
  }
};

const mapStateToProps = (state) => ({
  QLPH: state.QLPH,
});
export default connect(mapStateToProps, { getDailyTable })(DailyTable);

import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  goToPreWeek,
  goToThisWeek,
  goToNextWeek,
} from "../../../actions/qlphAction";

const WeeklyMediaButton = ({
  QLPH: { toDay },
  goToPreWeek,
  goToThisWeek,
  goToNextWeek,
}) => {
  const goPre = () => {
    goToPreWeek(toDay);
  };
  const goThis = () => {
    goToThisWeek();
  };
  const goNext = () => {
    goToNextWeek(toDay);
  };
  return (
    <div
      className="row"
      style={{
        marginBottom: "0px",
      }}
    >
      <div className="col s4 left-align">
        <Link
          className=""
          to="#"
          onClick={(e) => {
            e.preventDefault();
            goPre();
          }}
        >
          <strong>
            <i style={{ color: "black" }} className="material-icons">
              arrow_back
            </i>
          </strong>
        </Link>
      </div>
      <div className="col s4 center-align">
        <Link
          className=""
          to="#"
          onClick={(e) => {
            e.preventDefault();
            goThis();
          }}
        >
          <strong style={{ color: "black" }}>Tuần hiện tại</strong>
        </Link>
      </div>
      <div className="col s4 right-align">
        <Link
          className=""
          to="#"
          onClick={(event) => {
            event.preventDefault();
            goNext();
          }}
        >
          <strong>
            <i style={{ color: "black" }} className="material-icons">
              arrow_forward
            </i>
          </strong>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  QLPH: state.QLPH,
});

export default connect(mapStateToProps, {
  goToPreWeek,
  goToThisWeek,
  goToNextWeek,
})(WeeklyMediaButton);

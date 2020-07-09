import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  goToPreDay,
  goToThisDay,
  goToNextDay,
} from "../../../actions/qlphAction";
const DailyMediaButton = ({
  QLPH: { dateSelected },
  goToPreDay,
  goToThisDay,
  goToNextDay,
}) => {
  const goPreDay = () => {
    goToPreDay(dateSelected);
  };
  const goThisDay = () => {
    goToThisDay();
  };
  const goNextDay = () => {
    goToNextDay(dateSelected);
  };

  return (
    <div
      className="row"
      style={{
        marginBottom: "0px",
      }}
    >
      <div className="col s4 left-align">
        <Link className="" to="#" onClick={goPreDay}>
          <strong>
            <i style={{ color: "black" }} className="material-icons">
              arrow_back
            </i>
          </strong>
        </Link>
      </div>
      <div className="col s4 center-align">
        <Link className="" to="#" onClick={goThisDay}>
          <strong style={{ color: "black" }}>Hôm nay</strong>
        </Link>
      </div>
      <div className="col s4 right-align">
        <Link className="" to="#" onClick={goNextDay}>
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
  goToPreDay,
  goToThisDay,
  goToNextDay,
})(DailyMediaButton);

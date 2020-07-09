import React, { useEffect } from "react";
import { connect } from "react-redux";
import { goToDaily } from "../../actions/qlphAction";
import M from "materialize-css/dist/js/materialize.min.js";
import { useHistory } from "react-router-dom";
//import moment from 'moment';

const DateTimePicker = ({ QLPH: { dateSelected }, goToDaily }) => {
  const history = useHistory();
  useEffect(() => {
    var elemsDatePicker = document.querySelectorAll(".datepicker");
    M.Datepicker.init(elemsDatePicker, {
      format: "yyyy-mm-dd",
      defaultDate: new Date(),
      autoClose: true,
      onSelect: function (date) {
        history.push("/daily");
        goToDaily(date);
      },
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="input-field col s12 m5 l3">
      <i className="material-icons prefix" style={{ fontSize: "25px" }}>
        event_note
      </i>
      <input type="text" id="datepicker" className="datepicker" />
    </div>
  );
};

const mapStateToProps = (state) => ({
  QLPH: state.QLPH,
});

export default connect(mapStateToProps, { goToDaily })(DateTimePicker);

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
const BtnAction = ({ logout }) => {
  useEffect(() => {
    var elemsFloatActions = document.querySelectorAll(".fixed-action-btn");
    M.FloatingActionButton.init(elemsFloatActions, {
      direction: "left",
      hoverEnabled: true,
    });
    // M.AutoInit();
    var elemsModal = document.querySelectorAll(".modal");
    M.Modal.init(elemsModal, null);

    var elemsTooltip = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(elemsTooltip, {
      position: "top",
    });
  }, []);
  return (
    <div className="fixed-action-btn">
      <Link className="btn-floating btn-large green" to="#">
        <i className="large material-icons">mode_edit</i>
      </Link>
      <ul>
        <li>
          <Link
            className="btn-floating blue modal-trigger tooltipped"
            to="/"
            data-tooltip="Back"
            data-position="left"
          >
            <i className="material-icons">fast_rewind</i>
          </Link>
        </li>
        <li>
          <Link
            className="btn-floating red darken-1 tooltipped"
            to="#"
            onClick={logout}
            data-tooltip="Log out"
            data-position="left"
          >
            <i className="material-icons">power_settings_new</i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BtnAction;

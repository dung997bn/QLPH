import React, { Fragment } from "react";
import DailyTable from "../pages/day/DailyTable";
import Carousel from "../pages/Carousel";
import BtnAction from "../pages/BtnActions";
const DailySite = ({ info }) => {
  const { authenticationState, logout } = info;

  if (authenticationState === "Authenticated") {
    return (
      <Fragment>
        <DailyTable />
        <BtnAction logout={logout} />
      </Fragment>
    );
  } else {
    return <Carousel info={info} />;
  }
};

export default DailySite;

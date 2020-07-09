import React, { Fragment } from "react";
import Carousel from "../pages/Carousel";
import WeeklyTable from "../pages/week/WeeklyTable";
import BtnAction from "../pages/BtnActions";

const WeeklySite = ({ info }) => {
  const {
    authenticationState,
    logout,
  } = info;

  if (authenticationState === "Authenticated") {
    return (
      <Fragment>
        <WeeklyTable />
        <BtnAction logout={logout} />
      </Fragment>
    );
  } else {
    return <Carousel info={info} />;
  }
};

export default WeeklySite;

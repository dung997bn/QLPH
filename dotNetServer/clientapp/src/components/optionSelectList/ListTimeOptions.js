import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getListTimeDangKy } from "../../actions/dangKyAction";
const ListTimeOptions = ({
  DangKy: { listTimeDangKy, loading },
  getListTimeDangKy,
}) => {
  useEffect(() => {
    getListTimeDangKy();
    // eslint-disable-next-line
  }, []);
  return (
    !loading &&
    listTimeDangKy !== null &&
    listTimeDangKy.map((time) => (
      <option key={time.value} value={time.text}>
        {time.text}
      </option>
    ))
  );
};

const mapStateToProps = (state) => ({
  DangKy: state.DangKy,
});

export default connect(mapStateToProps, { getListTimeDangKy })(ListTimeOptions);

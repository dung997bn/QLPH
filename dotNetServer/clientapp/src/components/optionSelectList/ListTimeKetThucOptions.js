import React, { useEffect } from "react";
import { connect } from "react-redux";
const ListTimeKetThucOptions = ({ DangKy: { listTimeKetThuc, loading } }) => {
  useEffect(() => {
    // eslint-disable-next-line
  }, [listTimeKetThuc]);
  return (
    !loading &&
    listTimeKetThuc !== null &&
    listTimeKetThuc.map((time) => (
      <option key={time.value} value={time.text}>
        {time.text}
      </option>
    ))
  );
};

const mapStateToProps = (state) => ({
  DangKy: state.DangKy,
});

export default connect(mapStateToProps)(ListTimeKetThucOptions);

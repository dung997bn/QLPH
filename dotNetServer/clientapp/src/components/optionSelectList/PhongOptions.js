import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPhong } from "../../actions/dangKyAction";
const PhongOptions = ({ DangKy: { listPhong, loading }, getPhong }) => {
  useEffect(() => {
    getPhong();
     // eslint-disable-next-line
  }, []);
  return (
    !loading &&
    listPhong !== null &&
    listPhong.map((phong) => (
      <option key={phong.id} value={phong.id}>
        {phong.ten_phong}
      </option>
    ))
  );
};

const mapStateToProps = (state) => ({
  DangKy: state.DangKy,
});

export default connect(mapStateToProps, { getPhong })(PhongOptions);

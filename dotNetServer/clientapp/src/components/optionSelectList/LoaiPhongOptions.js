import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getLoaiPhong } from "../../actions/loaiPhongActions";

const LoaiPhongOptions = ({
  LoaiPhong: { loaiPhongArr, loading },
  getLoaiPhong,
}) => {
  useEffect(() => {
    getLoaiPhong();
    // eslint-disable-next-line
  }, []);
  return (
    !loading &&
    loaiPhongArr !== null &&
    loaiPhongArr.map((loaiPhong) => (
      <option key={loaiPhong.id} value={loaiPhong.id}>
        {loaiPhong.ten_loai_phong}
      </option>
    ))
  );
};

const mapStateToProps = (state) => ({
  LoaiPhong: state.LoaiPhong,
});

export default connect(mapStateToProps, { getLoaiPhong })(LoaiPhongOptions);

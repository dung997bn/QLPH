import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getKhuNha } from "../../actions/khuNhaAction";

const KhuNhaOptions = ({ KhuNha: { khuNhaArr, loading }, getKhuNha }) => {
  useEffect(() => {
    getKhuNha();
    // eslint-disable-next-line
  }, []);
  return (
    !loading &&
    khuNhaArr !== null &&
    khuNhaArr.map((khunha) => (
      <option key={khunha.id} value={khunha.id}>
        {khunha.ten_khu_nha}
      </option>
    ))
  );
};

const mapStateToProps = (state) => ({
  KhuNha: state.KhuNha,
});

export default connect(mapStateToProps, { getKhuNha })(KhuNhaOptions);

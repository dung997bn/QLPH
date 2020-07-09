import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getLanhDao } from "../../actions/dangKyAction";
const LanhDaoOptions = ({ DangKy: { listLanhDao, loading }, getLanhDao }) => {
  useEffect(() => {
    getLanhDao();
     // eslint-disable-next-line
  }, []);
  return (
    !loading &&
    listLanhDao !== null &&
    listLanhDao.map((lanhDao) => (
      <option key={lanhDao.id} value={lanhDao.id}>
        {lanhDao.ho_ten}
      </option>
    ))
  );
};

const mapStateToProps = (state) => ({
  DangKy: state.DangKy,
});

export default connect(mapStateToProps, { getLanhDao })(LanhDaoOptions);

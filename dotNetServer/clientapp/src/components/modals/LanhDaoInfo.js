import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const LanhDaoInfo = ({ DangKy: { lanhDaoState } }) => {
  const [chucVu, setChucVu] = useState("");
  const [emai, setEmail] = useState("");
  const [donViCongTac, setDonViCongTac] = useState("");
  useEffect(() => {
    if (lanhDaoState) {
      setEmail(lanhDaoState.email);
      setChucVu(lanhDaoState.chuc_vu);
      setDonViCongTac(lanhDaoState.don_vi_cong_tac);
    }
  }, [lanhDaoState]);
  return (
    <div className="row">
      <p>Thông tin lãnh đạo</p>
      <div className="input-field col s12 m4">
        <input
          value={chucVu}
          name="chucVu"
          type="text"
          required
          disabled
          onChange={(e) => setChucVu(e.target.value)}
        />
        {/* <label htmlFor='chucVu'>Chức vụ</label> */}
      </div>
      <div className="input-field col s12 m4">
        <input
          value={emai}
          name="emai"
          type="text"
          required
          disabled
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <label htmlFor='emai'>Email</label> */}
      </div>
      <div className="input-field col s12 m4">
        <input
          value={donViCongTac}
          name="donViCongTac"
          type="text"
          required
          disabled
          onChange={(e) => setDonViCongTac(e.target.value)}
        />
        {/* <label htmlFor='donViCongTac'>Đơn vị công tác</label> */}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  DangKy: state.DangKy,
});
export default connect(mapStateToProps)(LanhDaoInfo);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setThanhPhanText } from "../../actions/dangKyAction";
import M from "materialize-css/dist/js/materialize.min.js";
const ThanhPhanInfo = ({
  DangKy: { thanhPhan, listThanhPhan, removed },
  setThanhPhanText,
}) => {
  const [thanhPhanList, setThanhPhanList] = useState("");
  useEffect(() => {
    if (thanhPhan !== null) {
      if (listThanhPhan.trim() !== "") {
        if (listThanhPhan.indexOf(`${thanhPhan.Email}`) === -1) {
          let strThanhPhan =
            listThanhPhan.trim().substring(listThanhPhan.trim().length - 1) ===
            ","
              ? `${listThanhPhan.trim()} ${thanhPhan.email} (${
                  thanhPhan.ho_ten
                })`
              : `${listThanhPhan.trim()}, ${thanhPhan.email} (${
                  thanhPhan.ho_ten
                })`;
          setThanhPhanList(strThanhPhan);
          setThanhPhanText(strThanhPhan);
        } else {
          M.toast({
            html: `${thanhPhan.email} (${thanhPhan.ho_ten}) đã được thêm`,
          });
        }
      } else {
        setThanhPhanList(`${thanhPhan.email} (${thanhPhan.ho_ten})`);
        setThanhPhanText(`${thanhPhan.email} (${thanhPhan.ho_ten})`);
      }
    } else {
      setThanhPhanList(listThanhPhan);
      setThanhPhanText(listThanhPhan);
    }
    // eslint-disable-next-line
  }, [thanhPhan, removed]);

  return (
    <div className="input-field col s12 m8">
      <textarea
        name="thanhPhanList"
        value={thanhPhanList}
        style={{ height: "120px", maxHeight: "150px", overflowY: "auto" }}
        placeholder="Thành phần tham dự"
        onChange={(e) => {
          setThanhPhanList(e.target.value);
          setThanhPhanText(e.target.value);
        }}
        className="materialize-textarea"
        required
      ></textarea>
    </div>
  );
};

const mapStateToProps = (state) => ({
  DangKy: state.DangKy,
});

export default connect(mapStateToProps, { setThanhPhanText })(ThanhPhanInfo);

import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
 
function ChangePw(props) {
    const [type, setType] = useState("password")

    const onChangCheckBox = (e) => {
        const { checked } = e.target
        checked === true ? setType("text") : setType("password")
    }
    return (
        <div className="cls-content">
                    <div className="cls-content-sm panel">
                        <div className="panel-body">
                            <center><h2><p className="pad-btm">Đổi mật khẩu </p></h2></center>
                                <form>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon"><i className="fa fa-asterisk" /></div>
                                        <input  className="form-control" placeholder="Nhập mật khẩu cũ"  />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon"><i className="fa fa-asterisk" /></div>
                                        <input  className="form-control" placeholder="Mật khẩu mới"  />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon"><i className="fa fa-asterisk" /></div>
                                        <input  className="form-control" placeholder="Nhập lại mật khẩu mới"  />
                                    </div>
                                </div>
                                <div className="row">
                                <div className="col-xs-8 text-left checkbox" style={{ marginTop: "-6px", marginBottom: " 7px" }}>
                                        <Checkbox defaultChecked={false} color="secondary"
                                            onChange={(e) => { onChangCheckBox(e) }}
                                        />Hiển thị mật khẩu
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="form-group text-right">
                                            <button className="btn btn-success text-uppercase" type="submit">Đồng ý</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
    )

}

export default ChangePw;
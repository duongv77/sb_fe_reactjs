import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { ToastContainer } from "react-toastify";

function RestartPassword(props) {
    const [type, setType] = useState("password")

    const onChangCheckBox = (e) => {
        const { checked } = e.target
        checked === true ? setType("text") : setType("password")
    }

    return (
        <div>
            <div id="container" className="cls-container">
                {/* BACKGROUND IMAGE */}
                {/*===================================================*/}
                <div id="bg-overlay" className="bg-img img-balloon" />
                {/* HEADER */}
                {/*===================================================*/}
                <div className="cls-header cls-header-lg">
                    <div className="cls-brand">
                        <a className="box-inline" href="index.html">
                            <span className="brand-title">BeeBook <span className="text-thin"></span></span>
                        </a>
                    </div>
                </div>
                {/* PASSWORD RESETTING FORM */}
                {/*===================================================*/}
                <div className="cls-content">
                    <div className="cls-content-sm panel">
                        <div className="panel-body">
                            <p className="pad-btm">Đặt lại mật khẩu </p>
                            <form onSubmit={props.handleSubmit(props.onSubmit)}>
                                <div>
                                    <img height={70} src={props.account.photo} alt="" />
                                    <p>{props.account.fullname}</p>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon"><i className="fa fa-asterisk" /></div>
                                        <input type={type} className="form-control" placeholder="Mật khẩu mới" {...props.register("password", { required: true, pattern: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/ })} />
                                    </div>
                                    {props.errors.password?.type === 'pattern' && <span style={{ color: "red" }}>Không đúng định dạng!</span>}
                                    {props.errors.password?.type === 'required' && <span style={{ color: "red" }}>Không được để trống!</span>}
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon"><i className="fa fa-asterisk" /></div>
                                        <input type={type} className="form-control" placeholder="Nhập lại mật khẩu mới" {...props.register("passwordComfirm", { required: true, pattern: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/ })} />
                                    </div>
                                    {props.errors.passwordComfirm?.type === 'pattern' && <span style={{ color: "red" }}>Không đúng định dạng!</span>}
                                    {props.errors.passwordComfirm?.type === 'required' && <span style={{ color: "red" }}>Không được để trống!</span>}
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
                {/*===================================================*/}</div>
        </div>
    )
}

export default RestartPassword;
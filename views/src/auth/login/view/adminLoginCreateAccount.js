import Checkbox from '@mui/material/Checkbox';
import {
    NavLink,
} from "react-router-dom";

function AdminLoginCreateAccount(props) {
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
                            {/* <img alt="Nifty Admin" src="img/logo.png" class="brand-icon"> */}
                            <span className="brand-title">BeeBook <span className="text-thin">Admin</span></span>
                        </a>
                    </div>
                </div>
                {/* REGISTRATION FORM */}
                {/*===================================================*/}
                <div className="cls-content">
                    <div className="cls-content-lg panel">
                        <div className="panel-body">
                            <p className="pad-btm">Tạo tài khoản</p>
                            <form onSubmit={props.handleSubmit(props.onSubmit)}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon"><i className="fa fa-male" /></div>
                                                <input type="text" className="form-control" placeholder="Họ và tên . . ." {...props.register("fullname", { required: true })} />
                                            </div>
                                            {props.errors.fullname?.type === 'required' && <p style={{ color: "red", marginTop: "3px" }}>Không được để trống!</p>}
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon"><i className="fa fa-envelope" /></div>
                                                <input type="text" className="form-control" placeholder="E-mail" name="email"
                                                    {...props.register("email", { required: true, pattern: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/ })} />
                                            </div>
                                            {props.errors.email?.type === 'pattern' && <p style={{ color: "red", marginTop: "3px" }}>Không đúng định dạng!</p>}
                                            {props.errors.email?.type === 'required' && <p style={{ color: "red", marginTop: "3px" }}>Không được để trống!</p>}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon"><i className="fa fa-phone" /></div>
                                                <input type="text" className="form-control" placeholder="Số điện thoại" name="username" {...props.register("username", { required: true, pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g })} />
                                            </div>
                                            {props.errors.username?.type === 'required' && <p style={{ color: "red", marginTop: "3px" }}>Không được để trống!</p>}
                                            {props.errors.username?.type === 'pattern' && <p style={{ color: "red", marginTop: "3px" }}>Không đúng định dạng!</p>}
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon"><i className="fa fa-asterisk" /></div>
                                                <input type="password" className="form-control" placeholder="Mật khẩu" name="password" {...props.register("password", { required: true, pattern: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/ })} />
                                            </div>
                                            {props.errors.password?.type === 'required' && <p style={{ color: "red", marginTop: "3px" }}>Không được để trống!</p>}
                                            {props.errors.password?.type === 'pattern' && <p style={{ color: "red", marginTop: "3px" }}>Password vui lòng không chứa kí tự đặc biệt!</p>}

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div>
                                        <span className="text-danger" style={{ fontStyle: "italic" }}>Lưu ý: SĐT là tài khoản đăng nhập của bạn !</span>
                                    </div>
                                    <div className="col-xs-8 text-left checkbox" style={{ marginTop: "-6px", marginBottom: " 7px" }}>
                                        <Checkbox defaultChecked={false} color="secondary" />Tôi đồng ý
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="form-group text-right">
                                            <button className="btn btn-success text-uppercase" type="submit">Đăng kí</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="pad-ver">
                        <NavLink to="/login/admin" className="btn-link mar-rgt">Quay lại</NavLink>
                    </div>
                </div>
                {/*===================================================*/}</div>
        </div>
    )
}

export default AdminLoginCreateAccount;
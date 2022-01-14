import {
    NavLink,
} from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';

function AdminLogin(props) {
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
                {/*===================================================*/}
                {/* LOGIN FORM */}
                {/*===================================================*/}
                <div className="cls-content">
                    <div className="cls-content-sm panel">
                        <div className="panel-body">
                            <p className="pad-btm">Đăng nhập</p>
                            <form onSubmit={props.handleSubmit(props.onSubmitFormLogin)}>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon"><i className="fa fa-user" /></div>
                                        <input id="user" type="text" defaultValue={props.defaultAccount.username} className="form-control" placeholder="Tài khoản . . ." {...props.register("username", { required: true, pattern: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/ })} />
                                    </div>
                                    {props.errors.username?.type === 'pattern' && <span style={{ color: "red" }}>Không đúng định dạng!</span>}
                                    {props.errors.username?.type === 'required' && <span style={{ color: "red" }}>Không được để trống!</span>}
                                </div>
                                <div className="form-group" style={{ marginTop: "20px" }}>
                                    <div className="input-group">
                                        <div className="input-group-addon"><i className="fa fa-asterisk" /></div>
                                        <input id="pass" type="password" defaultValue={props.defaultAccount.password} className="form-control" placeholder="Mật khẩu . . ." {...props.register("password", { required: true, pattern: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/ })} />
                                    </div>
                                    {props.errors.password?.type === 'pattern' && <span style={{ color: "red" }}>Không đúng định dạng!</span>}
                                    {props.errors.password?.type === 'required' && <span style={{ color: "red" }}>Không được để trống!</span>}
                                </div>
                                <div className="row">
                                    <div className="col-xs-7 text-left checkbox" style={{marginTop: "-6px", marginBottom:" 7px"}}>
                                        <Checkbox checked={props.saveAccount} color="secondary" 
                                            onChange={(e)=>{
                                                const {checked} = e.target
                                                props.setSaveAccount(checked)
                                            }}
                                        />Lưu tài khoản
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="form-group text-right">
                                            <button className="btn btn-success text-uppercase" type="submit">ĐĂNG NHẬP</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="pad-ver">
                        <NavLink to="/login/admin/forgot_password" className="btn-link mar-rgt">Quên mật khẩu ?</NavLink>
				        <NavLink to="/login/admin/create_account" class="btn-link mar-lft">Tạo tài khoản</NavLink>
                    </div>
                </div>
                {/*===================================================*/}
            </div>
        </div>

    )
}

export default AdminLogin;
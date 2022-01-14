import {
    NavLink,
} from "react-router-dom";

function AdminLoginChangePw(props){
    return(
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
                            <span className="brand-title">BeeBook <span className="text-thin">Admin</span></span>
                        </a>
                    </div>
                </div>
                {/* PASSWORD RESETTING FORM */}
                {/*===================================================*/}
                <div className="cls-content">
                    <div className="cls-content-sm panel">
                        <div className="panel-body">
                            <p className="pad-btm">Nhập email đăng kí mật khẩu. </p>
                            <form onSubmit={props.handleSubmit(props.onSubmit)}>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon"><i className="fa fa-envelope" /></div>
                                        <input type="text" className="form-control" placeholder="E-mail" name="email" 
                                        {...props.register("email", { required: true,  pattern: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/ })}/>
                                    </div>
                                    {props.errors.email?.type === 'pattern' && <p style={{ color: "red" , marginTop: "3px"}}>Không đúng định dạng!</p>}
                                    {props.errors.email?.type === 'required' && <p style={{ color: "red" , marginTop: "3px"}}>Không được để trống!</p>}
                                </div>
                                <div className="form-group text-right">
                                    <button className="btn btn-success text-uppercase" type="submit">Quên mật khẩu</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="pad-ver">
                        <NavLink to="/login/admin" className="btn-link mar-rgt">Đăng nhập</NavLink>
                    </div>
                </div>
                {/*===================================================*/}</div>
        </div>

    )
}

export default AdminLoginChangePw;
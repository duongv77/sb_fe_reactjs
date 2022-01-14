import {
    NavLink
} from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@mui/material/Switch';
import { ToastContainer } from "react-toastify";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import AdminRole from "./adminRole"
import { USER, ADMIN, SUPPER_ADMIN } from '../../../../Service/common';
import { padding } from "@mui/system";
import Tooltip from '@mui/material/Tooltip'

const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: pink[600],
        '&:hover': {
            backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: pink[600],
    },
}));
const label = { inputProps: { 'aria-label': 'Switch demo' } };
function AdminAccount(props) {
    const roleAccount = JSON.parse(localStorage.getItem("AccountToken")).roleAccount
    let accountOff = 0;
    const checkSuperAdmin = () => {
        let check = false;
        if (roleAccount === undefined) return false
        roleAccount.map(value => {
            if (value.role.name === "SUPPER_ADMIN") check = true
        })
        return check;
    }
    const checkSuper = (listRole) => {
        let check = false;
        if (listRole === undefined) return false
        listRole.map(value => {
            if (value.role.name === "SUPPER_ADMIN") check = true
        })
        return check;
    }
    const checkUser = (listRole) => {
        let check = false;
        if (listRole === undefined) return false
        listRole.map(value => {
            if (value.role.name === "USER") check = true
        })
        return check;
    }

    const checkAdmin = (listRole) => {
        let check = false;
        if (listRole === undefined) return false
        listRole.map(value => {
            if (value.role.name === "ADMIN") check = true
        })
        return check;
    }

    return (
        <div>
            <div class="panel">
                <div class="panel-heading">
                    <h2 className="panel-title">DANH SÁCH TÀI KHOẢN</h2>
                    <ol className="breadcrumb">
                        <li><NavLink to="/admin" style={{ fontSize: "15px" }}>Trang chủ</NavLink></li>
                        <li><NavLink to="/admin/author" style={{ fontSize: "15px" }}>Tài khoản</NavLink></li>
                    </ol>
                </div>
                <br />
                <br />
                <br />
                <div id="page-title" className="mar-top">
                    <div className="mar-top">
                        <span className="mar-rgt">Sắp xếp</span>
                        <select displayEmpty className="custom-select" onChange={props.onChangeSort}>
                            <option value="username">Sắp xếp theo tên </option>
                            <option value="phone">Sắp xếp theo SĐT </option>
                        </select>
                    </div>
                    <div className="searchbox">
                        <div className="input-group custom-search-form">
                            <input type="text" className="form-control" placeholder="Tìm kiếm . . ." onChange={props.onChangeSearch} onKeyPress={props.onChangeSearch} />
                            <span className="input-group-btn">
                                <button className="text-muted" type="button"><i className="fa fa-search" /></button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mar-lft">
                    {
                        checkSuperAdmin() == false ? "" :
                            <div className="mar-top">
                                <AdminRole {...props} />
                            </div>
                    }
                    <br />
                </div>
                <div class="panel-body">
                    <table id="demo-dt-basic" class="table table-striped table-bordered" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th width={30}>STT</th>
                                <th>ID</th>
                                <th>Hình ảnh</th>
                                <th>Họ tên</th>
                                <th className="min-tablet">Email</th>
                                <th className="min-tablet">Số điện thoại</th>
                                <th className="text-center" width={250}>Phân quyền</th>
                                <th width={100}>Trạng thái hoạt động</th>
                                <th width={120}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.listAccount.map((value, index) => {
                                if (value.activated == 0) accountOff++
                                if (props.page * props.size > index) return null
                                if ((props.page + 1) * props.size < index + 1) return null
                                return (
                                    <tr key={value}>
                                        <td>{index + 1}</td>
                                        <td>{value.id}</td>
                                        <td style={{ textAlign: "center" }}><img src={value.photo} alt={value.photo} height={30} /></td>
                                        <td>{value.username}</td>
                                        {/* <td>{value.email}</td> */}
                                        <td>
                                            <input type="text"
                                                defaultValue={value.email}
                                                className="form-control"
                                                onBlur={(e) => { props.onBlurValue(e, value) }}
                                                onKeyPress={(e) => { props.onKeyValue(e, value) }}
                                            />
                                        </td>
                                        <td>{value.phone}</td>
                                        <td className="text-center">
                                            {checkUser(value.roleAccount) === true ? <img className="mar-rgt" src={USER} height={20} /> : ""}
                                            {checkAdmin(value.roleAccount) === true ? <img className="mar-rgt" src={ADMIN} height={20} /> : ""}
                                            {checkSuper(value.roleAccount) === true ? <img src={SUPPER_ADMIN} height={20} /> : ""}
                                        </td>
                                        <td className="text-center">
                                            <GreenSwitch {...label} defaultChecked={value.activated == 1 ? true : false} onChange={(e) => { props.onChangeActivated(e, value) }} />
                                        </td>
                                        <td>
                                            <Tooltip title="Xem chi tiết" placement="top-start" arrow>
                                                <button data-target="#demo-modal-wo-anim"
                                                    onClick={() => { props.onClickAccountViewDetail(value) }}
                                                    data-toggle="modal" className="btn btn-primary mar-rgt" width={50}>
                                                    <i className="fa fa-eye"></i>
                                                </button>
                                            </Tooltip>
                                            <Tooltip title="Xoá" placement="top-start" arrow>
                                            <button className="btn btn-danger" onClick={() => { props.onClickDeleteAccount(value) }}><i className="fa fa-trash-o"></i></button>
                                            </Tooltip>
                                            
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="btn-toolbar mar-rgt row" >
                    <div className=" col-lg-6 ">
                        <select className="text-left custom-select"
                            onChange={(event) => {
                                const { value } = event.target
                                props.setSize(+value)
                            }}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                        </select>
                        <span style={{ opacity: "0.6", marginLeft: "20px" }}>Tài khoản ngưng hoạt đông: {accountOff}/{props.listAccount.length}</span>
                    </div>
                    <div className="text-right col-lg-6 review-box" >
                        <span> {(props.page + 1) * props.size > props.listAccount.length ? props.listAccount.length : (props.page + 1) * props.size}
                            / {props.listAccount.length}</span>
                        <button className="btn btn-default btn-active-purple mar-lft" onClick={() => { props.clickPre() }}><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                        <button className="btn btn-default btn-active-purple">{props.page + 1}</button>
                        <button className="btn btn-default btn-active-purple" onClick={() => { props.clickNext() }}><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
            <div className="modal" id="demo-modal-wo-anim" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">Tài khoản:</h4>
                            <div className="modal-body" style={{ height: "600px" }}>
                                <div className="row">
                                    <div className="col-sm-5">
                                        <img src={props.viewAccountDetail.photo} alt="lỗi" width={400} />
                                    </div>
                                    <div className="col-sm-7">
                                        <div>
                                            <h3>Mã: {props.viewAccountDetail.id}</h3>
                                            <br />
                                            <h3>Họ tên: {props.viewAccountDetail.fullname}</h3>
                                            <br />
                                            <h3>Email: {props.viewAccountDetail.email}</h3>
                                            <br />
                                            <h3>SĐT: {props.viewAccountDetail.phone}</h3>
                                            <br />
                                            <h3>Địa chỉ chính: {props.viewAccountDetail.mainAddress}</h3>
                                            <br />
                                            <h3>Địa chỉ Khác: </h3>
                                            {
                                                props.viewAccountDetail.address == null ? "" :
                                                    props.viewAccountDetail.address.map(value => {
                                                        return (
                                                            <p>- {value.address}</p>
                                                        )
                                                    })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*Modal footer*/}
                            <div className="modal-footer">
                                <button data-dismiss="modal" className="btn btn-default" type="button">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" id="create-account" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content" >

                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">Tài khoản:</h4>
                            <div className="modal-body row">
                                <div className="col-lg-8 ">
                                    <div className="form-group">
                                        <label>Username:</label>
                                        <input className="form-control" placeholder="username. . ." />
                                    </div>
                                    <div className="form-group">
                                        <label>Mật khẩu:</label>
                                        <input className="form-control" placeholder="password. . ." />
                                    </div>
                                </div>
                            </div>
                            {/*Modal footer*/}
                            <div className="modal-footer">
                                <button data-dismiss="modal" className="btn btn-default" type="button">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAccount;
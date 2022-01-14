import { useState, useEffect, useRef } from "react"
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #DCDCDC',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
function Profile(props) {
    const [typeInput, setTypeInput] = useState("password")
    const [uiChangePw, setUiChangePw] = useState(false)
    const [uiAddress, setUiAddress] = useState(false)
    return (
        <div>
            <div style={{ maxWidth: "100%", padding: "5px 10px" }} >
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mar-top">
                    <h2 className="page-title about-page-title">Thông tin tài khoản: </h2>
                </div>
                <form onSubmit={props.handleSubmit(props.onSubmitProfile)} style={{ padding: "0px 50px", marginBottom: "30px" }}>
                    <div className="row mar-btm mar-top" style={{ marginTop: "100px" }}>
                        <div className="form-group">
                            <div className="col-lg-2">
                                <label >Username:</label>
                            </div>
                            <div className="col-lg-10">
                                <input type="text" className="form-control" value={props.profile.username} disabled />
                            </div>
                        </div>
                    </div>
                    <div className="row mar-btm">
                        <div className="form-group ">
                            <div className="col-lg-2">
                                <label>Họ và tên:</label>
                            </div>
                            <div className="col-lg-10">
                                <input type="text" defaultValue={props.profile.fullname} className="form-control" {...props.register("fullname", { required: true, maxLength: 30 })} />
                                {props.errors.fullname?.type === 'maxLength' && <span className="text-danger">Tên sản phẩm không được quá 30 kí tự!</span>}
                                {props.errors.fullname?.type === 'required' && <span className="text-danger">Không được để trống!</span>}
                            </div>
                        </div>
                    </div>
                    <div className="row  mar-btm">
                        <div className="form-group">
                            <div className="col-lg-2">
                                <label>Email:</label>
                            </div>
                            <div className="col-lg-10">
                                <input type="email" defaultValue={props.profile.email} className="form-control" {...props.register("email", { required: true, pattern: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/ })} />
                                {props.errors.email?.type === 'pattern' && <span className="text-danger">Email không chính xác!</span>}
                                {props.errors.email?.type === 'required' && <span className="text-danger">Không được để trống!</span>}
                            </div>
                        </div>
                    </div>
                    <div className="row mar-btm">
                        <div className="form-group ">
                            <div className="col-lg-2">
                                <label>Sđt:</label>
                            </div>
                            <div className="col-lg-10">
                                <input type="text" defaultValue={props.profile.phone} className="form-control" {...props.register("phone", { required: true, pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g })} />
                                {props.errors.phone?.type === 'pattern' && <span className="text-danger">Số điện thoại không chính xác!</span>}
                                {props.errors.phone?.type === 'required' && <span className="text-danger">Không được để trống!</span>}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <button className="btn btn-success" type="submit">Cập nhập</button>
                    </div>
                </form>
            </div>
            <div style={{ maxWidth: "100%", padding: "5px 10px" }} >
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mar-top">
                    <h2 className="page-title about-page-title mar-rgt">Đổi mật khẩu:
                        {
                            uiChangePw ?
                                <i className="fa fa-angle-up custom-hover-mouse" aria-hidden="true"
                                    onClick={() => { setUiChangePw(!uiChangePw) }} ></i> :
                                <i className="fa fa-angle-down custom-hover-mouse" aria-hidden="true"
                                    onClick={() => { setUiChangePw(!uiChangePw) }} ></i>
                        }
                    </h2>
                </div>
                {
                    uiChangePw ?
                        <form onSubmit={props.handleSubmit(props.onSubmitUpdatePassword)} style={{ padding: "0px 50px", marginBottom: "30px" }}>
                            <div className="row mar-btm mar-top" style={{ marginTop: "100px" }}>
                                <div className="form-group">
                                    <div className="col-lg-2">
                                        <label >Mật khẩu cũ:</label>
                                    </div>
                                    <div className="col-lg-10">
                                        <input type={typeInput} className="form-control" {...props.register("passwordOld", { required: true, maxLength: 30 })} />
                                        {props.errors.passwordOld?.type === 'required' && <span className="text-danger">Không được để trống!</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="row mar-btm">
                                <div className="form-group ">
                                    <div className="col-lg-2">
                                        <label>Mật khẩu mới:</label>
                                    </div>
                                    <div className="col-lg-10">
                                        <input type={typeInput} className="form-control" {...props.register("passwordNew", { required: true, maxLength: 30 })} />
                                        {props.errors.passwordNew?.type === 'required' && <span className="text-danger">Không được để trống!</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="row  mar-btm">
                                <div className="form-group">
                                    <div className="col-lg-2">
                                        <label>Nhập lại:</label>
                                    </div>
                                    <div className="col-lg-10">
                                        <input type={typeInput} className="form-control" {...props.register("passwordNewConfirm", { required: true, maxLength: 30 })} />
                                        {props.errors.passwordNewConfirm?.type === 'required' && <span className="text-danger">Không được để trống!</span>}
                                    </div>
                                </div>
                            </div>
                            <div>
                            </div>
                            <div>
                                <div className="col-lg-2"></div>
                                <div className="col-lg-4">
                                    <input type="checkbox" className="custom-hover-mouse" id="cb"
                                        onChange={(e) => {
                                            const { checked } = e.target
                                            console.log(checked)
                                            checked ? setTypeInput("text") : setTypeInput("password")
                                        }}
                                    /> <label for="cb" className="custom-hover-mouse" >Hiển thị</label>
                                </div>
                                <div className="col-lg-6 text-right">
                                    <button className="btn btn-success" type="submit">Cập nhập</button>
                                </div>
                            </div>
                        </form> : null
                }

            </div>
            <div style={{ maxWidth: "100%", padding: "5px 10px" }} >
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mar-top">
                    <h2 className="page-title about-page-title">Địa chỉ:
                        {
                            uiAddress ?
                                <i className="fa fa-angle-up custom-hover-mouse" aria-hidden="true"
                                    onClick={() => { setUiAddress(!uiAddress) }} ></i> :
                                <i className="fa fa-angle-down custom-hover-mouse" aria-hidden="true"
                                    onClick={() => { setUiAddress(!uiAddress) }} ></i>
                        }
                    </h2>
                </div>
                <div className="row custom-center mar-btm">
                    {
                        uiAddress ?
                            <>
                                <div style={{ marginTop: "10px" }}>
                                    <i className="fa fa-plus custom-hover-mouse" aria-hidden="true" onClick={props.handleOpen}></i>
                                </div>
                                <table className="table table-hover table-vcenter" style={{ width: "90%", marginTop: "35px" }}>
                                    <tbody>
                                        <tr>
                                            <td>{props.profile.mainAddress}<span style={{ opacity: "0.6" }}> - địa chỉ chính</span></td>
                                            <td>
                                                <i className="fa fa-pencil custom-hover-mouse mar-rgt" aria-hidden="true"></i>
                                            </td>
                                        </tr>
                                        {
                                            props.profile.address.map(value => {
                                                return (
                                                    <tr key={value.id}>
                                                        <td>{value.address}</td>
                                                        <td width={100}>
                                                            <i className="fa fa-trash-o custom-hover-mouse" onClick={()=>{props.onClickDeleteAddress(value.id)}} aria-hidden="true"></i>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </> : null
                    }
                </div>
            </div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 800, height: 500 }}>
                    <div className="modal-header" style={{ marginTop: "-10px" }}>
                        <button data-dismiss="modal" className="close" type="button">
                            <span aria-hidden="true" onClick={props.handleClose}>×</span>
                        </button>
                        <h4 className="modal-title">Thêm địa chỉ</h4>
                    </div>
                    <div className="modal-body">
                        <div className="row mar-btm">
                            <div className="form-group">
                                <div className="col-lg-2">
                                    <label style={{ marginTop: "4px" }}>Địa chỉ:</label>
                                </div>
                                <div className="col-lg-10">
                                    <textarea type="text" value={props.address} className="form-control" disabled />
                                </div>
                            </div>
                        </div>
                        <div className="row mar-btm">
                            <div className="form-group">
                                <div className="col-lg-2">
                                    <label style={{ marginTop: "4px" }}>Địa chỉ cụ thể:</label>
                                </div>
                                <div className="col-lg-10">
                                    <input type="text" className="form-control" onBlur={(e)=>{
                                        props.setAddressDetail(e.target.value)
                                    }}/>
                                    {props.addressDetail==""?<span className="text-danger">Không được để trống !</span>:null}
                                </div>
                            </div>
                        </div>
                        <div className="row mar-btm">
                            <div className="form-group">
                                <div className="col-lg-2">
                                    <label style={{ marginTop: "4px" }}>Tỉnh/Thành phố:</label>
                                </div>
                                <div className="col-lg-10">
                                    <select className="custom-select" onChange={(e) => {
                                        const { value } = e.target
                                        props.onChangePvrovince(value)
                                    }}>
                                        {
                                            props.listPvrovince.map(value => {
                                                return (
                                                    <option key={value.id} value={JSON.stringify(value)} > {value.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row mar-btm">
                            <div className="form-group">
                                <div className="col-lg-2">
                                    <label style={{ marginTop: "4px" }}>Quận/Huyện:</label>
                                </div>
                                <div className="col-lg-10">
                                    <select className="custom-select" onChange={(e) => {
                                        const { value } = e.target
                                        props.onChangeDistrict(value)
                                    }}>
                                        {
                                            props.listDistrict.map(value => {
                                                return (
                                                    <option key={value.id} value={JSON.stringify(value)}>{value.prefix} {value.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row mar-btm">
                            <div className="form-group">
                                <div className="col-lg-2">
                                    <label style={{ marginTop: "4px" }}>Phường/Xã:</label>
                                </div>
                                <div className="col-lg-10">
                                    <select className="custom-select"onChange={(e) => {
                                        const { value } = e.target
                                        props.onChangeWard(value)
                                    }}>
                                        {
                                            props.listWard.map(value => {
                                                return (
                                                    <option key={value.id} value={JSON.stringify(value)}>{value.prefix} {value.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer" style={{ backgroundColor: "white", position: 'absolute', bottom: '1px', right: '10px', width: '98%' }}>
                        <button onClick={props.handleClose} className="btn btn-default" type="button">Đóng</button>
                        <button className="btn btn-success" type="submit" onClick={props.onClickAdd}>Thêm</button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
export default Profile;
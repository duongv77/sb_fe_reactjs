import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from "react-toastify";
import swal from 'sweetalert';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import API from '../../api/api';
import { Link, NavLink } from "react-router-dom";
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

function AdminNav(props) {
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem("AccountToken"))
    const [anchorEl, setAnchorEl] = useState(null);
    const [typeInput, setTypeInput] = useState("password")
    const { register, handleSubmit, formState: { errors } } = useForm();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        event.preventDefault()
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);

    };

    const [openModel, setOpenModel] = useState(false)

    const handleOpenModel = () => {
        setOpenModel(true)
    };

    const handleCloseModel = () => {
        setOpenModel(false);  
    };

    const callApiUpdateProduct = async (value) => {
        try {
            const url = '/api/v2/user/update-password'
            const response = await API.putAdmin(url, value)
            const { messageCode, messageName } = response
            if (messageCode == 200) {
                toast.success("Mật khẩu đã được thay đổi!")
                handleCloseModel()
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const onSubmitUpdatePassword = (data) => {
        if (data.passwordNewConfirm != data.passwordNew) {
            toast.error("Xác nhận mật khẩu mới không chính xác!")
            return
        }
        swal({
            title: "Chú ý!",
            text: "Bạn muốn đổi mật khẩu ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const value = { ...data, id: user.id }
                    callApiUpdateProduct(value)
                } else {
                }
            });
    }

    const logout = () => {
        localStorage.removeItem("AccountToken")
        localStorage.removeItem("AccessToken")
        setAnchorEl(null);
        history.push("/login/admin")
        toast.success('Bạn đã đăng xuất');
    }
    return (
        <div>
            {/*NAVBAR*/}
            {/*===================================================*/}
            <header id="navbar" style={{ position: 'fixed' }}>
                <div id="navbar-container" className="boxed">
                    {/*Brand logo & name*/}
                    {/*================================*/}
                    <div className="navbar-header">
                        <a href="index.html" className="navbar-brand">

                            <img src="https://firebasestorage.googleapis.com/v0/b/fistproject-d19c7.appspot.com/o/images%2Flogo.png?alt=media&token=09463dcd-eafe-4941-88e9-0f3ba569793c" alt="Nifty Logo" style={{ height: "30px", float: "left" }} />
                            <span className="brand-text">BeeBook</span>
                        </a>
                    </div>
                    {/*================================*/}
                    {/*End brand logo & name*/}
                    {/*Navbar Dropdown*/}
                    {/*================================*/}
                    <div className="navbar-content clearfix">
                        <ul className="nav navbar-top-links pull-left">
                            {/*Navigation toogle button*/}
                            {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
                            <li className="tgl-menu-btn">
                                <a className="mainnav-toggle" href="#">
                                </a>
                            </li>
                            {/*Mega dropdown*/}
                            {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}

                            {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
                            {/*End mega dropdown*/}
                        </ul>
                        <ul className="nav navbar-top-links pull-right">
                            {/*User dropdown*/}
                            {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
                            <li id="dropdown-user" className="dropdown">
                                <a type="button" id="fade-button"
                                    aria-controls="fade-menu"
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick} className="dropdown-toggle text-right custom-hover-mouse">
                                    <span className="pull-right">
                                        <img className="img-circle img-user media-object" src={user.image} alt="Profile Picture" />
                                    </span>
                                    <div className="username hidden-xs">{user.fullname}</div>
                                </a>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <NavLink to="/admin/information"><MenuItem onClick={handleClose} >Thông tin</MenuItem></NavLink>

                                    <MenuItem onClick={() => {
                                        handleClose()
                                        handleOpenModel()
                                    }}>Đổi mật khẩu</MenuItem>
                                    <MenuItem onClick={logout}>Đăng xuất</MenuItem>
                                </Menu>

                             

                                <div className="dropdown-menu dropdown-menu-md dropdown-menu-right with-arrow panel-default">
                                    {/* Dropdown heading  */}
                                    <div className="pad-all bord-btm">
                                        <p className="text-lg text-muted text-thin mar-btm">750Gb of 1,000Gb Used</p>
                                        <div className="progress progress-sm">
                                            <div className="progress-bar" style={{ width: '70%' }}>
                                                <span className="sr-only">70%</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* User dropdown menu */}
                                    <ul className="head-list">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-user fa-fw fa-lg" /> Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span className="badge badge-danger pull-right">9</span>
                                                <i className="fa fa-envelope fa-fw fa-lg" /> Messages
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span className="label label-success pull-right">New</span>
                                                <i className="fa fa-gear fa-fw fa-lg" /> Settings
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-question-circle fa-fw fa-lg" /> Help
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-lock fa-fw fa-lg" /> Lock screen
                                            </a>
                                        </li>
                                    </ul>
                                    {/* Dropdown footer */}
                                    <div className="pad-all text-right">
                                        <a href="pages-login.html" className="btn btn-primary">
                                            <i className="fa fa-sign-out fa-fw" /> Logout
                                        </a>
                                    </div>
                                </div>
                            </li>
                            {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
                            {/*End user dropdown*/}
                        </ul>
                    </div>
                    {/*================================*/}
                    {/*End Navbar Dropdown*/}
                </div>
            </header>
            <Modal
                open={openModel}
                onClose={handleCloseModel}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 600, height: 400 }}>
                    <div className="modal-header" style={{ marginTop: "-10px" }}>
                        <button data-dismiss="modal" className="close" type="button">
                            <span aria-hidden="true" onClick={handleCloseModel}>×</span>
                        </button>
                        <h4 className="modal-title">Đổi mật khẩu:</h4>
                    </div>
                    <form onSubmit={handleSubmit(onSubmitUpdatePassword)} style={{ padding: "0px 50px", marginBottom: "30px" }}>
                        <div className="row ">
                            <div className="form-group">
                                <div className="form-group">
                                    <label >Mật khẩu cũ:</label>
                                    <input type={typeInput} className="form-control" {...register("passwordOld", { required: true, maxLength: 30 })} />
                                    {errors.passwordOld?.type === 'required' && <span className="text-danger">Không được để trống!</span>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group ">
                                <div className="form-group">
                                    <label>Mật khẩu mới:</label>
                                    <input type={typeInput} className="form-control" {...register("passwordNew", { required: true, maxLength: 30 })} />
                                    {errors.passwordNew?.type === 'required' && <span className="text-danger">Không được để trống!</span>}
                                </div>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="form-group">
                                <div className="form-group">
                                    <label>Nhập lại:</label>
                                    <input type={typeInput} className="form-control" {...register("passwordNewConfirm", { required: true, maxLength: 30 })} />
                                    {errors.passwordNewConfirm?.type === 'required' && <span className="text-danger">Không được để trống!</span>}
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                        <div>
                            <input type="checkbox" className="custom-hover-mouse" id="cb"
                                onChange={(e) => {
                                    const { checked } = e.target
                                    checked ? setTypeInput("text") : setTypeInput("password")
                                }}
                            /> <label for="cb" className="custom-hover-mouse" >Hiển thị</label>
                        </div>
                        <div className="modal-footer" style={{ backgroundColor: "white", position: 'absolute', bottom: '1px', right: '10px', width: '98%' }}>
                            <button onClick={handleCloseModel} className="btn btn-default" type="button">Đóng</button>
                            <button className="btn btn-success" type="submit">Đổi mật khẩu</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default AdminNav;
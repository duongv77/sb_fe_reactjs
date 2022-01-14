import {
    NavLink
} from "react-router-dom";
import Switch from '@mui/material/Switch';
import { SwapSpinner } from "react-spinners-kit";
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import { useState } from "react";
import AdminEditProductLogic from "../../logic/product/adminEditProductLogic"
import AdminTitle from "./adminTitle";
import Tooltip from '@mui/material/Tooltip';

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

function AdminProduct(props) {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    // const [productOff, setProductOff] = useState(0)
    let productOff = 0
    return (
        <div>
            <div class="panel">
                <div class="panel-heading">
                    <h2 className="panel-title">DANH SÁCH SẢN PHẨM</h2>
                    <ol className="breadcrumb">
                        <li><NavLink to="/admin" style={{ fontSize: "15px" }}>Trang chủ</NavLink></li>
                        <li><NavLink to="/admin/product" style={{ fontSize: "15px" }}>Sản phẩm</NavLink></li>
                    </ol>
                </div>
                <br />
                <br />
                <br />
                <div id="page-title" className="mar-top">
                    <div className="mar-top">
                        <span className="mar-rgt">Sắp xếp</span>
                        <select className='custom-select' onChange={props.onChangeSort}>
                            <option value="createDate">Ngày tạo</option>
                            <option value="name">Sắp xếp theo tên </option>
                            <option value="quantity">Số lượng</option>
                            <option value="price">Giá tiền</option>
                            <option value="title">Đầu sách</option>
                            <option value="authorId">Theo tác giả</option>
                        </select>
                    </div>
                    <div className="searchbox">
                        <div className="input-group custom-search-form">
                            <input type="text" className="form-control" placeholder="Tìm kiếm . . ." onChange={props.onChangeSearch} />
                            <span className="input-group-btn">
                                <button className="text-muted" type="button"><i className="fa fa-search" /></button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mar-lft mar-top">
                    <NavLink to="/admin/product/create" style={{ color: "white" }} className="btn btn-success mar-rgt"><i className="fa fa-plus-circle"></i></NavLink>
                    <AdminTitle  />
                </div>
                {
                    props.loadingElm === true ?
                        <div className="custom-center">
                            <SwapSpinner size={40} color="#686769" loading={props.loadingElm} ></SwapSpinner>

                        </div> :
                        <div>
                            <div class="panel-body" style={{ marginBottom: "-35px" }}>
                                <table id="demo-dt-basic" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th width={30}>STT</th>
                                            <th width={40}>ID</th>
                                            <th className="min-desktop">Đầu sách</th>
                                            <th>Tên sản phẩm</th>
                                            <th width={150}>Ảnh</th>
                                            <th width={120}>Giá</th>
                                            <th width={90} >Số lượng</th>
                                            <th width={90}>Trạng thái</th>
                                            <th className="min-desktop">Tác giả</th>
                                            <th className="min-desktop">Loại bìa</th>
                                            <th className="min-desktop">Thể loại</th>
                                            <th width={110} >Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.listProduct.map((value, index) => {
                                            if (value.available == 0) productOff++
                                            if (props.page * props.size > index) return null
                                            if ((props.page + 1) * props.size < index + 1) return null
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{value.id}</td>
                                                    <td>{value.title !== null ? value.title.name : null}</td>
                                                    <td>{value.name}</td>
                                                    <td style={{ textAlign: "center" }}><img src={value.image} alt={value.image} height={50} /></td>
                                                    <td>{value.price}</td>
                                                    <td>{value.quantity}</td>
                                                    <td>
                                                        <GreenSwitch {...label} checked={value.available == 1 ? true : false} onChange={(e) => { props.onChangeSwith(value.id) }} />
                                                    </td>
                                                    <td>{value.author !== null ? value.author.name : null}</td>
                                                    <td>{value.form}</td>
                                                    <td>{value.categorie === null ? "" : value.categorie.name}</td>
                                                    <td>
                                                    <Tooltip title="Xem chi tiết" placement="top-start" arrow>
                                                    <button  data-target="#update" data-toggle="modal" className="btn btn-warning mar-rgt"
                                                            onClick={(e) => { props.onClickUpdate(e, value) }}
                                                            width={50}><i className="fa fa-pencil"></i></button>
                                                    </Tooltip>
                                                    <Tooltip title="Xóa" placement="top-start" arrow>
                                                    <button  onClick={() => { props.onClickDelete(value) }} className="btn btn-danger"><i className="fa fa-trash-o"></i></button>
                                                    </Tooltip>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div >
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
                                    <span style={{ opacity: "0.6", marginLeft: "20px" }}>Sản phẩm ngưng hoạt đông: {productOff}/{props.listProduct.length}</span>
                                </div>
                                <div className="text-right col-lg-6 review-box" >
                                    <span> {(props.page + 1) * props.size > props.listProduct.length ? props.listProduct.length : (props.page + 1) * props.size}
                                        / {props.listProduct.length}</span>
                                    <button className="btn btn-default btn-active-purple mar-lft" onClick={() => { props.clickPre() }}><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                                    <button className="btn btn-default btn-active-purple">{props.page + 1}</button>
                                    <button className="btn btn-default btn-active-purple" onClick={() => { props.clickNext() }}><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                }
            </div >

            {/* from alert */}
            {/* xem chi tiết */}
            <div className="modal" id="demo-modal-wo-anim" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content ">
                        {/*Modal header*/}
                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">Sản phẩm:</h4>
                        </div>
                        {/*Modal body*/}
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/fistproject-d19c7.appspot.com/o/images%2F104711405_157695292490091_250783928511044112_o.jpg?alt=media&token=758dfa85-64e8-4e5b-a74e-be6d6ef66fb5" alt="lỗi" />
                                </div>
                                <div className="col-sm-7">
                                    <h4>Tên tác giả: Dưỡng is me</h4>

                                </div>
                            </div>
                        </div>
                        {/*Modal footer*/}
                        <div className="modal-footer">
                            <button data-dismiss="modal" className="btn btn-default" type="button">Close</button>
                            <button className="btn btn-success">Cập nhập</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* thêm mới */}
            <AdminEditProductLogic {...props} />

        </div >
    )
}
export default AdminProduct;
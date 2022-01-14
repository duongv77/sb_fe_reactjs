import * as React from 'react';
import {
    NavLink
} from "react-router-dom";
import { convertDate, numberWithCommas, TrangThaiPromotion } from "../../../../../Service/common";
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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
function AdminVoucher(props) {
    const onChange1 = (e) => {
        const { value } = e.target
        if (value.trim() != "") {
            document.getElementById('sale2').setAttribute("disabled", "none")
        } else {
            document.getElementById('sale2').removeAttribute("disabled")
        }
    }
    const onChange2 = (e) => {
        const { value } = e.target
        if (value.trim() != "") {
            document.getElementById('sale1').setAttribute("disabled", "none")
        } else {
            document.getElementById('sale1').removeAttribute("disabled")
        }
    }

    return (
        <div>
            <div class="panel">
                <div class="panel-heading">
                    <h2 className="panel-title">DANH SÁCH MÃ GIẢM GIÁ</h2>
                    <ol className="breadcrumb">
                        <li><NavLink to="/admin" style={{ fontSize: "15px" }}>Trang chủ</NavLink></li>
                        <li><NavLink to="/admin/voucher" style={{ fontSize: "15px" }}>Mã giảm giá</NavLink></li>
                    </ol>
                </div>
                <div id="page-title" className="mar-top" style={{ marginTop: "70px" }}>
                    <div className="mar-top">
                        <br />
                        <label className=" mar-rgt">Sắp xếp </label>
                        <select className="custom-select" onChange={props.onChangeSort}>
                            <option value="createDate">Ngày tạo</option>
                            <option value="startDate">Ngày bắt đầu</option>
                            <option value="endDate">Ngày kết thúc</option>
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
                <Tooltip title="Tạo mã giảm giá" placement="top-start" arrow >
                    <button className="btn btn-success mar-lft mar-top" onClick={props.handleOpen}><i className="fa fa-plus-circle" ></i></button>
                </Tooltip>
                <div className="panel-body">
                    <table id="demo-dt-basic" className="table table-striped table-bordered" cellSpacing={0} width="100%">
                        <thead>
                            <tr>
                                <th width={30}>STT</th>
                                <th width={30}>Id</th>
                                <th>Mã code</th>
                                <th width={150}>Trạng thái</th>
                                <th width={110}>SL sản phẩm đạt(Sản phẩm)<span style={{ color: 'red' }}>*</span></th>
                                <th width={100}>Tổng đơn hàng đạt(vnđ)<span style={{ color: 'red' }}>*</span></th>
                                <th width={100}>Đã từng mua hàng đạt(lần)<span style={{ color: 'red' }}>*</span></th>
                                <th width={150}>Ngày tạo mã</th>
                                <th width={150}>Ngày bắt đầu</th>
                                <th width={150}>Ngày kết thúc</th>
                                <th className="text-center" width={80}>Giảm giá(%)</th>
                                <th className="text-center" width={95}>Giảm giá(đ)</th>
                                <th width={160} style={{ textAlign: "center" }}>Thao tác</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                props.listVoucher.map((value, index) => {
                                    if (props.page * props.size > index) return null
                                    if ((props.page + 1) * props.size < index + 1) return null
                                    return (
                                        <tr key={value.id} className="custom-hover-mouse">
                                            <td>{index + 1}</td>
                                            <td>{value.id}</td>
                                            <td>{value.voucherCode}</td>
                                            <td>{TrangThaiPromotion(value.status)}</td>
                                            <td>{value.productQuantity}</td>
                                            <td>{value.totalPrice==null?0:numberWithCommas(value.totalPrice)}₫</td>
                                            <td>{value.orderQuantity}</td>
                                            <td>{convertDate(value.createDate)}</td>
                                            <td className="text-danger">{value.startDate}</td>
                                            <td className="text-success">{value.endDate}</td>
                                            <td className="text-center">{value.salePercent == null ? "-----" : value.salePercent + "%"}</td>
                                            <td className="text-center">{value.salePrice == null ? "-----" : numberWithCommas(value.salePrice) + "₫"}</td>
                                            <td className="text-center">
                                                {
                                                    value.status == 1 ?
                                                        <Tooltip title="Tạm dừng" placement="top-start" arrow>
                                                            <button className="btn btn-warning mar-rgt"><i class="fa fa-pause" onClick={() => { props.onClickPause(value) }}></i></button>
                                                        </Tooltip> : ""
                                                }
                                                {
                                                    value.status == 2 ?
                                                        <Tooltip title="Tiếp tục" placement="top-start" arrow>
                                                            <button className="btn btn-success mar-rgt" onClick={() => { props.onClickStart(value) }}><i class="fa fa-play" ></i></button>
                                                        </Tooltip> : ""

                                                }
                                                {
                                                    value.status != 3 ?
                                                        <Tooltip title="Kết thúc" placement="top-start" arrow>
                                                            <button className="btn btn-danger" onClick={() => { props.onClickStop(value) }}><i class="fa fa-stop" ></i></button>
                                                        </Tooltip> : ""
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }

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
                    </div>
                    <div className="text-right col-lg-6 review-box" >
                        <span> {(props.page + 1) * props.size > props.listVoucher.length ? props.listVoucher.length : (props.page + 1) * props.size}
                            / {props.listVoucher.length}</span>
                        <button className="btn btn-default btn-active-purple mar-lft" onClick={() => { props.clickPre() }}><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                        <button className="btn btn-default btn-active-purple">{props.page + 1}</button>
                        <button className="btn btn-default btn-active-purple" onClick={() => { props.clickNext() }}><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 900, height: 500 }}>
                    <form onSubmit={props.handleSubmit(props.onSubmit)}>
                        <div className="modal-header" style={{ marginTop: "-10px" }}>
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true" onClick={props.handleClose}>×</span>
                            </button>
                            <h4 className="modal-title">Tạo mã giảm giá: </h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="form-group">
                                    <div className="col-lg-12">
                                        <label>Mã giảm giá <span className="text-danger">*</span>:</label>
                                        <input type="text" className="form-control" placeholder="Nhập mã giảm giá" {...props.register("voucherCode", { required: true })} />
                                        {props.errors.voucherCode?.type === 'required' && <span className="text-danger">Không được để trống mã code giảm giá!</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: "10px" }}>
                                <div className="form-group">
                                    <div className="col-lg-3">
                                        <label>Ngày bắt đầu <span className="text-danger">*</span>:</label>
                                        <input type="date" className="form-control" placeholder="Nhập mã giảm giá" {...props.register("startDate", { required: true })} />
                                        {props.errors.startDate?.type === 'required' && <span className="text-danger">Không được để ngày bắt đầu!</span>}
                                    </div>
                                    <div className="col-lg-3">
                                        <label>Ngày kết thúc <span className="text-danger">*</span>:</label>
                                        <input type="date" className="form-control" placeholder="Nhập mã giảm giá" {...props.register("endDate", { required: true })} />
                                        {props.errors.endDate?.type === 'required' && <span className="text-danger">Không được để ngày kết thúc!</span>}
                                    </div>
                                    <div className="col-lg-3">
                                        <label>Số lượng sản phẩm cần:</label>
                                        <input type="number" className="form-control" placeholder="Nhập số lượng tối thiểu" {...props.register("quantityProduct")} />
                                    </div>
                                    <div className="col-lg-3">
                                        <label>Tổng hóa đơn:</label>
                                        <input type="number" className="form-control" placeholder="Tổng hóa đơn tối thiểu" />
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: "10px" }}>
                                <div className="form-group">
                                    <div className="col-lg-6">
                                        <label>Số lần mua hàng:</label>
                                        <input type="number" className="form-control" placeholder="Nhập số lần mua hàng tối thiểu . . ." {...props.register("orderQuantity")}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: "10px" }}>
                                <div className="form-group">
                                    <div className="col-lg-6">
                                        <label>Giảm giá (%) <span className="text-danger">*</span>:</label>
                                        <input type="number" {...props.register("salePercent")} id="sale1" className="form-control" placeholder="Nhập % giảm giá" onChange={onChange1} />
                                    </div>
                                    <div className="col-lg-6">
                                        <label>Giảm giá (vnđ) <span className="text-danger">*</span>:</label>
                                        <input type="number" {...props.register("salePrice")} id="sale2" className="form-control" placeholder="Nhập vnđ giảm giá" onChange={onChange2} />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="modal-footer" style={{ backgroundColor: "white", position: 'absolute', bottom: '1px', right: '10px', width: '98%' }}>
                            <button onClick={props.handleClose} className="btn btn-default" type="button">Đóng</button>
                            <button className="btn btn-success" type="submit">Tạo</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default AdminVoucher;
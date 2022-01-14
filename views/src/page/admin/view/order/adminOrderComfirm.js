import {
    NavLink
} from "react-router-dom";

import { convertDate, convertGetAddress, convertGetFullname, convertGetPhone, numberWithCommas, StatusOrder, TrangThaiGiaoHang, typeOrder } from "../../../../Service/common";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormLabel from '@mui/material/FormLabel';
import { ToastContainer } from "react-toastify";
import { SwapSpinner } from "react-spinners-kit";
import Tooltip from '@mui/material/Tooltip'

function AdminOrderComfirm(props) {
    const price = (value) => {
        const { price, quantity, sale } = value
        const priceDate = sale !== null ? price * quantity * (1 - sale / 100) : price * quantity
        return priceDate
    }
    const totalQuantityProduct = (value) => {
        const { orderdetail } = value
        let total = 0
        orderdetail.map((elm) => {
            total += elm.quantity
        })
        return total;
    }

    return (
        <div>
            <div class="panel">
                <div class="panel-heading">
                    <h2 className="panel-title">ĐƠN HÀNG ĐÃ XÁC NHẬN</h2>
                    <ol className="breadcrumb">
                        <li><NavLink to="/admin" style={{ fontSize: "15px" }}>Trang chủ</NavLink></li>
                        <li><NavLink to="/admin/order" style={{ fontSize: "15px" }}>Đơn hàng</NavLink></li>
                        <li><NavLink to="/admin/order" style={{ fontSize: "15px" }}>Đơn hàng đã xác nhận</NavLink></li>
                    </ol>
                </div>
                <br />
                <br />
                <br />
                <div id="page-title" className="mar-top">
                    <div className="mar-top">
                        <span className="mar-rgt">Sắp xếp</span>
                        <select onChange={props.onChangeSort} className="custom-select">
                            <option value="createDate">Ngày tạo</option>
                            <option value="total">Tổng hóa đơn </option>
                            <option value="address">Địa chỉ</option>
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
                {
                    props.loadingElm === true ?
                        <div className="custom-center">
                            <SwapSpinner size={40} color="#686769" loading={props.loadingElm} ></SwapSpinner>
                        </div> :
                        <div>
                            <div class="panel-body">
                                <table id="demo-dt-basic" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th width={30}>STT</th>
                                            <th width={40}>ID</th>
                                            <th width={160}>Khách hàng</th>
                                            <th>Số điện thoại</th>
                                            <th width={180}>Tổng tiền</th>
                                            <th width={100}>Đã đặt cọc</th>
                                            <th width={200}>Ngày xác nhận đơn hàng</th>
                                            <th className="min-tablet">Địa chỉ giao hàng</th>
                                            <th width={160} className="min-desktop">Trạng thái đơn hàng</th>
                                            <th width={65}>SL sản phẩm</th>
                                            <th width={100}>Loại đơn hàng</th>
                                            <th width={100}>Mã giảm giá</th>
                                            <th width={180} className="text-center">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            props.listOrder === undefined ? "" :
                                                props.listOrder.map((value, index) => {
                                                    const { status, account } = value
                                                    const { fullname } = account
                                                    const { phone } = account
                                                    if (props.page * props.size > index) return null
                                                    if ((props.page + 1) * props.size < index + 1) return null
                                                    const { address } = value
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{value.id}</td>
                                                            <td>{value.typeorder === 1 ? fullname : convertGetFullname(value.description)}</td>
                                                            <td>{value.typeorder === 1 ? phone : convertGetPhone(value.description)}</td>
                                                            <td>{value.total == null ? 0 : numberWithCommas(value.total - value.deposit)}₫</td>
                                                            <td>{value.deposit == null ? 0 : numberWithCommas(value.deposit)}₫</td>
                                                            <td>{convertDate(value.createDate)}</td>
                                                            <td>{address}</td>
                                                            <td className="custom-center">
                                                                <select className="custom-select" value={status} onChange={(e) => { props.onChangeStatusOrder(e, value) }}>
                                                                    <option value={1}>Chờ xác nhận</option>
                                                                    <option value={2}>Đã xác nhận</option>
                                                                    <option value={3}>Đang giao hàng</option>
                                                                    <option className="custom-opacity" value={4} disabled>Đã giao hàng</option>
                                                                    <option value={5} className="text-danger">Hủy đơn</option>
                                                                </select>
                                                            </td>
                                                            <td className="text-center">{totalQuantityProduct(value)}</td>
                                                            <td>{typeOrder(value.typeorder)}</td>
                                                            <td>{value.voucherCode}</td>
                                                            <td style={{ textAlign: "center" }}>
                                                                <Tooltip title="Xem chi tiết" placement="top-start" arrow>
                                                                    <button data-target="#detail" data-toggle="modal"
                                                                        onClick={() => { props.onClickViewOrder(value) }}
                                                                        className="btn btn-primary"><i className="fa fa-eye"></i>
                                                                    </button>
                                                                </Tooltip>
                                                                <Tooltip title="Chỉnh sửa đơn hàng" placement="top-start" arrow>
                                                                    <button data-target="#update-status" data-toggle="modal"
                                                                        onClick={() => { props.onclickUpdateOrder(value) }}
                                                                        className="btn btn-warning mar-lft"><i class="fa fa-pencil" aria-hidden="true"></i>
                                                                    </button>
                                                                </Tooltip>
                                                                <Tooltip title="Xem lịch sử" placement="top-start" arrow className="mar-lft">
                                                                    <button title="Xem chi tiết" data-target="#history" data-toggle="modal"
                                                                        onClick={() => { props.onClickOrderHistory(value) }} className="btn btn-default">
                                                                        <i class="fa fa-history" aria-hidden="true"></i>
                                                                    </button>
                                                                </Tooltip>
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
                                    <span> {(props.page + 1) * props.size > props.listOrder.length ? props.listOrder.length : (props.page + 1) * props.size}
                                        / {props.listOrder.length}</span>
                                    <button className="btn btn-default btn-active-purple mar-lft" onClick={() => { props.clickPre() }}><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                                    <button className="btn btn-default btn-active-purple">{props.page + 1}</button>
                                    <button className="btn btn-default btn-active-purple" onClick={() => { props.clickNext() }}><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                }
            </div>
            {/* lịch sử đơn hàng */}
            <div className="modal" id="history" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content ">
                        {/*Modal header*/}
                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">Lịch sử:</h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <ul style={{ marginLeft: "50px" }}>
                                    {
                                        props.historyOrder.map((value, index) => {
                                            if (index + 1 == props.historyOrder.length) {
                                                return (
                                                    <li style={{ color: "red", fontStyle: "italic" }} key={index}>- {index + 1}. Trạng thái: {value.statusorder.status}. Thời gian: {convertDate(value.createDate)}</li>
                                                )
                                            }
                                            return (
                                                <li key={index}>- {index + 1}. Trạng thái: {value.statusorder.status}. Thời gian: {convertDate(value.createDate)}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button data-dismiss="modal" className="btn btn-default" type="button">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" id="detail" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/*Modal header*/}
                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">Chi tiết đơn hàng</h4>
                        </div>
                        {/*Modal body*/}

                        <div className="modal-body custom-modal-body-height">
                            <h4 className="text-thin">Sản phẩm </h4>
                            <table id="demo-dt-basic" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Sản phẩm</th>
                                        <th>Hình ảnh</th>
                                        <th class="min-tablet">Số lượng</th>
                                        <th class="min-tablet">Đơn giá</th>
                                        <th class="min-desktop">Giảm giá</th>
                                        <th class="min-desktop">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.listOrderDetail === null ? "Không có sản phẩm nào" :
                                            props.listOrderDetail.map(value => {
                                                const { product } = value
                                                return (
                                                    <tr kry={product.id}>
                                                        <td>{product.id}</td>
                                                        <td>{product.title == null ? product.name : product.title.name + " " + product.name}</td>
                                                        <td><img src={product.image} height={50} alt="" /></td>
                                                        <td>{value.quantity}</td>
                                                        <td>{numberWithCommas(value.price)} ₫</td>
                                                        <td>
                                                            {
                                                                value.sale === null ? "" : value.sale + "%"
                                                            }
                                                        </td>
                                                        <td>{numberWithCommas(price(value))}</td>
                                                    </tr>
                                                )
                                            })
                                    }
                                </tbody>
                            </table>
                            <hr />
                        </div>
                        {/*Modal footer*/}
                        <div className="modal-footer">
                            <button data-dismiss="modal" className="btn btn-default" type="button">Close</button>

                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" id="update-status" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/*Modal header*/}
                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">Sửa  đơn hàng</h4>
                        </div>
                        {/*Modal body*/}
                        <div className="modal-body">
                            <form id="textarea-address">
                                <div className="form-group">
                                    <label>Địa chỉ:</label>
                                    <textarea defaultValue={props.address} name="address" onChange={(e) => { props.onChangeSelectStatusOrder(e) }}
                                        type="text" placeholder="Địa chỉ nhận đơn . . ." className="form-control" />
                                </div>
                                <div className="custom-modal-body-height">
                                    <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Sản phẩm</th>
                                                <th>Hình ảnh</th>
                                                <th width={80}>Số lượng</th>
                                                <th className="min-tablet">Đơn giá</th>
                                                <th className="min-desktop">Giảm giá</th>
                                                <th className="min-desktop">Thành tiền</th>
                                                <th className="min-desktop">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                props.listOrderDetail === null ? "Không có sản phẩm nào" :
                                                    props.listOrderDetail.map(value => {
                                                        const { product } = value
                                                        return (
                                                            <tr kry={product.id}>
                                                                <td>{product.id}</td>
                                                                <td>{product.title == null ? product.name : product.title.name + " " + product.name}</td>
                                                                <td><img src={product.image} height={50} alt="" /></td>
                                                                <td>
                                                                    <input defaultValue={value.quantity} id="quantity" onChange={(e) => props.onChangeQuantity(e, value)} type="number" className="form-control" />
                                                                </td>
                                                                <td>{numberWithCommas(value.price)} ₫</td>
                                                                <td>
                                                                    {
                                                                        value.sale === null ? "" : value.sale + "%"
                                                                    }
                                                                </td>
                                                                <td>{numberWithCommas(price(value))}</td>
                                                                <td className="text-center">
                                                                    <Tooltip title="Xóa" placement="top-start" arrow className="mar-lft">
                                                                        <button className="btn btn-danger" type="button" onClick={() => { props.onClickDeleteOrderdetail(value) }}>
                                                                            <i className="fa fa-trash-o"></i>
                                                                        </button>
                                                                    </Tooltip>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                        {/*Modal footer*/}
                        <div className="modal-footer">
                            <button data-dismiss="modal" className="btn btn-default" type="button">Đóng</button>
                            <button data-dismiss="modal" className="btn btn-primary" onClick={(e) => { props.onClickUpdate(e) }}>Cập nhập</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminOrderComfirm;
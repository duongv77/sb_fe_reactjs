import {
    NavLink
} from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { convertDate, numberWithCommas, TrangThaiGiaoHang, convertGetFullname, convertGetPhone, StatusOrder, typeOrder } from "../../../../Service/common";
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function AdminOrderTransfer(props) {
    const price = (value) => {
        const { price, quantity, sale } = value
        const priceDate = sale !== null ? price * quantity * (1 - sale / 100) : price * quantity
        return priceDate
    }
    const totalQuantityProduct = (value) => {
        const { orderdetail } = value
        let total = 0
        orderdetail.map(elm => {
            if (elm.status == 1)
                total += elm.quantity
        })
        return total;
    }

    return (
        <div>
            <div class="panel">
                <div class="panel-heading">
                    <h2 className="panel-title">ĐƠN HÀNG ĐÃ GIAO</h2>
                    <ol className="breadcrumb">
                        <li><NavLink to="/admin" style={{ fontSize: "15px" }}>Trang chủ</NavLink></li>
                        <li><NavLink to="/admin/order" style={{ fontSize: "15px" }} >Đơn hàng</NavLink></li>
                        <li><NavLink to="/admin/order" style={{ fontSize: "15px" }}>Đơn đã giao</NavLink></li>
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
                <div class="panel-body">
                    <table id="demo-dt-basic" class="table table-striped table-bordered" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th width={30}>STT</th>
                                <th width={80}>ID</th>
                                <th>Khách hàng</th>
                                <th width={120}>Số điện thoại</th>
                                <th width={160}>Tổng tiền</th>
                                <th width={180}>Đã đặt cọc</th>
                                <th width={180}>Thời gian giao hàng</th>
                                <th className="min-tablet">Địa chỉ giao hàng</th>
                                <th width={140}>Trạng thái đơn hàng</th>
                                <th width={65}>SL sản phẩm</th>
                                <th width={120}>Loại đơn hàng</th>
                                <th width={100}>Mã giảm giá</th>
                                <th width={130}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.listOrder === undefined ? "" :
                                    props.listOrder.map((value, index) => {
                                        const { phone } = value.account
                                        const { fullname } = value.account
                                        if (props.page * props.size > index) return null
                                        if ((props.page + 1) * props.size < index + 1) return null
                                        return (
                                            <tr style={{ backgroundColor: value.status == StatusOrder.STATUS_YEU_CAU_TRA_HANG ? "#FFFF66" : "" }} key={value.id}>
                                                <td>{index + 1}</td>
                                                <td>{value.id}</td>
                                                <td>{value.typeorder === 1 ? fullname : convertGetFullname(value.description)}</td>
                                                <td>{value.typeorder === 1 ? phone : convertGetPhone(value.description)}</td>
                                                <td>{numberWithCommas(value.total === null ? 0 : value.total)} ₫</td>
                                                <td>{value.deposit == null ? 0 : numberWithCommas(value.deposit)}₫</td>
                                                <td>{convertDate(value.createDate)}</td>
                                                <td>{value.address}</td>
                                                <td>{TrangThaiGiaoHang(value.status)}</td>
                                                <td>{totalQuantityProduct(value)}</td>
                                                <td>{typeOrder(value.typeorder)}</td>
                                                <td>{value.voucherCode}</td>
                                                <td style={{ textAlign: "center" }}>
                                                    {
                                                        value.status == 6 ?
                                                            <Tooltip title="Xem chi tiết" placement="top-start">
                                                                <button onClick={() => { props.handleOpen6(value) }}
                                                                    className="btn btn-primary"><i className="fa fa-eye"></i></button>
                                                            </Tooltip>
                                                            :
                                                            <Tooltip title="Xem chi tiết" placement="top-start">
                                                                <button onClick={() => { props.handleOpen4(value) }}
                                                                    className="btn btn-primary"><i className="fa fa-eye"></i></button>
                                                            </Tooltip>
                                                    }
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
                        {
                            props.listOrder != null ?
                                <span> {(props.page + 1) * props.size > props.listOrder.length ? props.listOrder.length : (props.page + 1) * props.size}
                                    / {props.listOrder.length}</span>
                                : null
                        }
                        <button className="btn btn-default btn-active-purple mar-lft" onClick={() => { props.clickPre() }}><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                        <button className="btn btn-default btn-active-purple">{props.page + 1}</button>
                        <button className="btn btn-default btn-active-purple" onClick={() => { props.clickNext() }}><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>

            <Modal
                open={props.open6}
                onClose={props.handleClose6}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 1300, height: 700 }}>
                    <div className="modal-header">
                        <button data-dismiss="modal" className="close" type="button">
                            <span aria-hidden="true" onClick={props.handleClose6}>×</span>
                        </button>
                        <h4 className="modal-title">Đơn hàng: </h4>
                    </div>
                    <div className="modal-body">
                        <form id="textarea-address">
                            <div className="row" style={{ marginBottom: "10px" }}>
                                <div className="col-lg-6">
                                    <label>Lí do thay đổi đơn hàng<span className="text-danger">*</span>:</label>
                                    <textarea name="address" disabled value={props.orderView.returnOrder}
                                        type="text" placeholder="Lí do thay đổi đơn hàng . . ." className="form-control" />
                                </div>
                                <div className="col-lg-6">
                                    <label>Địa chỉ<span className="text-danger">*</span>:</label>
                                    <textarea name="address" disabled value={props.orderView.address}
                                        type="text" placeholder="Địa chỉ nhận đơn . . ." className="form-control" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="row">
                                    <div className="col-lg-6 custom-overflow">
                                        <label>Đơn hàng ban đầu:</label>
                                        <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" >
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Sản phẩm</th>
                                                    <th>Hình ảnh</th>
                                                    <th width={80}>Số lượng</th>
                                                    <th className="min-tablet">Đơn giá</th>
                                                    <th className="min-desktop">Giảm giá</th>
                                                    <th className="min-desktop">Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    props.orderView.orderdetail == undefined ? "" :
                                                        props.orderView.orderdetail.map((value, index) => {
                                                            const { product } = value
                                                            if (value.status != 6) return null
                                                            return (
                                                                <tr key={index} >
                                                                    <td>{index + 1}</td>
                                                                    <td>{product.title == null ? product.name : product.title.name + " " + product.name}</td>
                                                                    <td><img src={product.image} height={50} /></td>
                                                                    <td>{value.quantity}</td>
                                                                    <td>{numberWithCommas(value.price)}₫</td>
                                                                    <td>{value.sale}</td>
                                                                    <td>{numberWithCommas(price(value))}₫</td>
                                                                </tr>
                                                            )
                                                        })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-lg-6 custom-overflow">
                                        <label>Đơn hàng sau khi sửa:</label>
                                        <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Sản phẩm</th>
                                                    <th>Hình ảnh</th>
                                                    <th width={80}>Số lượng</th>
                                                    <th className="min-tablet">Đơn giá</th>
                                                    <th className="min-desktop">Giảm giá</th>
                                                    <th className="min-desktop">Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    props.orderView.orderdetail == null ? "" :
                                                        props.orderView.orderdetail.map((value, index) => {
                                                            const { product } = value
                                                            if (value.status != 1) return null
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{product.title == null ? product.name : product.title.name + " " + product.name}</td>
                                                                    <td><img src={product.image} height={50} /></td>
                                                                    <td>{value.quantity}</td>
                                                                    <td>{numberWithCommas(value.price)}₫</td>
                                                                    <td>{value.sale}</td>
                                                                    <td>{numberWithCommas(price(value))}₫</td>
                                                                </tr>
                                                            )
                                                        })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={props.open4}
                onClose={props.handleClose4}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 1000, height: 680 }}>
                    <div className="modal-header">
                        <button data-dismiss="modal" className="close" type="button">
                            <span aria-hidden="true" onClick={props.handleClose4}>×</span>
                        </button>
                        <h4 className="modal-title">Đơn hàng: </h4>
                    </div>
                    <div className="modal-body">
                        <form id="textarea-address">
                            <div className="row" style={{ marginBottom: "10px" }}>
                                <div className="col-lg-6">
                                    <label>Địa chỉ<span className="text-danger">*</span>:</label>
                                    <textarea name="address" disabled value={props.orderView.address}
                                        type="text" placeholder="Địa chỉ nhận đơn . . ." className="form-control" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="row">
                                    <div className="col-lg-12 custom-overflow">
                                        <label>Đơn hàng ban đầu:</label>
                                        <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" >
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Sản phẩm</th>
                                                    <th>Hình ảnh</th>
                                                    <th width={80}>Số lượng</th>
                                                    <th className="min-tablet">Đơn giá</th>
                                                    <th className="min-desktop">Giảm giá</th>
                                                    <th className="min-desktop">Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    props.orderView.orderdetail == null ? "" :
                                                        props.orderView.orderdetail.map((value, index) => {
                                                            const { product } = value
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{product.title == null ? product.name : product.title.name + " " + product.name}</td>
                                                                    <td><img src={product.image} height={50} /></td>
                                                                    <td>{value.quantity}</td>
                                                                    <td>{numberWithCommas(value.price)}₫</td>
                                                                    <td>{value.sale}</td>
                                                                    <td>{numberWithCommas(price(value))}₫</td>
                                                                </tr>
                                                            )
                                                        })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
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
        </div>
    )
}

export default AdminOrderTransfer;
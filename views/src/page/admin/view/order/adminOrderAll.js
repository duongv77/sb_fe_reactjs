import {
    NavLink
} from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { convertDate, convertGetFullname, convertGetPhone, numberWithCommas, StatusOrder, TrangThaiGiaoHang, typeOrder } from "../../../../Service/common";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip'

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

function AdminOrderAll(props) {
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
    try {
        return (
            <div>
                <div class="panel">
                    <div class="panel-heading">
                        <h2 className="panel-title" >TẤT CẢ ĐƠN HÀNG</h2>
                        <ol className="breadcrumb">
                            <li style={{ fontSize: "15px" }}><NavLink to="/admin">Trang chủ</NavLink></li>
                            <li style={{ fontSize: "15px" }}><NavLink to="/admin/order">Tất cả đơn hàng</NavLink></li>
                        </ol>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div id="page-title" className="mar-top">
                        <div className="mar-top">
                            <label className=" mar-rgt">Sắp xếp </label>
                            <select onChange={props.onChangeSort} className="custom-select">
                                <option value="createDate">Ngày tạo</option>
                                <option value="total">Tổng hóa đơn </option>
                                <option value="address">Địa chỉ</option>
                            </select>
                        </div>
                        <div className="searchbox">
                            <div className="input-group custom-search-form">
                                <input type="text" className="form-control" onChange={props.onChangeSearch} placeholder="Tìm kiếm . . ." />
                                <span className="input-group-btn">
                                    <button className="text-muted" type="button"><i className="fa fa-search" /></button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <table id="demo-dt-basic" className="table table-striped table-bordered" cellSpacing={0} width="100%">
                            <thead>
                                <tr>
                                    <th width={30}>STT</th>
                                    <th width={80}>ID</th>
                                    <th>Khách hàng</th>
                                    <th>Số điện thoại</th>
                                    <th className="min-tablet">Tổng tiền</th>
                                    <th width={100}>Đã đặt cọc</th>
                                    <th width={160}>Thời gian cập nhập gần nhất</th>
                                    <th className="min-tablet">Địa chỉ giao hàng</th>
                                    <th width={125}>Trạng thái đơn hàng</th>
                                    <th width={65}>SL sản phẩm</th>
                                    <th className="min-desktop">Loại order</th>
                                    <th className="min-desktop">Mã giảm giá</th>
                                    <th width={150} style={{ textAlign: "center" }}>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    props.listOrder === undefined ? "" :
                                        props.listOrder.map((value, index) => {
                                            if ((props.page - 1) * props.size > index) return null
                                            if (props.page * props.size < index + 1) return null
                                            const { phone } = value.account
                                            const { fullname } = value.account
                                            return (
                                                <tr key={index} style={{ backgroundColor: value.status == StatusOrder.STATUS_YEU_CAU_TRA_HANG ? "#FFFF66" : "" }}>
                                                    <td>{index + 1}</td>
                                                    <td>{value.id}</td>
                                                    <td>{value.typeorder === 1 ? fullname : convertGetFullname(value.description)}</td>
                                                    <td>{value.typeorder === 1 ? phone : convertGetPhone(value.description)}</td>
                                                    <td>{value.total == null ? 0 : numberWithCommas(value.total)}₫</td>
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
                                                                <Tooltip title="Xem chi tiết" placement="top-start" arrow>
                                                                    <button title="Xem chi tiết"
                                                                        onClick={() => { props.handleOpen(value) }} className="btn btn-primary">
                                                                        <i className="fa fa-eye"></i>
                                                                    </button>
                                                                </Tooltip>
                                                                :
                                                                <Tooltip title="Xem chi tiết" placement="top-start" arrow>
                                                                    <button title="Xem chi tiết" data-target="#detail" data-toggle="modal"
                                                                        onClick={() => { props.onClickViewOrder(value) }} className="btn btn-primary">
                                                                        <i className="fa fa-eye"></i>
                                                                    </button>
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
                            {/* <span style={{ opacity: "0.6", marginLeft: "20px" }}>Sản phẩm ngưng hoạt đông: {productOff}/{props.listProduct.length}</span> */}
                        </div>
                        <div className="text-right col-lg-6 review-box" >
                            <span> {(props.page) * props.size > props.listOrder.length ? props.listOrder.length : (props.page) * props.size}
                                / {props.listOrder.length}</span>
                            <button className="btn btn-default btn-active-purple mar-lft" onClick={() => { props.onClickPre() }}><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                            <button className="btn btn-default btn-active-purple">{props.page}</button>
                            <button className="btn btn-default btn-active-purple" onClick={() => { props.onClickNext() }}><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                        </div>
                    </div>
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

                            <div className="modal-body custom-modal-body-height" >
                                <div>
                                    <h4 className="text-thin">Khách hàng:</h4>
                                </div>
                                <hr />
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
                                                        <tr key={product.id}>
                                                            <td>{product.id}</td>
                                                            <td>{product.title.name} {product.name}</td>
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

                <Modal
                    open={props.open}
                    onClose={props.handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 1300, height: 780 }}>
                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true" onClick={props.handleClose}>×</span>
                            </button>
                            <h4 className="modal-title">Đơn hàng: </h4>
                        </div>
                        <div className="modal-body">
                            <form id="textarea-address">
                                <div className="row" style={{ marginBottom: "10px" }}>
                                    <div className="col-lg-6">
                                        <label>Lí do thay đổi đơn hàng<span className="text-danger">*</span>:</label>
                                        <textarea name="address" id="textarea-lido" value={props.returnOrder} disabled
                                            type="text" placeholder="Lí do thay đổi đơn hàng . . ." className="form-control" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="row">
                                        <div className="col-lg-6 custom-overflow">
                                            <h3> Đơn hàng băn đầu:</h3>
                                            <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" >
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
                                                        props.listOrderDetail === null ? "Không có sản phẩm nào" :
                                                            props.listOrderDetail.map(value => {
                                                                const { product } = value
                                                                if (value.status != 6) return null
                                                                return (
                                                                    <tr kry={product.id}>
                                                                        <td>{product.id}</td>
                                                                        <td>{product.title.name} {product.name}</td>
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
                                        </div>
                                        <div className="col-lg-6 custom-overflow">
                                            <h3> Đơn hàng sau khi sửa:</h3>
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
                                                        props.listOrderDetail === null ? "Không có sản phẩm nào" :
                                                            props.listOrderDetail.map(elm => {
                                                                const { product } = elm
                                                                if (elm.status != 1) return null
                                                                return (
                                                                    <tr kry={product.id}>
                                                                        <td>{product.id}</td>
                                                                        <td>{product.title.name} {product.name}</td>
                                                                        <td><img src={product.image} height={50} alt="" /></td>
                                                                        <td>{elm.quantity}</td>
                                                                        <td>{numberWithCommas(elm.price)} ₫</td>
                                                                        <td>
                                                                            {
                                                                                elm.sale === null ? "" : elm.sale + "%"
                                                                            }
                                                                        </td>
                                                                        <td>{numberWithCommas(price(elm))}</td>
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
                        <div className="modal-footer" style={{ backgroundColor: "white" }}>
                            <button onClick={props.handleClose} className="btn btn-default" type="button">Close</button>
                        </div>
                    </Box>
                </Modal>
            </div>
        )
    } catch (error) {
        console.log(error)
        return ""
    }
}

export default AdminOrderAll;
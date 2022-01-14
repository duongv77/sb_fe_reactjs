import {
    NavLink
} from "react-router-dom";
import Tooltip from '@mui/material/Tooltip'
import { convertDate, numberWithCommas, StatusOrder, TrangThaiGiaoHang, convertGetPhone, convertGetFullname } from "../../../../Service/common";
function AdminOrder(props) {

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

    const priceDatCoc = (total, address) => {
        if (props.checkAddress(address)) {
            if (total <= 80000) {
                return 0;
            } else if (total < 200000) {
                return total / 100 * 20
            } else {
                return total / 100 * 15
            }
        } else {
            if (total < 200000) {
                return total / 100 * 30
            } else {
                return total / 100 * 15
            }
        }
    }

    return (
        <div>
            <div class="panel">
                <div class="panel-heading">
                    <h2 className="panel-title" >ĐƠN HÀNG CHỜ XÁC NHẬN</h2>
                    <ol className="breadcrumb">
                        <li><NavLink to="/admin" style={{ fontSize: "15px" }}>Trang chủ</NavLink></li>
                        <li><NavLink to="/admin/order" style={{ fontSize: "15px" }}>Đơn hàng</NavLink></li>
                        <li><NavLink to="/admin/order/new" style={{ fontSize: "15px" }}>Đơn chờ xác nhận</NavLink></li>
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
                                <th width={30}>ID</th>
                                <th>Khách hàng</th>
                                <th width={110}>Số điện thoại</th>
                                <th width={100} className="min-tablet">Tổng tiền</th>
                                <th width={90} className="min-desktop">Đặt cọc</th>
                                <th width={150} className="min-tablet">Ngày tạo đơn hàng</th>
                                <th className="min-tablet">Địa chỉ giao hàng</th>
                                <th width={120} className="min-desktop">Trạng thái đơn hàng</th>
                                <th width={65} className="min-desktop">Số lượng sản phẩm</th>
                                <th width={100}>Mã giảm giá</th>
                                <th width={80} className="text-center">Thao tác</th>
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
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{value.id}</td>
                                                <td>{value.typeorder === 1 ? fullname : convertGetFullname(value.description)}</td>
                                                <td>{value.typeorder === 1 ? phone : convertGetPhone(value.description)}</td>
                                                <td className="text-center">{value.total == null ? 0 : numberWithCommas(value.total)}₫</td>
                                                <td className="text-center">{numberWithCommas(priceDatCoc(value.total).toFixed(0))}₫</td>
                                                <td>{convertDate(value.createDate)}</td>
                                                <td>{value.address}</td>
                                                <td>{TrangThaiGiaoHang(value.status)}</td>
                                                <td className="text-center">{totalQuantityProduct(value, value.address)}</td>
                                                <td>{value.voucherCode}</td>
                                                <td className="custom-center">
                                                    <Tooltip title="Duyệt đơn hàng" placement="top-start" arrow>
                                                        <button onClick={() => { props.onClickAccept(value.id) }} className="btn btn-success mar-lft"><i className="fa fa-check"></i></button>
                                                    </Tooltip>
                                                    <Tooltip title="Huỷ đơn hàng" placement="top-start" arrow>
                                                        <button onClick={() => { props.onCLickCancel(value.id) }} className="btn btn-danger mar-lft"><i class="fa fa-times" aria-hidden="true"></i></button>
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
                                                    <tr key={product.id}>
                                                        <td>{product.id}</td>
                                                        <td>{product.title.name} {product.name}</td>
                                                        <td><img src={product.image} height={50} alt="" /></td>
                                                        <td>{value.quantity}</td>
                                                        <td>{numberWithCommas(value.price)} ₫</td>
                                                        <td>
                                                            {value.sale === null ? "" : value.sale + "%"}
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
        </div>
    )
}
export default AdminOrder;
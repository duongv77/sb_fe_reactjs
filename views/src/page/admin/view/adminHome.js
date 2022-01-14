import {
    NavLink
} from "react-router-dom";
import { convertDate, convertGetFullname, convertGetPhone, numberWithCommas, TrangThaiGiaoHang } from "../../../Service/common";

import DoanhThu from "./chart/revenueYear"
import RateMonth from "./chart/rateMonth";
import ReportTotal from "./chart/reportTotal";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });
  
  const NoMaxWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 'none',
    },
  });

function AdminHome(props) {
    const data = [
        { name: "conan", value: 20000 },
        { name: "truyện tranh", value: 2000 },
        { name: "sách văn học", value: 5000 }
    ]
    const data1 = [
        { name: "tháng 1", value: 20000 },
        { name: "tháng 2", value: 10000 },
        { name: "tháng 3", value: 5000 },
        { name: "tháng 4", value: 6000 },
        { name: "tháng 5", value: 8000 },
        { name: "tháng 6", value: 1000 },
    ]
    const totalQuantityProduct = (value) => {
        const { orderdetail } = value
        let total = 0
        orderdetail.map((elm) => {
            total += elm.quantity
        })
        return total;
    }


    const checkAddress = (string) => {
        let check = false
        const HN = "HÀ NỘI"
        if (string == null) return check
        const stringToCase = string.toUpperCase()
        for (var i = 0; i < string.length; i++) {
            if (stringToCase.charAt(i) == "H") {
                if (stringToCase.slice(i, i + 7).trim() === "HÀ NỘI") check = true
            }
        }
        return check
    }

    const priceDatCoc = (total, address) => {
        if (checkAddress(address)) {
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

    const checkSizeText = (value) => {
        if (value.length > 10) {
            return value.slice(0, 10) + "..."
        }
        return value
    }
    return (
        <div>
            <div>
                <div id="page-title">
                    <h1 className="page-header text-overflow">Dashboard</h1>
                </div>
                <ol className="breadcrumb">
                    <li><NavLink to="/admin" style={{ fontSize: "15px" }}>Home</NavLink></li>
                </ol>
                <div id="page-content">
                    <div className="row">
                        <div className="col-sm-6 col-lg-3">
                            <div className="panel media pad-all">
                                <div >
                                    <div className="media-left">
                                        <span className="icon-wrap icon-wrap-sm icon-circle bg-success" style={{ backgroundColor: "#759966" }}>
                                        <i class="fa fa-file-text-o fa-2x" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div className="media-body">
                                        <p className="text-2x mar-no text-thin">{props.orderMonth.length}</p>
                                        <p className="text-muted mar-no">Đơn hàng trong tháng</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="panel media pad-all">
                                <NavLink to="/admin/order/new">
                                    <div className="media-left">
                                        <span className="icon-wrap icon-wrap-sm icon-circle bg-info" style={{ backgroundColor: "#5f98b5" }}>
                                            <i className="fa fa-shopping-cart fa-2x" />
                                        </span>
                                    </div>
                                    <div className="media-body">
                                        <p className="text-2x mar-no text-thin">{props.listOrder.length}</p>
                                        <p className="text-muted mar-no">Đơn đặt hàng chờ xác nhận</p>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="panel media pad-all">
                                <div className="media-left">
                                    <span className="icon-wrap icon-wrap-sm icon-circle bg-warning" style={{ backgroundColor: "#d3c161" }}>
                                        <i className="fa fa-comment fa-2x" />
                                    </span>
                                </div>
                                <div className="media-body">
                                    <p className="text-2x mar-no text-thin">{props.countComment}</p>
                                    <p className="text-muted mar-no">Bình luận</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="panel media pad-all">
                                <div className="media-left">
                                    <span className="icon-wrap icon-wrap-sm icon-circle bg-danger" style={{ backgroundColor: "#cd4949" }}>
                                        <i className="fa fa-dollar fa-2x" />
                                    </span>
                                </div>
                                <div className="media-body">
                                    <p className="text-2x mar-no text-thin">{props.countPromotion}</p>
                                    <p className="text-muted mar-no">Chương trình sale</p>
                                </div>
                            </div>
                            {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
                        </div>
                    </div>
                    {/*===================================================*/}
                    {/*End Tiles - Bright Version*/}
                    <div className="row">
                        <div className="col-lg-7">
                            {/*User table*/}
                            {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
                            <div className="panel">
                                <div className="panel-body">
                                    <div className="pad-btm form-inline">
                                        <div className="row">
                                            <div className="row" style={{ marginBottom: '-50px' }}>
                                                <div className="col-sm-6 table-toolbar-left" style={{ marginBottom: '-50px' }}>
                                                    <h3 className="panel-title">Đơn đặt hàng mới ({props.orderNew.length})</h3>
                                                </div>
                                                <div className="col-sm-6 table-toolbar-right" style={{ marginBottom: '-50px' }}>
                                                    <div className="form-group">
                                                       
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 table-toolbar-right">
                                                <div className="btn-group">
                                                    <div className="btn-group">
                                                        <ul role="menu" className="dropdown-menu dropdown-menu-right">
                                                            <li><a href="#">Action</a></li>
                                                            <li><a href="#">Another action</a></li>
                                                            <li><a href="#">Something else here</a></li>
                                                            <li className="divider" />
                                                            <li><a href="#">Separated link</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th width={30}>ID</th>
                                                    <th>Khách hàng</th>
                                                    <th width={110}>Số điện thoại</th>
                                                    <th width={100} className="min-tablet">Tổng tiền</th>
                                                    <th width={100} className="min-tablet">Cần đặt cọc</th>
                                                    <th width={150} className="min-tablet">Ngày tạo đơn hàng</th>
                                                    <th className="min-tablet">Địa chỉ giao hàng</th>
                                                    <th width={120} className="min-desktop">Trạng thái đơn hàng</th>
                                                    <th width={90} className="min-desktop">Số lượng sản phẩm</th>
                                                    <th width={80} className="text-center">Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    props.orderNew.map(value => {
                                                        const { phone } = value.account
                                                        const { fullname } = value.account
                                                        return (
                                                            <tr>
                                                                <td>{value.id}</td>
                                                                <td>{value.typeorder === 1 ? fullname : convertGetFullname(value.description)}</td>
                                                                <td>{value.typeorder === 1 ? phone : convertGetPhone(value.description)}</td>
                                                                <td>{value.total == null ? 0 : numberWithCommas(value.total)}₫</td>
                                                                <td className="text-center">{numberWithCommas(priceDatCoc(value.total).toFixed(0))}₫</td>
                                                                <td>{convertDate(value.createDate)}</td>
                                                                <td>
                                                                    <Tooltip placement="top-start" title={value.address}>
                                                                        <span className="custtom-hover-mouse">{checkSizeText(value.address)}</span>
                                                                    </Tooltip>
                                                                </td>
                                                                <td>{TrangThaiGiaoHang(value.status)}</td>
                                                                <td className="text-center">{totalQuantityProduct(value)}</td>
                                                                <td className="text-right">
                                                                    <a className="btn btn-xs btn-default add-tooltip" data-toggle="tooltip" href="#" data-original-title="Duyệt đơn" data-container="body" onClick={() => { props.onClickAccept(value.id) }}><i className="fa fa-check" /></a>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {
                                    props.checkRole() ?
                                        <DoanhThu />
                                        : ""
                                }
                            </div>
                            <div className="row">

                            </div>
                            <div className="row custom-center">
                                {
                                    props.checkRole() ?
                                        <RateMonth {...props} /> : ""
                                }
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="row">
                                <div className="col-sm-6 col-lg-6">
                                    <div className="panel panel-mint panel-colorful">
                                        <div className="pad-all media">
                                            <div className="media-left">
                                                <span className="icon-wrap icon-wrap-xs">
                                                    <i className="fa fa-comment fa-3x" />
                                                </span>
                                            </div>
                                            <div className="media-body">
                                                <p className="h3 text-thin media-heading">{props.ptVote}</p>
                                                <small className="text-uppercase">Số lượng đánh giá tốt: {props.countCountVote.countVoteGood}</small>
                                            </div>
                                        </div>
                                        <div className="progress progress-xs progress-dark-base mar-no">
                                            <div role="progressbar" aria-valuenow="45.9" aria-valuemin={0} aria-valuemax={100} className="progress-bar progress-bar-light" style={{ width: props.ptVote }} />
                                        </div>
                                        <div className="pad-all text-right">
                                            <small><span className="text-semibold"><i className="fa fa-unlock-alt fa-fw" /> {props.countCountVote.countVoteAll}</span> Đánh giá</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-6">
                                    <div className="panel panel-purple panel-colorful">
                                        <div className="pad-all media">
                                            <div className="media-left">
                                                <span className="icon-wrap icon-wrap-xs">
                                                    <i className="fa fa-shopping-cart fa-fw fa-3x" />
                                                </span>
                                            </div>
                                            <div className="media-body">
                                                <p className="h3 text-thin media-heading">{props.ptOrderSuccess}</p>
                                                <small className="text-uppercase">Đơn hàng hoàn thành: {props.countOrderAndOrderSuccess.countOrderSuccess} </small>
                                            </div>
                                        </div>
                                        <div className="progress progress-xs progress-dark-base mar-no">
                                            <div role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} className="progress-bar progress-bar-light" style={{ width: props.ptOrderSuccess }} />
                                        </div>
                                        <div className="pad-all text-right">
                                            <small><span className="text-semibold"><i className="fa fa-shopping-cart fa-fw" /> {props.countOrderAndOrderSuccess.countOrder} </span> Đơn hàng!</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row custom-center">
                                {
                                    props.checkRole() ?
                                        <ReportTotal />
                                        : ""
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default AdminHome;
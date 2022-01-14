import { NavLink } from "react-router-dom";

function AdminMainNav() {
    const account = JSON.parse(localStorage.getItem("AccountToken"))
    const role = account.roleAccount

    const checkRole = () => {
        let check = false
        role.map(elm => {
            const { role } = elm
            if (role.name == "SUPPER_ADMIN") check = true
        })
        return check
    }
    return (
        <div>
            <nav id="mainnav-container" style={{ position: 'fixed' }}>
                <div id="mainnav">
                    <div id="mainnav-menu-wrap" className="">
                        <div className="nano">
                            <div className="nano-content">
                                <ul id="mainnav-menu" className="list-group">
                                    <li className="list-header">Trang chủ</li>
                                    <li className="active-link">
                                        <NavLink to="/admin">
                                            <i className="fa fa-dashboard" />
                                            <span className="menu-title">
                                                <strong>TRANG CHỦ</strong>
                                                <span className="label label-success pull-right">Top</span>
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li className="list-divider" />
                                    <li className="list-header">QUẢN LÝ</li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-users" />
                                            <span className="menu-title">Tài khoản</span>
                                            <i className="arrow" />
                                        </a>
                                        <ul className="collapse">
                                            <li><NavLink to="/admin/account">Tài khoản</NavLink></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-briefcase" />
                                            <span className="menu-title">Tạo đơn hàng</span>
                                            <i className="arrow" />
                                        </a>
                                        <ul className="collapse">
                                            <li><NavLink to="/admin/order/create">Tạo mới</NavLink></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-briefcase" />
                                            <span className="menu-title">Đơn hàng</span>
                                            <i className="arrow" />
                                        </a>
                                        <ul className="collapse">
                                            <li><NavLink to="/admin/order/new">Đơn chờ xác nhận <span className="text-danger">*</span></NavLink></li>
                                            <li><NavLink to="/admin/order">Tất cả đơn hàng</NavLink></li>
                                            <li><NavLink to="/admin/order/confirm">Đơn hàng đã xác nhận</NavLink></li>
                                            <li><NavLink to="/admin/order/transfer/inprogress">Đơn hàng đang giao</NavLink></li>
                                            <li><NavLink to="/admin/order/transfer">Đơn hàng đã giao</NavLink></li>
                                            <li><NavLink to="/admin/order/cancel">Đơn hàng đã hủy</NavLink></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-edit" />
                                            <span className="menu-title">Sản phẩm</span>
                                            <i className="arrow" />
                                        </a>
                                        <ul className="collapse">
                                            <li><NavLink to="/admin/product">Sản phẩm</NavLink></li>
                                            <li><NavLink to="/admin/product/author">Tác giả</NavLink></li>
                                            <li><NavLink to="/admin/product/category">Danh mục</NavLink></li>

                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-table" />
                                            <span className="menu-title">Giảm giá</span>
                                            <i className="arrow" />
                                        </a>
                                        <ul className="collapse">
                                            <li><NavLink to="/admin/promotion">Chương trình giảm giá</NavLink></li>
                                            <li><NavLink to="/admin/voucher">Mã giảm giá</NavLink></li>
                                        </ul>
                                    </li>

                                    <li className="list-divider" />
                                    <li className="list-header">THỐNG KÊ</li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-users" />
                                            <span className="menu-title">Đánh giá sản phẩm</span>
                                            <i className="arrow" />
                                        </a>
                                        <ul>
                                            <li>
                                                <NavLink to="/admin/statistic/product_rate">
                                                    <span className="menu-title">Đánh giá sản phẩm</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/admin/statistic/favorite_product">
                                                    <span className="menu-title">Sản phẩm được yêu thích</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    {
                                        checkRole() ?
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-users" />
                                                    <span className="menu-title">Thống kê</span>
                                                    <i className="arrow" />
                                                </a>
                                                <ul>
                                                    <li>
                                                        <NavLink to="/admin/report/product">
                                                            <span className="menu-title">Sản phẩm</span>
                                                        </NavLink>
                                                    </li>

                                                    <li>
                                                        <NavLink to="/admin/sales/product">
                                                            <span className="menu-title">Doanh thu</span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </li> : ""
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default AdminMainNav;
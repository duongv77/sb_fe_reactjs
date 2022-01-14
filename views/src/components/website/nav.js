import {
    NavLink
} from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../api/api"
import { toast } from "react-toastify";
function Nav() {
    const [listCate, setListCate] = useState([])
    const [quantity, setQuantity] = useState(0)
    const account = JSON.parse(localStorage.getItem("AccountToken"))
    const callApiListCate = async () => {
        try {
            const url = "/api/v1/category/show-nav"
            const response = await API.get(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setListCate(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiQuantityProductInCart = async () => {

        if (account == undefined || null) {
            return
        }
        try {
            const url = "/api/v2/user/cart-detail/product-quantity"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setQuantity(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        callApiListCate()
        callApiQuantityProductInCart()
    }, [])

    return (
        <div>
            <div className="header-top"  >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="header-left-menu">
                                <div className="welcome-info">
                                    Chào mừng
                                </div>
                                <div className="selected-language">
                                    <div className="current-lang">
                                        <span className="current-lang-label">Ngôn Ngữ : </span><strong>Tiếng Việt</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="header-right-menu">
                                <nav>
                                    <ul className="list-inline">

                                        {
                                            account != null ?
                                                <li><NavLink to="/profile">Tài khoản</NavLink></li>
                                                :
                                                <li><NavLink to="/login">Đăng nhập</NavLink></li>
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="header-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="logo">
                                <a href="index.html"><img src="https://firebasestorage.googleapis.com/v0/b/fistproject-d19c7.appspot.com/o/images%2Fbeebook_logo.ico?alt=media&token=1fb693ed-73e4-48ef-9689-1aba9c582497" alt="bstore logo" /></a>
                            </div>
                            <div className="header-right-callus">
                                <h3>Điện Thoại</h3>
                                <span>098.7654.3210</span>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <header className="main-menu-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 pull-right shopingcartarea">
                            <div className="shopping-cart-out pull-right">
                                <div className="shopping-cart">
                                    {
                                        account != null ?
                                            <NavLink className="shop-link" to="/cart">
                                                <i className="fa fa-shopping-cart cart-icon" />
                                                <b>Giỏ hàng</b>
                                                <span className="ajax-cart-quantity">{quantity}</span>
                                            </NavLink>
                                            : ""
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 no-padding-right menuarea">
                            <div className="mainmenu">
                                <nav>
                                    <ul className="list-inline mega-menu">
                                        <li><a href="/">Trang Chủ</a>
                                        </li>
                                        <li>
                                            <NavLink to="/product">Sản Phẩm</NavLink>
                                            {/* <div className="drodown-mega-menu">
                                                {
                                                    listCate.map((value, index) => {
                                                        if(index>5) return
                                                        const {categories} = value
                                                        return (
                                                            <div className="left-mega col-xs-4" key={index}>
                                                                <div className="mega-menu-list">
                                                                    <a className="mega-menu-title" href="shop-gird.html">{value.name}</a>
                                                                    <ul>
                                                                        {
                                                                            categories.map((elm, index2)=>{
                                                                                if(index2>3) return
                                                                                return(
                                                                                    <li><a href="shop-gird.html" key={index2}>{elm.name}</a></li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div> */}
                                        </li>

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>

    )
}

export default Nav;
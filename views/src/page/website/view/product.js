import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { numberWithCommas } from "../../../Service/common";
import { useHistory } from "react-router-dom"
import Rating from '@mui/material/Rating';
import { useState } from "react";
// import { Scrollbars } from 'react-custom-scrollbars';
import Tooltip from '@mui/material/Tooltip'

function Product(props) {

    const history = useHistory()
    return (
        <div>
            <section className="main-content-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="bstore-breadcrumb">
                                <a href="index.html">HOME</a>
                                <span><i className="fa fa-caret-right" /></span>
                                <span>Sản Phẩm</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <div className="product-left-sidebar">
                                <h2 className="left-title pro-g-page-title">Danh Mục</h2>
                                <div className="product-single-sidebar">
                                    <span className="sidebar-title">Thể Loại</span>
                                    <ul>
                                        {
                                            props.listCate.map((value, index) => {
                                                return (
                                                    <li key={index}>
                                                        <label className="cheker">
                                                            <input type="checkbox" name="categories"
                                                                onChange={(e) => {
                                                                    const { checked } = e.target
                                                                    const sql = `p.categorie.id = ${value.id}`
                                                                    const data = {
                                                                        id: "CT" + value.id,
                                                                        sql: sql
                                                                    }
                                                                    props.onChangeCheckBoxCate(checked, data)
                                                                }}
                                                            />
                                                            <span />
                                                        </label>
                                                        <a href="#">{value.name}<span> (12)</span></a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>

                                <div className="product-single-sidebar">
                                    <span className="sidebar-title">Giá</span>
                                    <ul>
                                        <li>
                                            <label className="cheker">
                                                <input type="checkbox" name="properties"
                                                    onChange={(e) => {
                                                        const { checked } = e.target
                                                        const value = {
                                                            id: "PR1",
                                                            sql: " (p.price < 100000) "
                                                        }
                                                        props.onChangeCheckboxPrice(checked, value)
                                                    }}
                                                />
                                                <span />
                                            </label>
                                            <a href="#">Dưới 100.000vnd<span></span></a>
                                        </li>
                                        <li>
                                            <label className="cheker">
                                                <input type="checkbox" name="properties"
                                                    onChange={(e) => {
                                                        const { checked } = e.target
                                                        const value = {
                                                            id: "PR1",
                                                            sql: " (p.price BETWEEN 100000 AND 300000) "
                                                        }
                                                        props.onChangeCheckboxPrice(checked, value)
                                                    }}
                                                />
                                                <span />
                                            </label>
                                            <a href="#">Từ 100.000vnd đến 300.000vnd <span></span></a>
                                        </li>
                                        <li>
                                            <label className="cheker">
                                                <input type="checkbox" name="properties"
                                                    onChange={(e) => {
                                                        const { checked } = e.target
                                                        const value = {
                                                            id: "PR1",
                                                            sql: " (p.price BETWEEN 300000 AND 500000) "
                                                        }
                                                        props.onChangeCheckboxPrice(checked, value)
                                                    }}
                                                />
                                                <span />
                                            </label>
                                            <a href="#">Từ 300.000vnd đến 500.000vnd<span></span></a>
                                        </li>
                                        <li>
                                            <label className="cheker">
                                                <input type="checkbox" name="properties"
                                                    onChange={(e) => {
                                                        const { checked } = e.target
                                                        const value = {
                                                            id: "PR1",
                                                            sql: " (p.price > 500000) "
                                                        }
                                                        props.onChangeCheckboxPrice(checked, value)
                                                    }}
                                                />
                                                <span />
                                            </label>
                                            <a href="#">Trên 500.000vnd<span></span></a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="product-single-sidebar">
                                    <span className="sidebar-title">Nhà Xuất Bản</span>
                                    <ul>
                                        {
                                            props.listNxb.map((value, index) => {
                                                return (
                                                    <li kry={index}>
                                                        <label className="cheker">
                                                            <input type="checkbox" name="compositions"
                                                                onChange={(e) => {
                                                                    const { checked } = e.target
                                                                    const data = {
                                                                        id: "NXB" + index,
                                                                        sql: ` p.publisher = '${value}' `
                                                                    }
                                                                    props.onChangeCheckboxNxb(checked, data)
                                                                }}
                                                            />
                                                            <span />
                                                        </label>
                                                        <a href="#">{value}<span></span></a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className="product-single-sidebar">
                                    <span className="sidebar-title">Ngôn Ngữ</span>
                                    <ul>
                                        {
                                            props.listLanguage.map((value, index) => {
                                                return (
                                                    <li key={index}>
                                                        <label className="cheker">
                                                            <input type="checkbox" name="styles"
                                                                onChange={(e) => {
                                                                    const { checked } = e.target
                                                                    const data = {
                                                                        id: "LG" + index,
                                                                        sql: ` p.language = '${value}' `
                                                                    }
                                                                    props.onChangeCheckboxLanguage(checked, data)
                                                                }}
                                                            />
                                                            <span />
                                                        </label>
                                                        <a href="#">{value}<span></span></a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className="product-single-sidebar">
                                    <span className="sidebar-title">Hình Thức</span>
                                    <ul>
                                        <li>
                                            <label className="cheker">
                                                <input type="checkbox" name="properties"
                                                    onChange={(e) => {
                                                        const { checked } = e.target
                                                        const data = {
                                                            id: "FR1",
                                                            sql: ` p.form = 'Bìa Cứng' `
                                                        }
                                                        props.onChangeCheckboxForm(checked, data)
                                                    }}
                                                />
                                                <span />
                                            </label>
                                            <a href="#">Bìa Cứng<span>()</span></a>
                                        </li>
                                        <li>
                                            <label className="cheker">
                                                <input type="checkbox" name="properties"
                                                    onChange={(e) => {
                                                        const { checked } = e.target
                                                        const data = {
                                                            id: "FR1",
                                                            sql: ` p.form = 'Bìa Mềm' `
                                                        }
                                                        props.onChangeCheckboxForm(checked, data)
                                                    }}
                                                />
                                                <span />
                                            </label>
                                            <a href="#">Bìa Mềm <span>(1)</span></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="product-left-sidebar">
                                <h2 className="left-title">Tags </h2>
                                <div className="category-tag">
                                    <a href="#">Bee Book</a>
                                    <a href="#">Thế Giới Sách</a>
                                    <a href="#">Sách Giáo Khoa</a>
                                    <a href="#">Sách Thiếu Nhi</a>
                                    <a href="#">Truyện Tranh</a>
                                    <a href="#">New</a>
                                    <a href="#">Sách Ngoại Ngữ</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                            <div className="right-all-product">
                                <div className="product-category-title">
                                    <h1 style={{ marginTop: "-40px" }}>
                                        <span className="cat-name">Sản Phẩm</span>
                                        <span className="count-product">Có {props.listProduct.length} sản phẩm</span>
                                    </h1>
                                </div>
                                <div className="product-shooting-area ">
                                    <div className="product-shooting-bar">
                                        <div className="shoort-by">
                                            <label htmlFor="productShort">Sort by</label>
                                            <div className="short-select-option">
                                                <select name="sortby" id="productShort" onChange={props.onChangeSort}>
                                                    <option value="createDate">Ngày tạo</option>
                                                    <option value="name">Sắp xếp theo tên </option>
                                                    <option value="quantity">Số lượng</option>
                                                    <option value="price">Giá tiền</option>
                                                    <option value="title">Đầu sách</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="show-page">
                                            <label htmlFor="perPage">Số lượng</label>
                                            <div className="s-page-select-option">
                                                <select name="show" id="perPage"
                                                    onChange={(e) => {
                                                        const { value } = e.target
                                                        console.log(value)
                                                        props.setSize(+value)
                                                    }}
                                                >
                                                    <option value={12}>12</option>
                                                    <option value={20}>20</option>
                                                    <option value={28}>28</option>
                                                    <option value={40}>40</option>
                                                </select>
                                            </div>
                                            <span>per page</span>
                                        </div>
                                        <div className="searchbox  " >
                                            <div className="input-group custom-search-form">
                                                <input type="text" className="form-control" placeholder="Tìm kiếm . . ." onChange={props.onChangeSearch} />
                                                <span className="input-group-btn">
                                                    <button className="text-muted" type="button"><i className="fa fa-search" /></button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="all-gategory-product">
                                <div className="row">
                                    {
                                        props.listProduct.map((value, index) => {
                                            if ((props.page - 1) * props.size > index) return null
                                            if (props.page * props.size < index + 1) return null
                                            const { product, sale } = value
                                            return (
                                                <ul className="gategory-product" key={index}>
                                                    <li className="gategory-product-list col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                                        <div className="single-product-item">
                                                            <div className="product-image">
                                                                <a href="#" onClick={e => {
                                                                    e.preventDefault()
                                                                    history.replace(`/product/${product.id}`)
                                                                }}><img src={product.image} alt={product.image} height={200} /></a>
                                                                {sale === null ? "" : <a href="single-product.html" className="new-mark-box">-{sale}%</a>}
                                                                <div className="overlay-content">
                                                                    <ul>
                                                                        <li>
                                                                            <Tooltip title="Xem chi tiết" placement="right-start" arrow>
                                                                                <NavLink to={`/product/${product.id}`}><i className="fa fa-search" /></NavLink>
                                                                            </Tooltip>
                                                                        </li>
                                                                        <li>
                                                                            <Tooltip title="Thêm vào giỏ hàng" placement="right-start" arrow>
                                                                                <a href="#" onClick={(e) => { props.onClickAddCart(e, product.id) }}><i className="fa fa-shopping-cart" /></a>
                                                                            </Tooltip>
                                                                        </li>
                                                                        <li>
                                                                            <Tooltip title="Cập nhập sản phẩm" placement="right-start" arrow>
                                                                                <a href="#" onClick={(e) => { e.preventDefault() }}><i className="fa fa-retweet" /></a>
                                                                            </Tooltip>
                                                                        </li>
                                                                        <li>
                                                                            <Tooltip title="Thêm vào danh sách yêu thích" placement="right-start" arrow>
                                                                                <a href="#" onClick={(e) => { props.onClickFavorite(e, product.id) }}><i className="fa fa-heart-o" /></a>
                                                                            </Tooltip>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="product-info">
                                                                <div className="customar-comments-box">
                                                                    <div className="rating-box">
                                                                        <Rating
                                                                            size="small"
                                                                            name="simple-controlled"
                                                                            value={product.avgRating} readOnly
                                                                        />
                                                                    </div>
                                                                    <div className="review-box">
                                                                        <span>Lượt đánh giá ({product.quantityRate})</span>
                                                                    </div>
                                                                </div>
                                                                <NavLink to={`/product/${product.id}`}>{product.title === null ? product.name : product.title.name + " " + product.name}</NavLink>
                                                                <div className="price-box">
                                                                    {
                                                                        sale === null ? <span className="price">{numberWithCommas(product.price)} VNĐ</span> :
                                                                            <span className="price">{numberWithCommas((product.price / 100 * (100 - sale)).toFixed(0))} VNĐ</span>
                                                                    }

                                                                    {sale !== null ? <span className="old-price">{numberWithCommas(product.price)} VNĐ</span> : ""}

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="product-shooting-result product-shooting-result-border">
                                <div className="showing-item">
                                    <span> {(props.page) * props.size > props.listProduct.length ? props.listProduct.length : (props.page) * props.size} / {props.listProduct.length}</span>
                                </div>
                                <div className="showing-next-prev custom-center">
                                    <ul className="pagination-bar">
                                        <li>
                                            <a href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    if (props.page == 1) return
                                                    props.setPage(props.page - 1)
                                                }}
                                            ><i className="fa fa-chevron-left" />Previous</a>
                                        </li>
                                        <li>
                                            <span><a className="pagi-num" href="#">{props.page}</a></span>
                                        </li>
                                        <li>
                                            <a href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    if ((props.page) * props.size > props.listProduct.length) return
                                                    props.setPage(props.page + 1)
                                                }}
                                            >Next<i className="fa fa-chevron-right" /></a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="text-right">
                                    <button type="button" onClick={props.showAll} className="btn showall-button">Show all</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Product;
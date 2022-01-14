import { useState, useEffect } from "react";
import Rating from '@mui/material/Rating';
import { numberWithCommas } from "../../../Service/common";
import { NavLink } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip'

function Home(props) {
    const [pageNew, setPageNew] = useState(0)
    const [pageSale, setPageSale] = useState(0)
    const [pageTrending, setPageTrending] = useState(0)
    const [pagebanChay, setPageBanChay] = useState(0)
    const [page1, setPage1] = useState(0)
    const [page2, setPage2] = useState(0)
    const [page3, setPage3] = useState(0)
    const [page4, setPage4] = useState(0)
    return (
        <div>
            <section className="main-content-section">
                <div className="container">
                    <div className="row">
                        <div className="main-slider-area">
                            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                <div className="slider-area">
                                    <div id="wrapper">
                                        <div className="slider-wrapper">
                                            <div id="mainSlider" className="nivoSlider">
                                                <img src="https://firebasestorage.googleapis.com/v0/b/fistproject-d19c7.appspot.com/o/images%2F920x420_1.3.png?alt=media&token=a632a81b-5161-4d61-a2bc-b86ac3eedac3" alt="main slider" title="#htmlcaption" />
                                                <img src="https://firebasestorage.googleapis.com/v0/b/fistproject-d19c7.appspot.com/o/images%2Fmanga_comic_920_x_420.png?alt=media&token=daee1eaa-c4fb-4ac0-9077-c06d489c1d2b" alt="main slider" title="#htmlcaption2" />
                                                <img src="https://firebasestorage.googleapis.com/v0/b/fistproject-d19c7.appspot.com/o/images%2FNCC_Thaiha920x420.jpg?alt=media&token=e47aba10-be1d-42b1-821e-ebbab5dec8fe" alt="main slider" title="#htmlcaption3" />
                                                <img src="https://firebasestorage.googleapis.com/v0/b/fistproject-d19c7.appspot.com/o/images%2FTGDQ_920_x_420.png?alt=media&token=9baa3d9b-9063-470c-bba6-28473cee6ed8" alt="main slider" title="#htmlcaption4" />
                                            </div>
                                            <div id="htmlcaption" className="nivo-html-caption slider-caption">
                                                <div className="slider-progress" />
                                                <div className="slider-cap-text slider-text1">
                                                </div>
                                            </div>
                                            <div id="htmlcaption2" className="nivo-html-caption slider-caption">
                                                <div className="slider-progress" />
                                                <div className="slider-cap-text slider-text2">
                                                </div>
                                            </div>
                                            <div id="htmlcaption3" className="nivo-html-caption slider-caption">
                                                <div className="slider-progress" />
                                                <div className="slider-cap-text slider-text3">
                                                </div>
                                            </div>
                                            <div id="htmlcaption4" className="nivo-html-caption slider-caption">
                                                <div className="slider-progress" />
                                                <div className="slider-cap-text slider-text4">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                <div className="slider-right zoom-img m-top">
                                    <a href="#"><img className="img-responsive" src="https://firebasestorage.googleapis.com/v0/b/fistproject-d19c7.appspot.com/o/images%2Fposter5.jpg?alt=media&token=91e4ec2b-e252-4453-a49a-58dce3ff47da" alt="sidebar left" style={{ height: 390 }} /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row tow-column-product">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="new-product-area">
                                <div>
                                    <div className="left-title-area col-lg-6">
                                        <h2 className="left-title">Sách Mới</h2>
                                    </div>
                                    <div className="col-lg-6 text-right custom-hover-mouse">
                                        <i class="fa fa-chevron-left" style={{ marginRight: "4px" }} onClick={() => {
                                            if (pageNew > 0) setPageNew(pageNew - 1)
                                        }} aria-hidden="true"></i>
                                        <i class="fa fa-chevron-right" aria-hidden="true" onClick={() => {
                                            if (pageNew < props.productNew.length - 2) setPageNew(pageNew + 1)
                                        }}></i>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <div className="row">
                                            {
                                                props.productNew.map((value, index) => {
                                                    if (index > pageNew + 1) return null
                                                    if (index < pageNew) return null
                                                    const { product, sale } = value
                                                    return (
                                                        <div className="col-lg-6">
                                                            <div className="new-pro-carousel">
                                                                <div className="item" >
                                                                    <div className="new-product">
                                                                        <div className="single-product-item">
                                                                            <div className="product-image">
                                                                                <NavLink to={`/product/${product.id}`} ><img src={product.image} alt="product-image" /></NavLink>
                                                                                <a href="#" className="new-mark-box">Mới</a>
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
                                                                                <NavLink to={`/product/${product.id}`} >{product.title == null ? product.name : product.title.name + " " + product.name}</NavLink>
                                                                                <div className="price-box">
                                                                                    {
                                                                                        sale === null ? <span className="price">{numberWithCommas(product.price)} VNĐ</span> :
                                                                                            <span className="price">{numberWithCommas((product.price / 100 * (100 - sale)).toFixed(0))} VNĐ</span>
                                                                                    }

                                                                                    {sale !== null ? <span className="old-price">{numberWithCommas(product.price)} VNĐ</span> : ""}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="Sale-Products">
                                <div>
                                    <div className="left-title-area col-lg-6">
                                        <h2 className="left-title">Sách Giảm Giá</h2>
                                    </div>
                                    <div className="col-lg-6 text-right custom-hover-mouse">
                                        <i class="fa fa-chevron-left" style={{ marginRight: "4px" }} onClick={() => {
                                            if (pageSale > 0) setPageSale(pageSale - 1)
                                        }} aria-hidden="true"></i>
                                        <i class="fa fa-chevron-right" aria-hidden="true" onClick={() => {
                                            if (pageSale < props.productSale.length - 2) setPageSale(pageSale + 1)
                                        }}></i>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <div className="row">
                                            {
                                                props.productSale.map((value, index) => {
                                                    if (index > pageSale + 1) return null
                                                    if (index < pageSale) return null
                                                    const { product, sale } = value
                                                    return (
                                                        <div className="col-lg-6">
                                                            <div className="new-pro-carousel">
                                                                <div className="item" >
                                                                    <div className="new-product">
                                                                        <div className="single-product-item">
                                                                            <div className="product-image">
                                                                                <NavLink to={`/product/${product.id}`} ><img src={product.image} alt="product-image" /></NavLink>
                                                                                <a href="#" className="new-mark-box">Giảm giá - {sale}%</a>
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
                                                                                <NavLink to={`/product/${product.id}`} >{product.title == null ? product.name : product.title.name + " " + product.name}</NavLink>
                                                                                <div className="price-box">
                                                                                    {
                                                                                        sale === null ? <span className="price">{numberWithCommas(product.price)} VNĐ</span> :
                                                                                            <span className="price">{numberWithCommas((product.price / 100 * (100 - sale)).toFixed(0))} VNĐ</span>
                                                                                    }

                                                                                    {sale !== null ? <span className="old-price">{numberWithCommas(product.price)} VNĐ</span> : ""}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="add-two-by-one-column">
                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                                <div className="tow-column-add zoom-img">
                                    <a href="#"><img src="https://firebasestorage.googleapis.com/v0/b/fistproject-d19c7.appspot.com/o/images%2F1588654894-784901682-banner-h-i-sach.jpg?alt=media&token=02d66810-7209-4c69-bcbb-7643016cc63e" alt="shope-add" /></a>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className="one-column-add zoom-img">
                                    <a href="#"><img src="https://firebasestorage.googleapis.com/v0/b/fistproject-d19c7.appspot.com/o/images%2Fpngtree-books-quiet-poster-background-material-image_128050.jpg?alt=media&token=fe1e707f-340e-49b0-ad4b-40f3d1bb74fd" alt="shope-add" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="featured-products-area">
                            <div className="center-title-area">
                                <h2 className="center-title">SẢN PHẨM NỔI BẬT</h2>
                                <div className="custom-hover-mouse text-right" style={{ marginTop: "-30px" }}>
                                    <i class="fa fa-chevron-left" style={{ marginRight: "4px" }} onClick={() => {
                                        if (pageTrending > 0) setPageTrending(pageTrending - 1)
                                    }} aria-hidden="true"></i>
                                    <i class="fa fa-chevron-right" aria-hidden="true" onClick={() => {
                                        if (pageTrending < props.productTrending.length - 5) setPageTrending(pageTrending + 1)
                                    }}></i>
                                </div>
                            </div>
                            <div className="col-xs-12" style={{ marginTop: "100px" }}>
                                <div className="row">
                                    <div className="custom-col5" style={{ marginTop: "-80px" }}>
                                        {
                                            props.productTrending.map((value, index) => {
                                                if (index > pageTrending + 4) return null
                                                if (index < pageTrending) return null
                                                const { product, sale } = value
                                                return (
                                                    <div className="item" >
                                                        <div className="single-product-item">
                                                            <div className="product-image">
                                                                <NavLink to={`/product/${product.id}`} ><img src={product.image} alt="product-image" /></NavLink>
                                                                <a href="#" className="new-mark-box">Nổi bật</a>
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
                                                                <NavLink to={`/product/${product.id}`} >{product.title == null ? product.name : product.title.name + " " + product.name}</NavLink>
                                                                <div className="price-box">
                                                                    {
                                                                        sale === null ? <span className="price">{numberWithCommas(product.price)} VNĐ</span> :
                                                                            <span className="price">{numberWithCommas((product.price / 100 * (100 - sale)).toFixed(0))} VNĐ</span>
                                                                    }

                                                                    {sale !== null ? <span className="old-price">{numberWithCommas(product.price)} VNĐ</span> : ""}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="tab-bg-product-area">
                                <div className="tab-content bg-tab-content">
                                    <div role="tabpanel" className="tab-pane active" id="p1">
                                        <div className="custom-hover-mouse text-right" style={{ marginTop: "-30px" , color:"white"}}>
                                            <i class="fa fa-chevron-left" style={{ marginRight: "4px" }} onClick={() => {
                                                if (page1 > 0) setPage1(page1 - 1)
                                            }} aria-hidden="true"></i>
                                            <i class="fa fa-chevron-right" aria-hidden="true" onClick={() => {
                                                if (page1 < props.listProductCate1.length - 4) setPage1(page1 + 1)
                                            }}></i>
                                        </div>
                                        <div className="row">
                                            {
                                                props.listProductCate1.map((value, index) => {
                                                    if (index > page1 + 3) return null
                                                    if (index < page1) return null
                                                    const { product, sale } = value
                                                    return (
                                                        <div className="col-lg-3 " key={value.id}>
                                                            <div className="item">
                                                                <div className="single-product-item">
                                                                    <div className="product-image">
                                                                        <NavLink to={`/product/${product.id}`} ><img src={product.image} alt="product-image" /></NavLink>
                                                                        {sale!=null?<a href="#" className="new-mark-box">Giảm giá - {sale}%</a>:""}
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
                                                                        <NavLink to={`/product/${product.id}`} style={{ color: "white" }}>{product.title == null ? product.name : product.title.name + " " + product.name}</NavLink>
                                                                        <div className="price-box">
                                                                            {
                                                                                sale === null ? <span className="price">{numberWithCommas(product.price)} VNĐ</span> :
                                                                                    <span className="price">{numberWithCommas((product.price / 100 * (100 - sale)).toFixed(0))} VNĐ</span>
                                                                            }

                                                                            {sale !== null ? <span className="old-price" style={{ color: "white" }}>{numberWithCommas(product.price)} VNĐ</span> : ""}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div role="tabpanel" className="tab-pane" id="p2">
                                        <div className="custom-hover-mouse text-right" style={{ marginTop: "-30px" , color:"white"}}>
                                            <i class="fa fa-chevron-left" style={{ marginRight: "4px" }} onClick={() => {
                                                if (page2 > 0) setPage2(page2 - 1)
                                            }} aria-hidden="true"></i>
                                            <i class="fa fa-chevron-right" aria-hidden="true" onClick={() => {
                                                if (page2 < props.listProductCate2.length - 4) setPage2(page2 + 1)
                                            }}></i>
                                        </div>
                                        <div className="row">
                                            {
                                                props.listProductCate2.map((value, index) => {
                                                    if (index > page2 + 3) return null
                                                    if (index < page2) return null
                                                    const { product, sale } = value
                                                    return (
                                                        <div className="col-lg-3 " key={value.id}>
                                                            <div className="item">
                                                                <div className="single-product-item">
                                                                    <div className="product-image">
                                                                        <NavLink to={`/product/${product.id}`} ><img src={product.image} alt="product-image" /></NavLink>
                                                                        {sale!=null?<a href="#" className="new-mark-box">Giảm giá - {sale}%</a>:""}
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
                                                                        <NavLink to={`/product/${product.id}`} style={{ color: "white" }}>{product.title == null ? product.name : product.title.name + " " + product.name}</NavLink>
                                                                        <div className="price-box">
                                                                            {
                                                                                sale === null ? <span className="price">{numberWithCommas(product.price)} VNĐ</span> :
                                                                                    <span className="price">{numberWithCommas((product.price / 100 * (100 - sale)).toFixed(0))} VNĐ</span>
                                                                            }

                                                                            {sale !== null ? <span className="old-price" style={{ color: "white" }}>{numberWithCommas(product.price)} VNĐ</span> : ""}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div role="tabpanel" className="tab-pane" id="p3">
                                        <div className="custom-hover-mouse text-right" style={{ marginTop: "-30px" , color:"white"}}>
                                            <i class="fa fa-chevron-left" style={{ marginRight: "4px" }} onClick={() => {
                                                if (page3 > 0) setPage3(page3 - 1)
                                            }} aria-hidden="true"></i>
                                            <i class="fa fa-chevron-right" aria-hidden="true" onClick={() => {
                                                if (page3 < props.listProductCate3.length - 4) setPage3(page3 + 1)
                                            }}></i>
                                        </div>
                                        <div className="row">
                                            {
                                                props.listProductCate3.map((value, index) => {
                                                    if (index > page3 + 3) return null
                                                    if (index < page3) return null
                                                    const { product, sale } = value
                                                    return (
                                                        <div className="col-lg-3 " key={value.id}>
                                                            <div className="item">
                                                                <div className="single-product-item">
                                                                    <div className="product-image">
                                                                        <NavLink to={`/product/${product.id}`} ><img src={product.image} alt="product-image" /></NavLink>
                                                                        {sale!=null?<a href="#" className="new-mark-box">Giảm giá - {sale}%</a>:""}
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
                                                                        <NavLink to={`/product/${product.id}`} style={{ color: "white" }}>{product.title == null ? product.name : product.title.name + " " + product.name}</NavLink>
                                                                        <div className="price-box">
                                                                            {
                                                                                sale === null ? <span className="price">{numberWithCommas(product.price)} VNĐ</span> :
                                                                                    <span className="price">{numberWithCommas((product.price / 100 * (100 - sale)).toFixed(0))} VNĐ</span>
                                                                            }

                                                                            {sale !== null ? <span className="old-price" style={{ color: "white" }}>{numberWithCommas(product.price)} VNĐ</span> : ""}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div role="tabpanel" className="tab-pane" id="p4">
                                        <div className="custom-hover-mouse text-right" style={{ marginTop: "-30px" , color:"white"}}>
                                            <i class="fa fa-chevron-left" style={{ marginRight: "4px" }} onClick={() => {
                                                if (page4 > 0) setPage4(page4 - 1)
                                            }} aria-hidden="true"></i>
                                            <i class="fa fa-chevron-right" aria-hidden="true" onClick={() => {
                                                if (page4 < props.listProductCate4.length - 4) setPage4(page4 + 1)
                                            }}></i>
                                        </div>
                                        <div className="row">
                                            {
                                                props.listProductCate4.map((value, index) => {
                                                    if (index > page4 + 3) return null
                                                    if (index < page4) return null
                                                    const { product, sale } = value
                                                    return (
                                                        <div className="col-lg-3 " key={value.id}>
                                                            <div className="item">
                                                                <div className="single-product-item">
                                                                    <div className="product-image">
                                                                        <NavLink to={`/product/${product.id}`} ><img src={product.image} alt="product-image" /></NavLink>
                                                                        {sale!=null?<a href="#" className="new-mark-box">Giảm giá - {sale}%</a>:""}
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
                                                                        <NavLink to={`/product/${product.id}`} style={{ color: "white" }}>{product.title == null ? product.name : product.title.name + " " + product.name}</NavLink>
                                                                        <div className="price-box">
                                                                            {
                                                                                sale === null ? <span className="price">{numberWithCommas(product.price)} VNĐ</span> :
                                                                                    <span className="price">{numberWithCommas((product.price / 100 * (100 - sale)).toFixed(0))} VNĐ</span>
                                                                            }

                                                                            {sale !== null ? <span className="old-price" style={{ color: "white" }}>{numberWithCommas(product.price)} VNĐ</span> : ""}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-carousel-menu">
                                    <ul className="nav nav-tabs product-bg-nav">
                                        <li className="active"><a href="#p1" data-toggle="tab">Văn học</a></li>
                                        <li><a href="#p2" data-toggle="tab">Kinh tế</a></li>
                                        <li><a href="#p3" data-toggle="tab">Tâm lý - Kĩ năng sống</a></li>
                                        <li><a href="#p4" data-toggle="tab">Nuôi dạy con</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="bestseller-products-area">
                            <div className="center-title-area">
                                <h2 className="center-title">SẢN PHẨM BÁN CHẠY</h2>
                                <div className="custom-hover-mouse text-right" style={{ marginTop: "-30px" }}>
                                    <i class="fa fa-chevron-left" style={{ marginRight: "4px" }} onClick={() => {
                                        if (pagebanChay > 0) setPageBanChay(pagebanChay - 1)
                                    }} aria-hidden="true"></i>
                                    <i class="fa fa-chevron-right" aria-hidden="true" onClick={() => {
                                        if (pagebanChay < props.productBanChay.length - 5) setPageBanChay(pagebanChay + 1)
                                    }}></i>
                                </div>
                            </div>
                            <div className="col-xs-12" style={{ marginBottom: '100px' }}>
                                <div className="row">
                                    <div className="custom-col5 mar-top">
                                        {
                                            props.productBanChay.map((value, index) => {
                                                if (index > pagebanChay + 4) return null
                                                if (index < pagebanChay) return null
                                                const { product, sale } = value
                                                return (
                                                    <div className="item" >
                                                        <div className="single-product-item">
                                                            <div className="product-image">
                                                                <NavLink to={`/product/${product.id}`} ><img src={product.image} alt="product-image" /></NavLink>
                                                                {
                                                                    sale != null ?
                                                                        <a href="#" className="new-mark-box">-{sale}%</a> : null

                                                                }
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
                                                                <NavLink to={`/product/${product.id}`} >{product.title == null ? product.name : product.title.name + " " + product.name}</NavLink>
                                                                <div className="price-box">
                                                                    {
                                                                        sale === null ? <span className="price">{numberWithCommas(product.price)} VNĐ</span> :
                                                                            <span className="price">{numberWithCommas((product.price / 100 * (100 - sale)).toFixed(0))} VNĐ</span>
                                                                    }

                                                                    {sale !== null ? <span className="old-price">{numberWithCommas(product.price)} VNĐ</span> : ""}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="image-add-area">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="onehalf-add-shope zoom-img">
                                    <a href="#"><img src="https://firebasestorage.googleapis.com/v0/b/fistproject-d19c7.appspot.com/o/images%2Funnamed.jpg?alt=media&token=30699338-cd26-437a-a93c-10a9fd99f8a2" alt="shope-add" /></a>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="onehalf-add-shope zoom-img">
                                    <a href="#"><img src="https://firebasestorage.googleapis.com/v0/b/fistproject-d19c7.appspot.com/o/images%2Fcropped-banner.jpg?alt=media&token=a81cbccf-b0d2-4aa4-b34e-894a5ff205c2" alt="shope-add" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;
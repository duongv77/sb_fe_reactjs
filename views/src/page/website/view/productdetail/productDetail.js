import { NavLink } from "react-router-dom";
import { SwapSpinner } from "react-spinners-kit";
import { numberWithCommas } from "../../../../Service/common";
import ProductRelated from "./productRelated";
import ProductRelateCategory from "./productRelatedCategory"
import ProductReview from "./productReview";
import Rating from '@mui/material/Rating';
import ProductComment from "./productComment";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function ProductDetail(props) {
    const { product, sale } = props.product
    window.scroll({
        top: 100,
        left: 100,
        behavior: 'smooth'
    });

    try {
        return (
            <div>
                <section className="main-content-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="bstore-breadcrumb">
                                    <a href="index.html">Trang chủ<span><i className="fa fa-caret-right" /> </span> </a>
                                    <span> <i className="fa fa-caret-right"> </i> </span>
                                    <NavLink to="/product"> Sản phẩm </NavLink>
                                    <span> {product.categorie.name} </span>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                {
                                    props.loadingElm === true ?
                                        <Box sx={{ display: 'flex' }} className="custom-center">
                                            <CircularProgress />
                                        </Box> :
                                        <div className="row">
                                            <div className="col-lg-5 col-md-5 col-sm-4 col-xs-12">
                                                <div className="single-product-view">
                                                    <div className="tab-content">
                                                        <div className="tab-pane active">
                                                            <div className="single-product-image">
                                                                <img src={product === undefined ? "" : product.image} alt="single-product-image" />
                                                                <a className="fancybox" href="img/product/sale/1.jpg" data-fancybox-group="gallery"></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-7 col-md-7 col-sm-8 col-xs-12">
                                                <div className="single-product-descirption">
                                                    <h2>{product.title === null ? product.name : product.title.name + " " + product.name}</h2>
                                                    <div className="single-product-review-box">
                                                        <div className="rating-box">
                                                            <Rating
                                                                name="simple-controlled"
                                                                value={product.avgRating} readOnly
                                                            />
                                                        </div>
                                                        <div className="read-reviews">
                                                            <a href="#">Lượt đánh giá ({product.quantityRate})</a>
                                                        </div>
                                                        <div className="write-review">
                                                        </div>
                                                    </div>
                                                    <div className="single-product-condition">
                                                        <p>Tình trạng: <span>{product.available === 1 ? "Sẵn hàng" : "Ngưng bán"}</span></p>
                                                        <p>Khuyễn mãi: {sale === null ? "--" : <span style={{ color: 'red' }}>-{sale}%</span>}</p>
                                                    </div>
                                                    <div className="single-product-price">
                                                        {sale === null ? <h2>{numberWithCommas(product.price)}₫ </h2> : <h2>{numberWithCommas(product.price / 100 * (100 - sale))}₫</h2>}
                                                        {sale !== null ? <span className="old-price">{numberWithCommas(product.price)}₫</span> : ""}
                                                    </div>
                                                    <div className="single-product-desc">
                                                        <p>{product.title === null ? "" : product.title.name + ": " + product.title.note}</p>
                                                        <div className="product-in-stock">
                                                            <p>Số lượng: {product.quantity}{product.quantity > 0 ? <span>Còn hàng</span> : <span style={{ backgroundColor: "red" }}>Hết hàng</span>}</p>
                                                        </div>
                                                    </div>
                                                    <div className="single-product-quantity">
                                                        <p className="small-title">Quantity</p>
                                                        <div className="cart-quantity">
                                                            <div className="cart-plus-minus-button single-qty-btn">
                                                                <input className="cart-plus-minus sing-pro-qty" type="number" value={props.quantityOrder} onChange={props.onChangeQuantity} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="single-product-add-cart">
                                                        <button className="add-cart-text mar-rgt" onClick={() => { props.onClickFavorite() }} title="Thêm vào danh sách yêu thích" style={{ backgroundColor: "#FF3333" }}>Yêu thích</button>
                                                        <button className="add-cart-text" title="Add to cart" onClick={props.callApiAddToCart}>Thêm vào giỏ hàng</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                }
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="product-more-info-tab">
                                            <ul className="nav nav-tabs more-info-tab">
                                                <li className="active"><a href="#moreinfo" data-toggle="tab">Mô tả sản phẩm</a></li>
                                                <li><a href="#datasheet" data-toggle="tab">Thông tin</a></li>
                                                <li><a href="#review" data-toggle="tab">Đánh giá</a></li>
                                                <li><a href="#comment" data-toggle="tab">Bình luận</a></li>
                                            </ul>
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="moreinfo">
                                                    <div className="tab-description">
                                                        <span>{props.description}</span>
                                                    </div>
                                                </div>
                                                <div className="tab-pane" id="datasheet">
                                                    <div className="deta-sheet">
                                                        <table className="table-data-sheet">
                                                            <tbody>
                                                                <tr className="odd">
                                                                    <td>Mã sản phẩm</td>
                                                                    <td>{product.id}</td>
                                                                </tr>
                                                                <tr className="even">
                                                                    <td className="td-bg">Loại sách:</td>
                                                                    <td className="td-bg">{product.categorie.name}</td>
                                                                </tr>
                                                                <tr className="even">
                                                                    <td className="td-bg">Tác giả:</td>
                                                                    <td className="td-bg">{product.author.name}</td>
                                                                </tr>
                                                                <tr className="even">
                                                                    <td className="td-bg">Đầu sách: </td>
                                                                    <td className="td-bg">{product.title == null ? "Trống" : product.title.name}</td>
                                                                </tr>
                                                                <tr className="even">
                                                                    <td className="td-bg">Ngôn ngữ: </td>
                                                                    <td className="td-bg">{product.language}</td>
                                                                </tr>
                                                                <tr className="even">
                                                                    <td className="td-bg">Nhà cung cấp</td>
                                                                    <td className="td-bg">{product.supplier}</td>
                                                                </tr>
                                                                <tr className="even">
                                                                    <td className="td-bg">Năm sản xuất: </td>
                                                                    <td className="td-bg">{product.publishyear}</td>
                                                                </tr>
                                                                <tr className="even">
                                                                    <td className="td-bg">Nhà sản xuất: </td>
                                                                    <td className="td-bg">{product.publisher}</td>
                                                                </tr>
                                                                <tr className="even">
                                                                    <td className="td-bg">Số trang: </td>
                                                                    <td className="td-bg">{product.numberpages}</td>
                                                                </tr>
                                                                <tr className="odd">
                                                                    <td>Bìa sách:</td>
                                                                    <td>{product.form}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="tab-pane" id="review">
                                                    <ProductReview {...props} />
                                                </div>
                                                <div className="tab-pane" id="comment">
                                                    <div className="deta-sheet">
                                                        <ProductComment {...props} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="left-title-area">
                                            <h2 className="left-title">Sản phâm liên quan</h2>
                                        </div>
                                    </div>
                                    <ProductRelated {...props} />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                <ProductRelateCategory {...props} />
                                <div className="single-product-right-sidebar clearfix">
                                    <h2 className="left-title">Tags </h2>
                                    <div className="category-tag">
                                        <a href="#">fashion</a>
                                        <a href="#">handbags</a>
                                        <a href="#">women</a>
                                        <a href="#">men</a>
                                        <a href="#">kids</a>
                                        <a href="#">New</a>
                                        <a href="#">Accessories</a>
                                        <a href="#">clothing</a>
                                        <a href="#">New</a>
                                    </div>
                                </div>
                                <div className="single-product-right-sidebar">
                                    <div className="slider-right zoom-img">
                                        <a href="#"><img className="img-responsive" src="img/product/cms11.jpg" alt="sidebar left" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    } catch (error) {
        return (
            <Box sx={{ display: 'flex' }} className="custom-center">
                <CircularProgress />
            </Box>
        )
    }
}
export default ProductDetail;
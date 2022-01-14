import { NavLink } from "react-router-dom";
import { numberWithCommas } from "../../../../Service/common";
import { useHistory } from "react-router-dom"
import Rating from '@mui/material/Rating';

function ProductFavorite(props) {
    const history = useHistory()
    return (
        <div className="all-gategory-product" >
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mar-top">
                <h2 className="page-title about-page-title">Danh sách sản phẩm yêu thích: </h2>
            </div>
            <div className="row">
                {props.listProductFavorite.map((value, index) => {
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
                                                <li><NavLink to={`/product/${product.id}`} title="Xem chi tiết"><i className="fa fa-search" /></NavLink></li>
                                                <li><a href="/" title="Thêm vào giỏ hàng"><i className="fa fa-shopping-cart" /></a></li>
                                                <li><a href="#" title="Quick view"><i className="fa fa-retweet" /></a></li>
                                                <li><a href="#" title="Yêu thích"><i className="fa fa-heart-o" /></a></li>
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
                })}
            </div>
        </div>
    )
}
export default ProductFavorite;
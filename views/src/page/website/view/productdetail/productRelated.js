import { numberWithCommas } from '../../../../Service/common';
import API from "../../../../api/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LazyLoad from 'react-lazyload'
import { NavLink } from 'react-router-dom';
import Rating from '@mui/material/Rating';

function ProductRelated(props) {
    const [productRelated, setProductRelated] = useState([])
    const [page, setPage] = useState(0)

    const callApiRelated = async () => {
        try {
            const url = `/api/v1/product-related/page=${page}/${props.id}`
            const response = await API.get(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                if(data== null) return
                if (data.length == 0) {
                    setPage(page - 1)
                    return
                }
                setProductRelated(data)
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi!")
            console.log(error)
        }
    }

    const onClickNext = () => {
        let pageNew = page + 1
        setPage(pageNew)
    }

    const onClickPre = () => {
        let pageNew = page == 0 ? 0 : page - 1
        setPage(pageNew)
    }

    useEffect(() => {
        callApiRelated()
    }, [page, props.id])

    return (
        <div>
            <div className="related-product-area featured-products-area">
                <div className="col-sm-12">
                    <div className=" row">
                        <div style={{ marginTop: "-10px" }}>
                            <button className="btn btn-default" onClick={() => { onClickPre() }}>
                                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                            </button>
                            <button className="btn btn-default" onClick={() => { onClickNext() }}>
                                <i class="fa fa-chevron-right" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div className="custom-col4">
                            {
                                productRelated.map(value => {
                                    const { product, sale } = value
                                    return (
                                        <div className="item ">
                                            <div className="single-product-item">
                                                <div className="product-image">
                                                    <NavLink to={`/product/${product.id}`} className="custom-hover-img" ><img src={product.image} alt="product-image" /></NavLink>
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
                                                    <a href="#">{product.title === null ? product.name : product.title.name + " " + product.name}</a>
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
    )
}

export default ProductRelated;
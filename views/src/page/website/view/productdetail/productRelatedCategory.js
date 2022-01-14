import { NavLink } from "react-router-dom";
import API from "../../../../api/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LazyLoad from 'react-lazyload'

function ProductRelateCategory(props) {
    const [productRelatedCategory, setProductRelatedCategory] = useState([])
    const [page, setPage] = useState(0)

    useEffect(()=>{
        callApiRelatedCategory()
    },[page])

    const callApiRelatedCategory = async() => {
        try {
            const url = `/api/v1/product-related-category/page=${page}/product-id=${props.id}`
            const response = await API.get(url)
            const {data, messageCode, messageName} = response
            if(messageCode==200){
                if(data.length==0) {
                    setPage(page-1)
                    return
                }
                setProductRelatedCategory(data)
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi!")
            console.log(error)
        }
    }

    const onClickNext=()=>{
        let pageNew=page+1
        setPage(pageNew)
    }

    const onClickPre = () => {
        let pageNew = page==0? 0 : page-1
        setPage(pageNew)
    }

    return (
        <div>
            <div className="single-product-right-sidebar">
                <h2 className="left-title" >Sản phẩm cùng loại: </h2>
                <ul >
                    {
                        productRelatedCategory.map(value=>{
                            const {product} = value
                            return(
                                <LazyLoad className="custom-hover">
                                    <li>
                                        <NavLink to={`/product/${product.id}`}  style={{marginLeft:"20px"}}>
                                            <a href="#" className="custom-hover-img" ><img src={product.image} alt height={70}/></a>
                                            <div className="r-sidebar-pro-content">
                                                <h5><a href="#">{product.name}</a></h5>
                                                <p>{product.title === null ? "": product.title.name }</p>
                                            </div>
                                        </NavLink>
                                    </li>
                                </LazyLoad>
                            )
                        })
                    }
                </ul>
                <div style={{marginTop:"-10px", marginBottom:"-10px"}}>
                    <button className="btn btn-default" onClick={()=>{onClickPre()}}>
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    </button>
                    <button className="btn btn-default" onClick={()=>{onClickNext()}}>
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductRelateCategory;
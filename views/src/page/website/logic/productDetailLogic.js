import ProductDetail from "../view/productdetail/productDetail";
import API from "../../../api/api";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function ProductDetailLogic({setLoading}){
    const [product, setProduct] = useState({})
    const {id} =  useParams()
    const [loadingElm,setLoadingElm] = useState(true)
    const [quantityOrder, setQuantityOrder] = useState(1)
    const [description, setDescription]=useState("")
    const [starAve, setStarAve] = useState(0)
    

    const callApiProduct = async() => {
        setLoadingElm(true)
        try {
            const url =`/api/v1/user/product/${id}`
            const response = await API.get(url)
            const {data, messageCode, messageName} = response
            if(messageCode==200){
                setProduct(data)
                setDescription(data.product.description)
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi!")
        }
        setLoadingElm(false)
    }

    const onChangeQuantity = (e) => {
        const {value} = e.target
        const {quantity} = product.product
        if(value<1){
            toast.error("Số lương không thể nhỏ hơn 1!")
            return
        }
        if(value>quantity){
            toast.error("Số lương vượt quá số lượng sẵn có!")
            return
        }
        setQuantityOrder(+value)
    }

    const callApiAddToCart = async() =>{
        setLoading(true)
        try {
            const value = {
                productId: id,
                quantity: quantityOrder
            }
            const url = "/api/v2/user/cart-detail"
            const response = await API.postAdmin(url, value)
            const {data, messageCode, messageName} = response
            if(messageCode==200){
                toast.success("Đã thêm sản phẩm vào giỏ hàng!")
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const onClickFavorite = () => {
        const account = JSON.parse(localStorage.getItem("AccountToken"))
        if(account==undefined||null){
            toast.error("Bạn chưa đăng nhập. Vui lòng đăng nhập để thực hiện chức năng này!")
            return
        }
        const value = {
            productId: +id
        }
        callApiCreateFavorite(value)
    }

    const callApiCreateFavorite = async(value) => {
        setLoading(true)
        try {
            const url = "/api/v2/user/favorite-create"
            const response = await API.postAdmin(url, value)
            const { messageCode, messageName} = response
            if(messageCode==200){
                toast.success("Đã thêm vào danh sách yêu thích!")
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(()=>{
        callApiProduct()
    },[id])
    return(
        <ProductDetail product={product} id={id}
            loadingElm={loadingElm} onChangeQuantity={onChangeQuantity} 
            quantityOrder={quantityOrder} description={description} 
            callApiAddToCart={callApiAddToCart}
            starAve={starAve} setStarAve={setStarAve}
            onClickFavorite={onClickFavorite}
        /> 
    )
}

export default ProductDetailLogic;
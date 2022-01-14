import Home from "../view/home";
import { useState, useEffect } from "react";
import API from "../../../api/api"
import { toast } from "react-toastify";
import swal from "sweetalert";

function HomeLogic(props){
    const [productNew, setProductNew] = useState([])
    const [productSale, setProductSale] = useState([])
    const [productTrending, setProductTrending] = useState([])
    const [productBanChay, setProductBanChay] = useState([])
    const [listProductCate1, setListProductCate1] = useState([])
    const [listProductCate2, setListProductCate2] = useState([])
    const [listProductCate3, setListProductCate3] = useState([])
    const [listProductCate4, setListProductCate4] = useState([])

    const callApiProductCateLv1= async () => {      
        try {
            const url = "/api/v1/product/find-list-product/category-lv1"
            const response = await API.get(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setListProductCate1(data.listProduct1)
                setListProductCate2(data.listProduct2)
                setListProductCate3(data.listProduct3)
                setListProductCate4(data.listProduct4)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }      
    }

    const callApiProductNew = async () => {      
        try {
            const url = "/api/v1/product-and-sale/product-new"
            const response = await API.get(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setProductNew(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }      
    }

    const callApiProductSale = async () => {      
        try {
            const url = "/api/v1/product-and-sale/product-sale"
            const response = await API.get(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setProductSale(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }      
    }

    const callApiProductTrending = async () => {      
        try {
            const url = "/api/v1/product-and-sale/product-trending"
            const response = await API.get(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setProductTrending(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }      
    }

    const callApiProductBanChay = async () => {      
        try {
            const url = "/api/v1/product-and-sale/product-banchay"
            const response = await API.get(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setProductBanChay(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }      
    }

    const callApiAddProductToCart = async(id) => {
        try {
            const url = `/api/v2/user/addtocart/product/${id}`
            const response = await API.getAdmin(url)
            const {messageName , messageCode} = response 
            if(+messageCode===200){
                toast.success("Sản phẩm đã được thêm vào giỏ hàng !");
            }else{
                toast.error(messageName);
            }
        } catch (error) {
            toast.error("Thêm vào giỏ hàng thất bại !");
        }
    }

    const onClickAddCart =(e, id)=>{
        e.preventDefault()
        const userLogin = localStorage.getItem("AccountToken")
        if(userLogin === null) {
            toast.error("Vui lòng đăng nhập để đặt hàng")
        } else {
            callApiAddProductToCart(id)
        }
    }

    const onClickFavorite = (e, id) => {
        e.preventDefault()
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
    }

    useEffect(() => {
        callApiProductNew()
        callApiProductSale()
        callApiProductTrending()
        callApiProductBanChay()
        callApiProductCateLv1()
    },[])
    return(
        <Home productNew={productNew} productSale={productSale}
            productTrending={productTrending} productBanChay={productBanChay}
            onClickAddCart={onClickAddCart} onClickFavorite={onClickFavorite} callApiCreateFavorite={callApiCreateFavorite}
            listProductCate1={listProductCate1} listProductCate2={listProductCate2} listProductCate3={listProductCate3} listProductCate4={listProductCate4}
        />
    )
}

export default HomeLogic;
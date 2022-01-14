import ProductFavorite from "../../view/profile/productFavorite"
import API from "../../../../api/api";
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { toast } from "react-toastify";

function ProductFavoriteLogic(){
    const [listProductFavorite, setListProductFavorite] = useState([])

    const callApiFindListProductFavorite = async() => {
        try {
            const url = '/api/v1/user/product-favorite'
            const response = await API.getAdmin(url)
            const {data, messageCode, messageName} = response
            console.log(response)
            if(messageCode==200){
                console.log(data)
                setListProductFavorite(data) 
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        callApiFindListProductFavorite()
    },[])

    return(
        <ProductFavorite listProductFavorite={listProductFavorite}/>
    )
}

export default ProductFavoriteLogic;
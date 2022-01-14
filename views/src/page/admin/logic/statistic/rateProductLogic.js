import RateProduct from "../../view/statistic/rateProduct";
import { useState, useEffect, useRef } from "react";
import API from "../../../../api/api";
import swal from 'sweetalert';
import { toast } from "react-toastify";
function RateProductLogic() {
    const [listProduct, setListProduct] = useState([])
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const callApiListProduct = async () => {
        try {
            const url = `/api/v2/admin/product/product-rate-report`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setListProduct(data)
                console.log(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const clickNext = () => {
        if ((page + 1) * size > listProduct.length) return
        setPage(page + 1)
    }

    const clickPre = () => {
        if (page == 0) return
        setPage(page - 1)
    }

    useEffect(()=>{
        callApiListProduct()
    },[])

    return(
        <RateProduct 
            listProduct={listProduct}
            clickNext={clickNext} clickPre={clickPre}  size={size}
            page={page} setSize={setSize}
        />
    )
}

export default RateProductLogic;
import ProductReport from "../../view/report/productReport";
import { useState, useEffect } from "react";
import API from "../../../../api/api";
import { toast } from "react-toastify";

function ProductReportLogic(){
    const [quantityProductToCategory, setQuantityProductToCategory] = useState([])
    const [top10ProductFavorite, setTop10ProductFavorite] = useState([])
    const [top10ProductRateGood, setTop10ProductRateGood] = useState([])
   const [top10ProductSelling, setTop10ProductSelling] = useState([])
    const [top10ProductRateBad, setTop10ProductRateBad] = useState([])
    const callApiQuantityProductToCate = async() => {
        try {
            const url = "/api/v2/supper_admin/report/report-quantity/product-category"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if(messageCode == 200) {
                setQuantityProductToCategory(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiTop10ProductFavorite = async() => {
        try {
            const url = "/api/v2/supper_admin/report/report-favorite/top10-product"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if(messageCode == 200) {
                setTop10ProductFavorite(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiTop10ProductRateGood = async() => {
        try {
            const url = "/api/v2/supper_admin/report/report-rate/top10-product"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if(messageCode == 200) {
                setTop10ProductRateGood(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiTop10ProductSellingALot = async() => {
        try {
            const url = "/api/v2/supper_admin/report/report-selling/top10-product-a-lot"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if(messageCode == 200) {
                setTop10ProductSelling(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiTop10ProductRateBad = async() => {
        try {
            const url = "/api/v2/supper_admin/report/report-rate/top10-product-bad"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if(messageCode == 200) {
                setTop10ProductRateBad(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
       callApiQuantityProductToCate() 
       callApiTop10ProductFavorite()
       callApiTop10ProductRateGood()
       callApiTop10ProductSellingALot()
       callApiTop10ProductRateBad()
    },[])

    return(
        <ProductReport quantityProductToCategory={quantityProductToCategory}
            top10ProductFavorite={top10ProductFavorite}
            top10ProductRateGood={top10ProductRateGood}
            top10ProductSelling={top10ProductSelling}
            top10ProductRateBad={top10ProductRateBad}
        />
    )
}

export default ProductReportLogic;
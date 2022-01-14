import AdminPromotionEdit from "../../view/promotion/adminPromotionEdit";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import API from "../../../../api/api"
import { toast } from "react-toastify";
import swal from 'sweetalert';
import { useForm } from "react-hook-form";
import {promotionValue, setPromotionValue} from "../../../../Service/service"
function AdminPromotionEditLogic({setLoading}) {
    const { id } = useParams()
    const [promotion, setPromotion] = useState()
    const [listPromotiondetail, setListPromotiondetail] = useState([])
    const [loadingElm, setLoadingElm] = useState(false)
    const [listProduct, setListProduct] = useState([])
    const { register, handleSubmit, errors } = useForm();

    const [listCategories, setListCategories] = useState([])
    const [listProductBlackList, setProductBlackList] = useState([])
    const [listCategoriesNotPromotion, setListCategoriesNotPromotion] = useState([])
    const [promotionForm, setPromotionForm] = useState({
        id:Number,
        name:String,
        sale:Number,
        createDate:"",
        endDate:"",
        description:String
    })

    const onChange = (event) => {
        let { name, value } = event.target;
        value = name ==="sale" ? +value: value
        setPromotionForm({
            ...promotionForm,
            [name]:value
        })
    }
    
    const callApiListProduct = async() => {
        try {
            const url = `/api/v2/admin/productOfPromotion/${id}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                setListProduct(data)
            } else {
                toast.error("Đã xảy ra lỗi ", messageName)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi ", error)
            console.log(error)
        }
    }

    const callApiPromotion = async () => {
        setLoadingElm(true)
        try {
            const url = `/api/v2/admin/promotion/${id}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            console.log(data)
            setListPromotiondetail(data.promotiondetail)
            if (+messageCode === 200) {
                console.log(data.promotionCategorie)
                setListCategories(data.promotionCategorie)
                setPromotion(data)
                setPromotionForm({id: +data.id, name:data.name, createDate:data.createDate, endDate:data.endDate, sale:data.sale, description:data.description})
            } else {
                toast.error("Đã xảy ra lỗi ", messageName)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi ")
            console.log(error)
        }
        setLoadingElm(false)
    }

    const callApiDeletePromotionDetail = async(id) => {
        setLoading(true)
        try {
            const url = `/api/v2/admin/promotiondetail?id=${id}`
            const response = await API.deleteAdmin(url)
            const {data, messageCode, messageName} = response
            if (+messageCode === 200) {
                toast.success("Xóa thành công !")
                setListPromotiondetail(oldValue=>{
                    let newValue = oldValue.filter(value=>{
                        return value.id!==data.id
                    })
                    return newValue
                })
                setListProduct([...listProduct, data.product])
            } else {
                toast.error("Đã xảy ra lỗi ", messageName)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const onClickDelete = (value) => {
        swal({
            title: "Chú ý !",
            text: "Bạn muốn loại bỏ sản phẩm này khỏi chương trình hiện tại!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                callApiDeletePromotionDetail(value.id)
            } else {
                toast.warning("Xóa không thành công !!")
            }
        });
    }

    const onClickAdd = (value) => {
        const data = {product:value, promotion}
        callApiCreatePromotiondetail(data)
    }

    const callApiCreatePromotiondetail = async(value) => {
        try {
            const url = "/api/v2/admin/promotiondetail"
            const response = await API.postAdmin(url, value)
            const {data, messageCode, messageName} = response
            if(+messageCode===200){
                toast.success("Thêm thành công !!")
                setListProduct(oldValue=>{
                    let newValue = oldValue.filter(value=>{
                        return value.id !== data.product.id
                    })
                    return newValue
                })
                setListPromotiondetail([...listPromotiondetail, data])
            }else{
                toast.error("Thêm thất bại !! ", messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onClickUpdatePromotion = (e) => {
        e.preventDefault()
        callApiUpdatePromotion(promotionForm)
    }

    const callApiUpdatePromotion = async(value) => {
        setLoading(true)
        try {
            const url = "/api/v2/admin/promotion"
            const response = await API.putAdmin(url, value)
            const {data, messageCode, messageName} = response
            if(+messageCode===200){
                let newPromotionValue = promotionValue.map(oldValue=>{
                    return oldValue.id===data.id? data : oldValue
                })
                setPromotionValue(newPromotionValue)
                setLoading(false)
                toast.success("Đã cập nhập !!")
            }else{
                console.log(response)
                toast.error("Đã xảy ra lỗi: "+messageName)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const onClickDeleteProduct = (value) => {
        const data = {
            promotion:promotion,
            productId:value.id
        }
        callApiAddBlackList(data, value)
    }

    const callApiAddBlackList = async(value, product) => {
        setLoading(true)
        try {
            const url = "/api/v2/admin/promotion-blacklist"
            const response = await API.postAdmin(url, value)
            const {data, messageCode, messageName} = response
            if(+messageCode===200){
                setListProduct(oldValue=>{
                    let newValue = oldValue.filter(elm=>{
                        return elm.id !== data.productId
                    })
                    return newValue
                })
                setProductBlackList([...listProductBlackList, product])
                toast.success("Đã xóa khỏi chương trình !!")
                setLoading(false)
            }else{
                console.log(response)
                toast.error("Đã xảy ra lỗi: "+messageName)
            }
        } catch (error) {
            console.log(error)
            toast.error("Đã xảy ra lỗi")
        }
        setLoading(false)
    }

    const callApiListProductBlackList = async() => {
        try {
            const url = `/api/v2/admin/product-blacklist/promotion/${id}`
            const response = await API.getAdmin(url)
            const {data, messageCode, messageName} = response
            if(+messageCode===200){
                setProductBlackList(data)
            }else{
                toast.error("Đã xảy ra lỗi: "+messageName)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi")
            console.log(error)
        }
    }

    const callApiDeleteProductToBlackList = async(value, product) => {
        try {
            const url = "/api/v2/admin/delete-product-blacklist"
            const response = await API.postAdmin(url, value)
            const {data, messageCode, messageName} = response
            if(+messageCode===200){
                setProductBlackList(oldValue=>{
                    let newValue = oldValue.filter(elm=>{
                        return elm.id != value.productId
                    })
                    return newValue
                })
                setListProduct([...listProduct,product])
                toast.success("Thành công !")
            }else{
                toast.error("Đã xảy ra lỗi: "+messageName)
            }
        } catch (error) {
            
        }
    }

    const onCLickDeleteBlackList = (product) => {
        const value = {
            productId: product.id,
            promotion: promotion
        }
        swal({
            title: "Chú ý !",
            text: "Bạn muốn khôi phục sản phẩm này lại chương trình giảm giá hiện tại!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                console.log(value)
                callApiDeleteProductToBlackList(value, product)
            } else {
                toast.warning("Không thành công !!")
            }
        });
    }

    const callApiGetListCategorieNotPromotion = async() => {
        try {
            const url = `/api/v2/admin/categories-not-promotion/${id}`
            const response = await API.getAdmin(url)
            const {data, messageCode, messageName} = response
            if(+messageCode===200){
                setListCategoriesNotPromotion(data)
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi !")
        }
    }

    const onCLickDeleteCate = (value) => {
        const {id, categorie} = value
        swal({
            title: "Chú ý !",
            text: "Bạn muốn xóa danh mục khỏi chương trình hiện tại!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                callApiDeletePromotionCategory(id, categorie )
            } else {
                toast.warning("Không thành công !!")
            }
        });
    }

    const callApiDeletePromotionCategory = async(id, categorie) => {
        try {
            const url =`/api/v2/admin/promotion-categorie/${id}`
            const response = await API.deleteAdmin(url)
            const { messageCode, messageName}  = response
            if(+messageCode===200){
                toast.success("Xóa thành công !!")
                setListCategories(oldValue=>{
                    let newValue = oldValue.filter(elm=> {
                        return elm.id !== id
                    })
                    return newValue
                })
                setListCategoriesNotPromotion([...listCategoriesNotPromotion, categorie])
                callApiListProduct()
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi !!")
        }
    }

    const onClickCreatePromotionCategorie = (value) => {
        const data = {
            promotion: promotion,
            categorie: value
        }
        swal({
            title: "Chú ý !",
            text: "Bạn muốn thêm "+ value.name +" vào chương trình hiện tại!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                callApiCreatePromotinCategory(data)
            } else {
                toast.warning("Không thành công !!")
            }
        });
    }

    const callApiCreatePromotinCategory = async(value) => {
        try {
            const url = "/api/v2/admin/promotion-categories"
            const response = await API.postAdmin(url, value)
            const {data, messageCode, messageName} = response
            if(+messageCode===200){
                toast.success("Danh mục đã được thêm vào chương trình !!")
                setListCategoriesNotPromotion(oldValue=>{
                    let newValue = oldValue.filter(elm=> {
                        return elm.id !== value.categorie.id
                    })
                    return newValue
                })
                setListCategories([...listCategories, data])
                callApiListProduct()
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            
        }
    }
 
    useEffect(() => {
        callApiListProductBlackList()
        callApiListProduct()
        callApiGetListCategorieNotPromotion()
    }, [])
    useEffect(() => {
        callApiPromotion()
    }, [])
    return (
        <AdminPromotionEdit
            register={register} handleSubmit={handleSubmit} errors={errors}
            onClickDeleteProduct={onClickDeleteProduct}
            promotion={promotion}
            loadingElm={loadingElm}
            onClickDelete={onClickDelete}
            listProduct={listProduct}
            onClickAdd={onClickAdd}
            listPromotiondetail={listPromotiondetail}
            onChange={onChange}
            promotionForm={promotionForm}
            onClickUpdatePromotion={onClickUpdatePromotion}
            listCategories={listCategories}
            listProductBlackList={listProductBlackList}
            onCLickDeleteBlackList={onCLickDeleteBlackList}
            listCategoriesNotPromotion={listCategoriesNotPromotion}
            onCLickDeleteCate={onCLickDeleteCate}
            onClickCreatePromotionCategorie={onClickCreatePromotionCategorie}
        />
    )
}

export default AdminPromotionEditLogic;
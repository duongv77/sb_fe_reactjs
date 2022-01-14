import { useEffect, useState, useRef } from "react";
import AdminCreateOrder from "../../view/order/adminCreateOrder";
import API from "../../../../api/api"
import { toast } from "react-toastify";
import swal from 'sweetalert';
import { orderComFirmValue, setOrderConfirmValue } from '../../../../Service/service';
import { useForm } from "react-hook-form";

function AdminCreateOrderLogic(props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [listProduct, setListProduct] = useState([])
    const [account, setAccount] = useState([])
    const [listAddress, setListAddress] = useState([])
    const [page, setPage] = useState(1)
    const typingTimeOut = useRef(null)
    const [shipping, setShipping] = useState()

    const [listOrderDetail, setListOrderDetail] = useState([])

    const [tabQuantity, setTabQuantity] = useState([])
    const [valueTabDefault, setValueTabDefault] = useState();



    const handleChangeTab = (event, newValue) => {
        console.log(newValue)
        setValueTabDefault(newValue);
    };


    let orderDetail = {
        index: Number,
        quantity: Number,
        product: null
    }

    const formDataReset = {
        fullname: "",
        phone: "",
        address: ""
    }

    const [profile, setProfile] = useState({
        fullname: "",
        phone: "",
        address: ""
    })

    const onChangProfile = (e) => {
        const { value, name } = e.target
        setProfile({ ...profile, [name]: value })
    }


    const callApiGetListProduct = async () => {
        try {
            const url = "/api/v1/product-and-sale"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setListProduct(data)
            } else {
                toast.error("Đã xảy ra lỗi. Không thể lấy danh sách sản phẩm !");
                toast.error(messageName);
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi. Không thể lấy danh sách sản phẩm !");
            console.log(error)
        }
    }

    const callApiOrderPayment = async (value) => {
        props.setLoading(true)
        try {
            const url = "/api/v2/admin/payment"
            const response = await API.postAdmin(url, value)
            const { messageCode, messageName , data} = response
            if (messageCode == 200) {
                toast.success("Thanh toán thành công!");
                setTabQuantity(oldValue=>{
                    const newValue = oldValue.filter(elm=>{
                        return elm.id!=data.id
                    })
                    return newValue
                })
                setValueTabDefault(0)
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
        props.setLoading(false)
    }

    const onClickThanhToan = (e) => {
        e.preventDefault();
        if(listOrderDetail.length==0){
            toast.error("Vui lòng chọn sản phẩm !")
            return
        }
        swal({
            title: "Chú ý!",
            text: "Bạn muốn tạo đơn hàng ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const address = profile.address
                    const description = JSON.stringify(profile)
                    const value = { address, description , orderId: valueTabDefault}
                    callApiOrderPayment(value)
                } else {
                }
            });
    }

    const callApiOrderPaymentOnline = async (value) => {
        console.log(value)
        props.setLoading(true)
        try {
            console.log(value)
            const url = "/api/v2/admin/payment/online"
            const response = await API.postAdmin(url, value)
            const { data, messageCode } = response
            if (+messageCode === 200) {
                toast.success("Đặt hàng thành công !");
                let oldValue = [...orderComFirmValue, data]
                setOrderConfirmValue(oldValue)
                setProfile(formDataReset);
                setTabQuantity(oldValue=>{
                    const newValue = oldValue.filter(elm=>{
                        return elm.id!=data.id
                    })
                    return newValue
                })
                setValueTabDefault(0)
            } else {
                toast.error("Đã xảy ra lỗi. Tạo hóa đơn không thành công !");
            }
        } catch (error) {
            console.log(error)
        }
        props.setLoading(false)

    }

    const onClickThanhToanOnline = () => {
        if(listOrderDetail.length==0){
            toast.error("Vui lòng chọn sản phẩm !")
            return
        }
        swal({
            title: "Are you sure?",
            text: "Bạn có chắc muốn tạo đơn hàng online cho khách hàng có tên: " + profile.fullname
                + " , " + "số điện thoại: " + profile.phone + " , " + "địa chỉ: " + profile.address + "?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const address = profile.address
                    const description = JSON.stringify(profile)
                    const value = { address, description , orderId: valueTabDefault}
                    callApiOrderPaymentOnline(value)
                } else {

                }
            });
    }

    const onClickProduct = (value) => {
        const data={
            orderId: valueTabDefault,
            productId: value.id
        }
        callApiAddProduct(data)
    }

    const callApiAddProduct = async(value) => {
        try {
            const url = "/api/v2/admin/order-detail2"
            const response = await API.postAdmin(url,value)
            const {data, messageCode, messageName} = response
            if(messageCode==200){
                setListOrderDetail(data)
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const callApiAccount = async () => {
        try {
            const url = "/api/v2/user"
            const response = await API.getAdmin(url)
            setAccount(response.data)
            let { address } = response.data
            const addressCustom = {
                id: 0,
                address: response.data.mainAddress
            }
            address = [...address, addressCustom]
            setListAddress(address)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        callApiGetListProduct()
        callApiAccount()
        callApiFindListOrderDefault()
    }, [])

    //xóa order detail
    const onClickDeleteOrder = (e, value) => {
        e.preventDefault()
        callApiDeleteOrderDetail(value.id)
    }

    const callApiDeleteOrderDetail = async(id) => {
        try {
            const url = `/api/v2/admin/order-detail/${id}`
            const response = await API.deleteAdmin(url)
            const { messageCode, messageName } = response
            if (messageCode == 200) {
                setListOrderDetail(oldValue=>{
                    const newValue = oldValue.filter(elm=>{
                        return elm.id != id
                    })
                    return newValue
                })
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onChangeQuantity = (e, data) => {
        console.log(data)
        const { value } = e.target
        if(+value==0){
            callApiDeleteOrderDetail(data.id)
            return
        }
        if (typingTimeOut.current) {
            clearTimeout(typingTimeOut.current);
        }
        typingTimeOut.current = setTimeout(() => {
            const newValue={
                orderDetailId:data.id,
                quantity: +value
            }
            callApiUpdateQuantity(newValue)
        }, 100)
    }

    const callApiUpdateQuantity = async(value) => {
        try {
            const url = `/api/v2/admin/order-detail/update-quantity`
            const response = await API.putAdmin(url, value)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setListOrderDetail(oldValue=>{
                    const newValue = oldValue.map(elm=>{
                        return elm.id != value.orderDetailId ? elm : data
                    })
                    return newValue
                })
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onClickPre = () => {
        if (page === 1) return
        setPage(page - 1)
    }

    const onClickNext = () => {
        if (page * 18 > listProduct.length) return
        setPage(page + 1)
    }

    const onChangeSearch = (e, data) => {
        const { value } = e.target
        if (typingTimeOut.current) {
            clearTimeout(typingTimeOut.current);
        }
        typingTimeOut.current = setTimeout(() => {
            if (value === "") {
                callApiGetListProduct()
                return;
            }
            callApiSearchProduct(value)
        }, 400)
    }

    const callApiSearchProduct = async (keyword) => {
        try {
            const url = `/api/v1/product-and-sale/search=${keyword}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                setListProduct(data)
            } else {
                toast.error("Đã xảy ra lỗi ", messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // list order trạng thái treo
    const callApiFindListOrderDefault = async () => {
        try {
            const url = `/api/v2/admin/order/find-order-default`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setTabQuantity(data)
                setValueTabDefault(data[0].id)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onClickAddTab = () => {
        callApiCreateOrderDefault()
    }

    //tạo order trạng thái chờ
    const callApiCreateOrderDefault = async () => {
        try {
            const url = `/api/v2/admin/order/create-order-default`
            const response = await API.postAdmin(url, null)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setTabQuantity([...tabQuantity, data])
                setValueTabDefault(data.id)
            } else {
                toast.error("Đã xảy ra lỗi ", messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        callApiGetListOrderDetailByOrderId()
    }, [valueTabDefault])

    //lấy list order detail khi thay đổi tab
    const callApiGetListOrderDetailByOrderId = async () => {
        try {
            const url = `/api/v2/admin/order-detail/order-id/${valueTabDefault}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setListOrderDetail(data)
            } else {
                toast.error("Đã xảy ra lỗi ", messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if( profile.address.trim()){
            const string = profile.address.toUpperCase()
            const stt = string.search("HÀ NỘI")
            stt !== -1 ? setShipping(20000) : setShipping(30000)
        }else{
            setShipping(0)
        }
    }, [profile])

    return (
        <AdminCreateOrder
            listProduct={listProduct} listOrderDetail={listOrderDetail}
            onClickProduct={onClickProduct}
            onClickDeleteOrder={onClickDeleteOrder}
            onClickThanhToan={onClickThanhToan}
            onChangProfile={onChangProfile}
            onChangeQuantity={onChangeQuantity}
            onClickThanhToanOnline={onClickThanhToanOnline}
            profile={profile} page={page} setPage={setPage}
            setProfile={setProfile} shipping={shipping} setShipping={setShipping}
            onClickNext={onClickNext} onClickPre={onClickPre}
            onChangeSearch={onChangeSearch}
            tabQuantity={tabQuantity} onClickAddTab={onClickAddTab}
            valueTabDefault={valueTabDefault} handleChangeTab={handleChangeTab}
            register={register} handleSubmit={handleSubmit} errors={errors}
        />

    )
}

export default AdminCreateOrderLogic;
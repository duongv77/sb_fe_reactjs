import HistoryOrder from "../../view/profile/historyOrder"
import API from "../../../../api/api";
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { toast } from "react-toastify";
import { useRef } from "react";

function HistoryOrderLogic(props){
    const [listOrder, setListOrder] = useState([])
    const [orderDetail, setOrderDetail] = useState({})
    const [orderHistory, setOrderHistory] = useState([])
    const [orderDetailReturn, setOrderDetailReturn] = useState([]) 
    const [descriptionReturnOrder, setDescriptionReturnOrder] = useState('')
    let orderReturn = {
        id: null,
        orderdetail: orderDetailReturn,
        description: descriptionReturnOrder
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    // trả hàng
    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => {
      setOpen2(true);
    };
    const handleClose2 = () => {
      setOpen2(false);
    };

    const callApiListOrder = async() => {
        try {
            const url = "/api/v2/user/order"
            const response = await API.getAdmin(url)
            const {data, messageCode, messageName} = response
            if(messageCode==200){
                setListOrder(data)
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onClickOrder = (value) => {
        console.log(value)
        let {orderstatushistorys} = value
        orderstatushistorys.sort((elm1, elm2)=>elm1.id-elm2.id)
        setOrderHistory(orderstatushistorys)
        setOrderDetail(value)
        handleOpen()
    }

    const onClickSetOrder = (value)=>{
        let {orderstatushistorys} = value
        orderstatushistorys.sort((elm1, elm2)=>elm1.id-elm2.id)
        setOrderHistory(orderstatushistorys)
        setOrderDetail(value)
    }

    const onClickCancelOrder = (id) => {
        swal({
            title: "Chú ý:",
            text: "Bạn muốn thu hồi đơn hàng này!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                callApiCancelOrder(id)
            } else {
            }
          });
    }

    const callApiCancelOrder = async(id) => {
        try {
            const url = `/api/v2/user/order/update-cancel/${id}`
            const response = await API.putAdmin(url)
            const {data, messageCode, messageName} = response
            if(messageCode==200){
                setListOrder(oldValue=>{
                    const newValue = oldValue.filter(elm=>{
                        return elm.id !== id
                    })
                    return newValue
                })
                toast.success("Đã thu hồi đơn hàng")
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const onClickRowReturn = (value) => {
        setOrderDetailReturn(value.orderdetail)
        setOrderDetail(value)
        console.log(orderReturn)
        handleOpen2()
    }

    const onClickDeleteRowReturn = (value) => {
        setOrderDetailReturn(oldValue=>{
            const newValue = oldValue.filter(elm=>{
                return elm.id !== value.id
            })
            return newValue
        })
    }

    const onChangeQuantity = (e, id) => {
        const {value} = e.target 
        if(value==0){
            setOrderDetailReturn(oldValue=>{
                const newValue = oldValue.filter(elm=>{
                    return elm.id !== id
                })
                return newValue
            })
            return
        }
        setOrderDetailReturn(oldValue=>{
            const newValue = oldValue.map(elm=>{
                return elm.id == id ? {...elm, quantity: +value} : elm
            })
            return newValue
        })
    }

    const onClickCreateOrderReturn = () => {
        if(descriptionReturnOrder.trim()==""){
            toast.error("Không được để trống lí do!")
            return
        }
        orderReturn = {...orderReturn, id: orderDetail.id}
        callApiReturnOrder(orderReturn)
    }

    const callApiReturnOrder = async(value) => {
        try {
            const url = "/api/v2/user/order/return-order"
            const response = await API.postAdmin(url, value)
            const { messageCode, messageName} = response
            if(messageCode==200){
                toast.success("Đã gửi yêu cầu trả hàng. Chúng tôi sẽ liên hệ sớm nhất cho bạn!")
                handleClose()
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        callApiListOrder()
    },[])

    return(
        <HistoryOrder listOrder={listOrder}
            onClickOrder={onClickOrder} handleOpen={handleOpen} handleClose={handleClose}
            orderDetail={orderDetail} open={open} orderHistory={orderHistory} onClickSetOrder={onClickSetOrder}
            onClickCancelOrder={onClickCancelOrder}
            handleOpen2={handleOpen2} handleClose2={handleClose2} open2={open2}
            onClickRowReturn={onClickRowReturn} orderReturn={orderDetailReturn} onClickDeleteRowReturn={onClickDeleteRowReturn}
            onChangeQuantity={onChangeQuantity} onClickCreateOrderReturn={onClickCreateOrderReturn}
            setDescriptionReturnOrder={setDescriptionReturnOrder} descriptionReturnOrder={descriptionReturnOrder}
        /> 
    )
}

export default HistoryOrderLogic;
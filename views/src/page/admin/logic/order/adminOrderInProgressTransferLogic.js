import AdminOrderInProgressTransf from "../../view/order/adminOrderInProgressTransfer"
import { useState, useEffect, useRef } from 'react'
import { StatusOrder } from "../../../../Service/common"
import API from "../../../../api/api"
import { toast } from "react-toastify";
import swal from 'sweetalert';
import {
    orderInProgressTransferValue,
    setOrderInProgressTransferValue,
    orderFinalValue,
    setOrderFinalValue,
    orderComFirmValue,
    setOrderConfirmValue
} from "../../../../Service/service"

function AdminOrderInProgressTransferLogic({ setLoading }) {
    const [viewOrder, setViewOrder] = useState()
    const typingTimeOut = useRef(null)
    const [listOrder, setListOrder] = useState([])
    const [loadingElm, setLoadingElm] = useState(false)
    const [listOrderDetail, setListOrderDetail] = useState([])
    const [descriptionReturn, setDescriptionReturn] = useState("")
    const [orderValue, setOrderValue] = useState({
        id: Number,
        address: String,
        status: Number,
    })
    const [open, setOpen] = useState(false);
    const [listOrderDetailMain,setListOrderDetailMain] = useState([])
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [sort, setSort] = useState('createDate')

    const [historyOrder, setHistoryOrder] = useState([])
    const onClickOrderHistory = (value) => {
      let { orderstatushistorys } = value
      orderstatushistorys.sort((elm1, elm2) => elm1.id - elm2.id)
      setHistoryOrder(orderstatushistorys)
    }

    const handleOpen = (value) => {
        swal({
            title: "Bạn muốn thay đổi đơn hàng này!",
            text: "Việc thay đổi đơn hàng này sẽ dẫn đến việc thay đổi kết quả nhận sản phẩm của khách hàng. Bạn vẫn muốn tiếp tục ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setOpen(true);
                    document.getElementById("textarea-address").reset()
                    setOrderValue({ id: value.id, address: value.address, status: value.status })
                    setListOrderDetail(value.orderdetail)
                    setListOrderDetailMain(value.orderdetail)
                    setViewOrder(value)
                } else {
                }
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    

    

    const callApiGetListOrder = async () => {
        setLoadingElm(false)
        try {
            const url = `/api/v2/admin/order/${StatusOrder.STATUS_DANG_GIAO_HANG}/${sort}`
            const response = await API.getAdmin(url)
            const {data, messageCode, messageName} = response
            if(messageCode==200){
                setListOrder(data)
                setOrderInProgressTransferValue(response.data)
            }else{
                toast.error(messageCode)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        callApiGetListOrder()
    }, [sort])

    const onClickViewOrder = (value) => {
        setListOrderDetail(value.orderdetail)
    }

    const onChangeSort = (e) => {
        setSort(e.target.value)
      }

    const callApiCancelOrder = async (id) => {
        try {
            const url = `/api/v2/admin/order/update-cancel/${id}`
            const response = await API.putAdmin(url, null)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setListOrder(oldValue => {
                    const newValue = oldValue.filter(elm => {
                        return elm.id != id
                    })
                    return newValue
                })
                toast.success("Đã hủy đơn hàng!")
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onChangeStatusOrder = (e, data) => {
        const { value } = e.target
        swal({
            title: "Chú ý!",
            text: "Bạn có chắc muốn đổi trạng thái đơn hàng?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    if (value == 5) {
                        callApiCancelOrder(data.id)
                    } else {
                        value == 4 ? callApiUpdateStatusFinal(data.id) : callApiUpdateConfirm(data.id)
                    }
                } else {
                    toast.warning("Trạng thái đơn hàng chưa được đổi")
                }
            });
    }

    const callApiUpdateStatusFinal = async (id) => {
        setLoading(true)
        try {
            const url = `/api/v2/admin/order/update-final/${id}`
            const response = await API.putAdmin(url, "")
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                toast.success("Đã cập nhập trạng thái đơn hàng")
                let newValue = listOrder.filter(elm => {
                    return elm.id !== id
                })
                setListOrder(newValue)
                setOrderInProgressTransferValue(newValue)
                if (orderFinalValue.length !== 0) {
                    setOrderFinalValue([...orderFinalValue, data])
                }
            } else {
                toast.error("Đã xảy ra lỗi: ", messageCode)
                toast.error(messageName)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi")
        }
        setLoading(false)
    }

    const callApiUpdateConfirm = async (id) => {
        setLoading(true)
        try {
            const url = `/api/v2/admin/order/update-accept/${id}`
            const response = await API.putAdmin(url, "")
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                toast.success("Đã cập nhập trạng thái đơn hàng")
                let newValue = listOrder.filter(elm => {
                    return elm.id !== id
                })
                setListOrder(newValue)
                setOrderInProgressTransferValue(newValue)
                if (orderComFirmValue.length !== 0) {
                    setOrderConfirmValue([...orderComFirmValue, data])
                }
            } else {
                toast.error("Đã xảy ra lỗi: ", messageCode)
                toast.error(messageName)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi")
        }
        setLoading(false)
    }

    const callAPiUpdateQuantityOrderdetail = async (value) => {
        try {
            const url = "/api/v2/admin/order-detail"
            const response = await API.putAdmin(url, value)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                toast.success("Số lượng đã được thay đổi!")
                let newValue = listOrder.map(elm => {
                    return elm.id === data.id ? data : elm
                })
                setListOrder(newValue)
                setOrderConfirmValue(newValue)
                setListOrderDetail(data.orderdetail)
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const onClickDeleteOrderdetail = (value) => {
        swal({
            title: "Chú ý!",
            text: "Bạn muốn xóa sản phẩm ra khỏi đơn hàng?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    callApiDeleteOrderdetail(value.id)
                } else {
                }
            });
    }

    const deleteOrderDetail = (id) => {
        setListOrderDetail(oldValue => {
            let newValue = oldValue.filter(elm => {
                return elm.id !== id
            })
            return newValue
        })
    }

    const callApiDeleteOrderdetail = async (id) => {
        try {
            const url = `/api/v2/admin/order-detail/${id}`
            const response = await API.deleteAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                toast.success("Đã xóa sản phẩm khỏi đơn hàng!")
                setListOrderDetail(oldValue => {
                    let newValue = oldValue.filter(elm => {
                        return elm.id !== id
                    })
                    return newValue
                })
                setListOrder(oldValue => {
                    let newValue = oldValue.map(elm => {
                        return elm.id === data.id ? data : elm
                    })
                    return newValue
                })
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi!")
        }
    }

    const onClickAddProduct = (e) => {
        e.preventDefault()
        const productId = document.getElementById("productId").value
        const value = {
            productId: +productId, orderId: viewOrder.id
        }
        callApiAddProductInOrder(value)
    }

    const callApiAddProductInOrder = async (value) => {
        console.log(value)
        try {
            const url = "/api/v2/admin/order-detail"
            const response = await API.postAdmin(url, value)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                toast.success("Đã thêm sản phẩm vào đơn hàng!")
                let newValue = listOrder.map(elm => {
                    return elm.id === data.id ? data : elm
                })
                setListOrder(newValue)
                setOrderConfirmValue(newValue)
                setListOrderDetail(data.orderdetail)
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onChangeDescriptionReturn = (e) => {
        setDescriptionReturn(e.target.value)
    }

    const onCLickUpdate = () => {
        const value = {
            orderdetail: listOrderDetail,
            description: descriptionReturn,
            id: orderValue.id,
        }
        if (descriptionReturn.trim() !== '') {
            swal({
                title: "Chú ý!",
                text: "Bạn muốn sửa đơn hàng?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        callApiCreateReturnOrder(value)
                    } else {
                    }
                });
        } else {
            toast.error("Không được để trống lí do trả hàng!")
        }
    }

    const callApiCreateReturnOrder = async (value) => {
        try {
            const url = "/api/v2/admin/order/return-order"
            const response = await API.putAdmin(url, value)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                toast.success("Đã sửa đơn hàng !")
                handleClose()
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const clickNext = () => {
        if ((page + 1) * size >= listOrder.length) return
        setPage(page + 1)
    }

    const clickPre = () => {
        if (page == 0) return
        setPage(page - 1)
    }

    const onChangeSearch = (e) => {
        const { value } = e.target
        if (typingTimeOut.current) {
          clearTimeout(typingTimeOut.current);
        }
        typingTimeOut.current = setTimeout(() => {
          if(value.trim()){
            callApiSearchOrder(value)
          }else{
            callApiGetListOrder()
          }
        }, 400)
      }
    
      const callApiSearchOrder = async(keyword) => {
        try {
          const url = `/api/v2/admin/order-search/${sort}/key/${keyword}`
          const response = await API.getAdmin(url)
          const { data, messageCode, messageName } = response
          if (messageCode == 200) {
            setListOrder(data)
          } else {
            toast.error(messageName)
          }
        } catch (error) {
          console.log(error)
        }
      }

    return (
        <AdminOrderInProgressTransf listOrder={listOrder}
            loadingElm={loadingElm} deleteOrderDetail={deleteOrderDetail}
            listOrderDetail={listOrderDetail} orderValue={orderValue}
            onClickViewOrder={onClickViewOrder}
            onChangeStatusOrder={onChangeStatusOrder}
            open={open} handleOpen={handleOpen} handleClose={handleClose}
            onClickDeleteOrderdetail={onClickDeleteOrderdetail}
            onClickAddProduct={onClickAddProduct} listOrderDetailMain={listOrderDetailMain}
            descriptionReturn={descriptionReturn} onChangeDescriptionReturn={onChangeDescriptionReturn}
            onCLickUpdate={onCLickUpdate}
            page={page}
            setSize={setSize}
            size={size} historyOrder={historyOrder} onClickOrderHistory={onClickOrderHistory}
            clickNext={clickNext} 
            clickPre={clickPre}
            onChangeSearch={onChangeSearch}
            onChangeSort={onChangeSort} listOrderDetailMain={listOrderDetailMain}
        />
    )
}

export default AdminOrderInProgressTransferLogic;
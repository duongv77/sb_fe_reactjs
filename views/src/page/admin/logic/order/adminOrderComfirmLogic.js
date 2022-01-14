import AdminOrderComfirm from "../../view/order/adminOrderComfirm";
import { useState, useEffect, useRef } from 'react'
import { convertGetAddress, StatusOrder } from "../../../../Service/common";
import API from "../../../../api/api"
import { toast } from "react-toastify";
import swal from 'sweetalert';
import {
    orderComFirmValue,
    setOrderConfirmValue,
    orderNewValue,
    setOrderNewValue,
    orderInProgressTransferValue,
    setOrderInProgressTransferValue
} from '../../../../Service/service'


function AdminOrderComfirmLogic({ setLoading }) {
    const typingTimeOut = useRef(null)
    const [listOrder, setListOrder] = useState([])
    const [viewOrder, setViewOrder] = useState()
    const [listOrderDetail, setListOrderDetail] = useState([])
    const [sort, setSort] = useState('createDate')
    const [loadingElm, setLoadingElm] = useState(false)
    const [address, setAddress] = useState("")
    const [orderValue, setOrderValue] = useState({
        id: Number,
        address: String,
        status: Number,
    })
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [historyOrder, setHistoryOrder] = useState([])


    const callApiGetListOrder = async () => {
        try {
            setLoadingElm(true)
            const url = `/api/v2/admin/order/${StatusOrder.STATUS_DA_XAC_NHAN}/${sort}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            setLoadingElm(false)
            if (+messageCode === 200) {
                setListOrder(data)
                setOrderConfirmValue(data)
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            setLoadingElm(false)
            console.log(error)
        }
    }

    useEffect(() => {
        callApiGetListOrder()
    }, [sort])

    const onChangeSort = (e) => {
        setSort(e.target.value)
    }

    const onChangeSearch = (e) => {
        const { value } = e.target
        if (typingTimeOut.current) {
            clearTimeout(typingTimeOut.current);
        }
        typingTimeOut.current = setTimeout(() => {
            if (value.trim()) {
                callApiSearchOrder(value)
            } else {
                callApiGetListOrder()
            }
        }, 400)
    }

    const callApiSearchOrder = async (keyword) => {
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

    const onClickUpdate = (e) => {
        e.preventDefault()
        callApiUpdateOrder(orderValue)
    }

    const callApiUpdateOrder = async (value) => {
        setLoading(true)
        try {
            const url = "/api/v2/admin/order"
            const response = await API.putAdmin(url, value)
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                toast.success(`Cập nhập order ${value.id} thành công!`);
                if (value.status === data.status) {
                    let newValue = listOrder.map(value => {
                        return value.id === data.id ? data : value
                    })
                    setListOrder(newValue)
                    setOrderConfirmValue(newValue)
                } else {
                    setListOrder(oldValue => {
                        let newValue = oldValue.filter(value => {
                            return value.id !== data.id
                        })
                        return newValue
                    })
                }
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const onChangeSelectStatusOrder = (e) => {
        const { name, value } = e.target
        setOrderValue({
            ...orderValue,
            [name]: value
        })
    }



    const onclickUpdateOrder = (value) => {
        document.getElementById("textarea-address").reset()
        setOrderValue({ id: value.id, address: value.address, status: value.status })
        setListOrderDetail(value.orderdetail)
        setViewOrder(value)
        setAddress(value.address)
    }

    const onClickViewOrder = (value) => {
        setListOrderDetail(value.orderdetail)
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
                        value == 3 ? callApiUpdateStatusTransform(data.id) : callApiUpdateStatusNew(data.id)
                    }
                } else {
                }
            });
    }

    const callApiUpdateStatusNew = async (id) => {
        setLoading(true)
        try {
            const url = `/api/v2/admin/order/update-new/${id}`
            const response = await API.putAdmin(url, "")
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                toast.success("Đã cập nhập trạng thái đơn hàng!")
                let newValue = listOrder.filter(elm => {
                    return elm.id !== id
                })
                setListOrder(newValue)
                setOrderConfirmValue(newValue)
                if (orderNewValue.length !== 0) {
                    setOrderNewValue([...orderNewValue, data])
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

    const onClickOrderHistory = (value) => {
        let { orderstatushistorys } = value
        orderstatushistorys.sort((elm1, elm2) => elm1.id - elm2.id)
        setHistoryOrder(orderstatushistorys)
    }

    const callApiUpdateStatusTransform = async (id) => {
        setLoading(true)
        try {
            const url = `/api/v2/admin/order/update-transform/${id}`
            const response = await API.putAdmin(url, "")
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                toast.success("Đã cập nhập trạng thái đơn hàng!")
                let newValue = listOrder.filter(elm => {
                    return elm.id !== id
                })
                setListOrder(newValue)
                setOrderConfirmValue(newValue)
                if (orderInProgressTransferValue.length !== 0) {
                    setOrderInProgressTransferValue([...orderInProgressTransferValue, data])
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
                toast.error("Đã xảy ra lỗi: ", messageCode)
                toast.error(messageName)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi!")
        }
    }

    const onChangeQuantity = (e, data) => {
        const { value } = e.target
        if (value < 1) {
            document.getElementById("quantity").value = 1
            toast.error("Số lượng không được nhỏ hơn 1!")
            return
        }
        if (typingTimeOut.current) {
            clearTimeout(typingTimeOut.current);
        }
        typingTimeOut.current = setTimeout(() => {
            const { quantity } = data
            swal({
                title: "Chú ý!",
                text: "Bạn muốn thay đổi số lượng?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        const newData = {
                            id: data.id,
                            quantity: +value
                        }
                        console.log(newData)
                        callAPiUpdateQuantityOrderdetail(newData)
                    } else {
                        document.getElementById("quantity").value = quantity
                    }
                });
        }, 400)
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
                toast.error("Đã xảy ra lỗi: ", messageCode)
                toast.error(messageName)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi!")
            console.log(error)
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
                toast.error("Đã xảy ra lỗi: ", messageCode)
                toast.error(messageName)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi!")
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

    return (
        <AdminOrderComfirm
            onClickUpdate={onClickUpdate}
            onclickUpdateOrder={onclickUpdateOrder}
            listOrder={listOrder}
            orderValue={orderValue}
            onClickViewOrder={onClickViewOrder}
            listOrderDetail={listOrderDetail}
            onChangeSelectStatusOrder={onChangeSelectStatusOrder}
            loadingElm={loadingElm}
            onChangeStatusOrder={onChangeStatusOrder}
            onClickDeleteOrderdetail={onClickDeleteOrderdetail}
            onChangeQuantity={onChangeQuantity}
            onClickAddProduct={onClickAddProduct}
            page={page} historyOrder={historyOrder}
            setSize={setSize}
            size={size} onClickOrderHistory={onClickOrderHistory}
            clickNext={clickNext}
            clickPre={clickPre}
            onChangeSearch={onChangeSearch}
            onChangeSort={onChangeSort} address={address}
        />
    )
}

export default AdminOrderComfirmLogic;
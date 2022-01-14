import AdminOrderCancel from "../../view/order/adminOrderCancel"
import { useState, useEffect, useRef } from 'react'
import { StatusOrder } from "../../../../Service/common";
import API from "../../../../api/api"
import { toast } from "react-toastify";
import swal from 'sweetalert';
import {
  orderCancelValue,
  setOrderCancelValue,
  orderNewValue,
  setOrderNewValue
} from '../../../../Service/service'

function AdminOrderCancelLogic({ setLoading }) {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [listOrder, setListOrder] = useState([])
  const [listOrderDetail, setListOrderDetail] = useState([])
  const [orderValue, setOrderValue] = useState({
    id: Number,
    address: String,
    status: Number,
  })

  const [sort, setSort] = useState('createDate')
  const typingTimeOut = useRef(null)
  const [historyOrder, setHistoryOrder] = useState([])
  const onClickOrderHistory = (value) => {
    let { orderstatushistorys } = value
    orderstatushistorys.sort((elm1, elm2) => elm1.id - elm2.id)
    setHistoryOrder(orderstatushistorys)
  }
  const callApiGetListOrder = async () => {
    try {
      const url = `/api/v2/admin/order/${StatusOrder.STATUS_DA_HUY}/${sort}`
      const response = await API.getAdmin(url)
      const { data, messageCode, messageName } = response
      if (+messageCode === 200) {
        setListOrder(data)
        setOrderCancelValue(data)
      } else {
        toast.error("Đã xảy ra lỗi ", messageName)
      }
    } catch (error) {
      console.log(error)
    }
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

  const refresh = (id) => {
    swal({
      title: "Bạn có chắc khôi phục đơn hàng",
      text: "Đơn hàng sau khi được khôi phục sẽ được thêm vào danh sách đơn hàng đang chờ xác nhận",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          callApiUpdateStatusNew(id)
        } else {
          toast.warning("Trạng thái đơn hàng chưa được đổi")
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
        toast.success("Trạng thái đơn hàng đã được đổi")
        let newValue = listOrder.filter(elm => {
          return elm.id !== id
        })
        setListOrder(newValue)
        setOrderCancelValue(newValue)
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

  useEffect(() => {
    callApiGetListOrder()
  }, [sort])

  const onClickViewOrder = (value) => {
    setListOrderDetail(value.orderdetail)
  }

  const clickNext = () => {
    if ((page + 1) * size >= listOrder.length) return
    setPage(page + 1)
  }

  const clickPre = () => {
    if (page == 0) return
    setPage(page - 1)
  }

  const onChangeSort = (e) => {
    setSort(e.target.value)
  }
  return (
    <AdminOrderCancel listOrder={listOrder} orderValue={orderValue} onClickViewOrder={onClickViewOrder}
      listOrderDetail={listOrderDetail}
      refresh={refresh}
      size={size} historyOrder={historyOrder} onClickOrderHistory={onClickOrderHistory}
      setSize={setSize}
      page={page}
      clickNext={clickNext}
      clickPre={clickPre}
      onChangeSearch={onChangeSearch}
      onChangeSort={onChangeSort}
    />
  )
}

export default AdminOrderCancelLogic;
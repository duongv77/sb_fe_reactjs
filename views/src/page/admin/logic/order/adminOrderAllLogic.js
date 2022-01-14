import AdminOrderAll from "../../view/order/adminOrderAll";
import { toast } from "react-toastify";
import { useState, useEffect } from 'react'
import { StatusOrder } from "../../../../Service/common";
import API from "../../../../api/api"
import { useRef } from "react";

function AdminOrderAllLogic() {
  const [listOrder, setListOrder] = useState([])
  const [listOrderDetail, setListOrderDetail] = useState([])
  const [page, setPage] = useState(1)

  const [size, setSize] = useState(10)
  const [sort, setSort] = useState('createDate')
  const typingTimeOut = useRef(null)
  
  const [open, setOpen] = useState(false);
  const [returnOrder, setReturnOrder] = useState("")
  
  const [historyOrder, setHistoryOrder] = useState([])
  const onClickOrderHistory = (value) => {
    let { orderstatushistorys } = value
    orderstatushistorys.sort((elm1, elm2) => elm1.id - elm2.id)
    setHistoryOrder(orderstatushistorys)
  }

  const handleOpen = (value) => {
    setListOrderDetail(value.orderdetail)
    setReturnOrder(value.returnOrder)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [orderValue, setOrderValue] = useState({
    id: Number,
    address: String,
    status: Number,
  })

  const callApiGetListOrder = async () => {
    try {
      const url = `/api/v2/admin/order-filter/${sort}`
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

  useEffect(() => {
    callApiGetListOrder()
  }, [sort])

  const onClickViewOrder = (value) => {
    setListOrderDetail(value.orderdetail)
  }

  const onClickPre = () => {
    if (page === 1) return
    setPage(page - 1)
  }

  const onClickNext = () => {
    if (page * size > listOrder.length) return
    setPage(page + 1)
  }

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

 

  return (
    <AdminOrderAll listOrder={listOrder} orderValue={orderValue} onClickViewOrder={onClickViewOrder} onChangeSort={onChangeSort}
      listOrderDetail={listOrderDetail} page={page} setSize={setSize} size={size} onClickPre={onClickPre} onClickNext={onClickNext}
      onChangeSearch={onChangeSearch} open={open} handleOpen={handleOpen} handleClose={handleClose} returnOrder={returnOrder}
      onClickOrderHistory={onClickOrderHistory} historyOrder={historyOrder} onClickOrderHistory={onClickOrderHistory}
    />
  )
}

export default AdminOrderAllLogic;
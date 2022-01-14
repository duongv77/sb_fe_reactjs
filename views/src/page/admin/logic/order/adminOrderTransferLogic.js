import AdminOrderTransfer from "../../view/order/adminOrderTransfer";
import { useState, useEffect ,useRef} from 'react'
import { StatusOrder } from "../../../../Service/common";
import API from "../../../../api/api"
import {
    orderFinalValue,
    setOrderFinalValue,
} from "../../../../Service/service"
import { toast } from "react-toastify";

function AdminOrderTransferLogic() {
    const [open6, setOpen6] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [listOrder, setListOrder] = useState()
    const [orderView, setOrderView] = useState([])
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [sort, setSort] = useState('createDate')
  const typingTimeOut = useRef(null)
  const [historyOrder, setHistoryOrder] = useState([])
    const onClickOrderHistory = (value) => {
      let { orderstatushistorys } = value
      orderstatushistorys.sort((elm1, elm2) => elm1.id - elm2.id)
      setHistoryOrder(orderstatushistorys)
    }

    const handleOpen6 = (value) => {
        setOrderView(value)
        setOpen6(true);
    };

    const handleClose6 = () => {
        setOpen6(false);
    };

    const handleOpen4 = (value) => {
        setOrderView(value)
        setOpen4(true);
    };

    const handleClose4 = () => {
        setOpen4(false);
    };

    const callApiGetListOrder = async () => {
        try {
            const url = `/api/v2/admin/order/success-order/${sort}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setListOrder(data)
                setOrderFinalValue(data)
            } else {
                toast.error(messageName)
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

    useEffect(() => {
        callApiGetListOrder()
    }, [sort])

    const onChangeSort = (e) => {
      setSort(e.target.value)
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
        <AdminOrderTransfer listOrder={listOrder}
            open6={open6} handleOpen6={handleOpen6} handleClose6={handleClose6}
            open4={open4} handleOpen4={handleOpen4} handleClose4={handleClose4}
            orderView={orderView}
            page={page}
            setSize={setSize}
            size={size} historyOrder={historyOrder} onClickOrderHistory={onClickOrderHistory}
            clickNext={clickNext}
            clickPre={clickPre}
            onChangeSearch={onChangeSearch}
            onChangeSort={onChangeSort}
        />
    )
}

export default AdminOrderTransferLogic;
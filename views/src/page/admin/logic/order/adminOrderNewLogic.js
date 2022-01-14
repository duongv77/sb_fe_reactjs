import AdminOrder from "../../view/order/adminOrderNew";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { useState, useEffect ,useRef} from "react";
import { numberWithCommas, StatusOrder } from "../../../../Service/common";
import API from "../../../../api/api";
import { orderNewValue, setOrderNewValue, setOrderConfirmValue, setOrderCancelValue, orderComFirmValue, orderCancelValue } from "../../../../Service/service";

function AdminOrderLogic() {
  const [listOrder, setListOrder] = useState([]);
  const [listOrderDetail, setListOrderDetail] = useState([]);
  const [sort, setSort] = useState('createDate')
  const [orderValue, setOrderValue] = useState({
    id: Number,
    address: String,
    status: Number,
  });
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const typingTimeOut = useRef(null)

  const checkAddress = (string) => {
    let check = false
    const HN = "HÀ NỘI"
    if (string == null) return check
    const stringToCase = string.toUpperCase()
    for (var i = 0; i < string.length; i++) {
      if (stringToCase.charAt(i) == "H") {
        if (stringToCase.slice(i, i + 7).trim() === "HÀ NỘI") check = true
      }
    }
    return check
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

  const callApiGetListOrder = async () => {
    try {
      const url = `/api/v2/admin/order/${StatusOrder.STATUS_CHO_XAC_NHAN}/${sort}`;
      const response = await API.getAdmin(url);
      const {data, messageCode, messageName} = response
      if(messageCode==200){
        setListOrder(data);
      }else{
        toast.error(messageName)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApiGetListOrder()
  }, [sort]);

  const onChangeSort = (e) => {
    setSort(e.target.value)
  }

  const onClickAccept = (id) => {
    swal({
      title: "Chú ý?",
      text: "Bạn muốn duyệt đơn hàng này ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Nhập vào số tiền đã đặt cọc:", {
          content: "input",
        })
          .then((value) => {
            accessLv2(value, id)
          })
          .catch((error)=>{
          })
        // callApiAcceptOrder(id);
      } else {
        toast.warning("Đơn hàng chưa được duyệt!");
      }
    });
  };

  const accessLv2 = (value, id) => {
    swal({
      title: "Chú ý?",
      text: `Đơn hàng này đã đặt cọc ${numberWithCommas(value==""?0:value)}₫ ?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        callApiAcceptOrder(id, value);
      } else {
      }
    });
  }

  const onCLickCancel = (id) => {
    swal({
      title: "Chú ý?",
      text: "Bạn muốn hủy đơn hàng này ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        callApiCancelOrder(id)
      } else {
        toast.warning("Đơn hàng chưa được hủy!");
      }
    });
  };

  const callApiAcceptOrder = async (id, value) => {
    try {
      const url = `/api/v2/admin/order/update-accept/${id}/price/${value}`;
      const response = await API.putAdmin(url, "");
      const { data, messageCode, messageName } = response;
      if (messageCode == 200) {
        toast.success("Đã xác nhận đơn hàng!");
        let newValue = listOrder.filter((elm) => {
          return elm.id !== id;
        });
        setListOrder(newValue);
        setOrderNewValue(newValue);
        let newOrderConfirm = [...orderComFirmValue, data]
        setOrderConfirmValue(newOrderConfirm)
      } else {
        toast.error(messageName);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const callApiCancelOrder = async (id) => {
    try {
      const url = `/api/v2/admin/order/update-cancel/${id}`;
      const response = await API.putAdmin(url, "");
      const { data, messageCode, messageName } = response;
      if (messageCode == 200) {
        toast.success("Đã hủy đơn hàng!");
        let newValue = listOrder.filter((elm) => {
          return elm.id !== id;
        });
        setListOrder(newValue);
        setOrderNewValue(newValue);
        let newOrderCancelValue = [...orderCancelValue, data]
        setOrderCancelValue(newOrderCancelValue)
      } else {
        toast.error("Đã xảy ra lỗi: ");
        toast.error(messageName);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi!");
    }
  };

  const onClickViewOrder = (value) => {
    setListOrderDetail(value.orderdetail);
  };

  const clickNext = () => {
    if ((page + 1) * size >= listOrder.length) return
    setPage(page + 1)
  }

  const clickPre = () => {
    if (page == 0) return
    setPage(page - 1)
  }

  return (
    <AdminOrder
      onClickAccept={onClickAccept}
      onCLickCancel={onCLickCancel}
      listOrder={listOrder}
      orderValue={orderValue}
      onClickViewOrder={onClickViewOrder}
      listOrderDetail={listOrderDetail}
      page={page}
      setSize={setSize}
      size={size}
      clickNext={clickNext}
      clickPre={clickPre}
      checkAddress={checkAddress}
      onChangeSearch={onChangeSearch}
      onChangeSort={onChangeSort}
    />
  );
}
export default AdminOrderLogic;

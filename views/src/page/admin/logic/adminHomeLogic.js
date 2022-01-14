import AdminHome from "../view/adminHome";
import { useState, useEffect } from "react";
import API from "../../../api/api"
import { toast } from "react-toastify";
import { StatusOrder } from "../../../Service/common";
import { setOrderNewValue } from "../../../Service/service";
import swal from "sweetalert";
import { numberWithCommas } from "../../../Service/common";

function AdminHomeLogic({ setLoading }) {
    const [orderNew, setOrderNew] = useState([])
    const [listOrder, setListOrder] = useState([]);
    const [orderMonth, setOrderMonth] = useState([])
    const [countOrderAndOrderSuccess, setCountOrderAndOrderSuccess] = useState([])
    const [countCountVote, setCountVote] = useState([])
    const [ptOrderSuccess, setPtOrderSuccess] = useState('')
    const [ptVote, setPtVote] = useState('')
    const [countPromotion, setCountPromotion] = useState(0)
    const [countComment, setCountComment] = useState(0)
    const account = JSON.parse(localStorage.getItem("AccountToken"))
    const role = account.roleAccount

    const checkRole = () => {
        let check = false
        role.map(elm => {
            const { role } = elm
            if (role.name == "SUPPER_ADMIN") check = true
        })
        return check
    }

    const callApiCountComment = async () => {
        try {
            const url = "/api/v2/admin/comment-count"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setCountComment(data)
                console.log(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiCountPromotion = async () => {
        setLoading(true)
        try {
            const url = "/api/v2/admin/order-new"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setOrderNew(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const callApiOrderNew = async () => {
        try {
            const url = "/api/v2/admin/promotion-count"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setCountPromotion(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiCountVote = async () => {
        setLoading(true)
        try {
            const url = "/api/v2/admin/vote/count-good/count-all"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setCountVote(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const callApiCountOrderAndOrderSuccess = async () => {
        setLoading(true)
        try {
            const url = "/api/v2/admin/order/find-count/order/order-success"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setCountOrderAndOrderSuccess(data)
                console.log(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const callApiGetListOrder = async () => {
        try {
            const url = `/api/v2/admin/order/${StatusOrder.STATUS_CHO_XAC_NHAN}/createDate`;
            const response = await API.getAdmin(url);
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                setListOrder(data)
                console.log(data)
                setOrderNewValue(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const callApiGetListOrderMonth = async () => {
        setLoading(true)
        try {
            const url = `/api/v2/admin/order-month`;
            const response = await API.getAdmin(url);
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                setOrderMonth(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    };

    const pTmOrderSuccess = () => {
        let valueAll = countOrderAndOrderSuccess.countOrder
        let valueSuccess = countOrderAndOrderSuccess.countOrderSuccess
        let kq = (valueSuccess / valueAll * 100).toFixed(0)
        setPtOrderSuccess(kq + "%")
        let countVoteg = countCountVote.countVoteGood
        let countVoteAll = countCountVote.countVoteAll
        let kq2 = (countVoteg / countVoteAll * 100).toFixed(0)
        setPtVote(kq2 + "%")
    }

    useEffect(() => {
        pTmOrderSuccess()
    }, [countOrderAndOrderSuccess])

    useEffect(() => {
        callApiCountVote()
        callApiGetListOrderMonth()
        callApiOrderNew()
        callApiGetListOrder()
        callApiCountOrderAndOrderSuccess()
        callApiCountPromotion()
        callApiCountComment()
    }, [])

    // api duyệt đơn
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
                    .catch((error) => {
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
            text: `Đơn hàng này đã đặt cọc ${numberWithCommas(value)}₫ ?`,
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
    const callApiAcceptOrder = async (id, value) => {
        try {
            const url = `/api/v2/admin/order/update-accept/${id}/price/${value}`;
            const response = await API.putAdmin(url, "");
            const { data, messageCode, messageName } = response;
            if (messageCode == 200) {
                toast.success("Đã xác nhận đơn hàng!");
                let newValue = orderNew.filter((elm) => {
                    return elm.id !== id;
                });
                setOrderNew(newValue);
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <AdminHome orderNew={orderNew} listOrder={listOrder} orderMonth={orderMonth}
            countOrderAndOrderSuccess={countOrderAndOrderSuccess} ptOrderSuccess={ptOrderSuccess}
            countCountVote={countCountVote} ptVote={ptVote} checkRole={checkRole} onClickAccept={onClickAccept}
            countPromotion={countPromotion} countComment={countComment}
        />
    )
}

export default AdminHomeLogic;
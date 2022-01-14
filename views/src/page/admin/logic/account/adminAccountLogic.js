import AdminAccount from "../../view/account/adminAccount";
import { useState, useEffect ,useRef} from "react";
import API from "../../../../api/api";
import { toast } from "react-toastify";
import {accountValue, setAccountValue} from '../../../../Service/service';

import swal from 'sweetalert';

function AdminAccountLogic({setLoading}) {
    const [listAccount, setListAccount] = useState([])
    const [loadingElm, setLoadingElm] = useState(false)
    const [viewAccountDetail, setViewAccountDetail] = useState({})
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const typingTimeOut = useRef(null)
    let sort = "username"

    const callApiListAccount = async () => {
        setLoadingElm(true)
        try {
            const url = `/api/v2/admin/account/sort=${sort}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                setListAccount(response.data)
            } else {
                toast.error("Đã xảy ra lỗi ", messageName);
            }
        } catch (error) {
            console.log(error)
        }
        setLoadingElm(false)
    }

    const onClickAccountViewDetail = (value) => {
        setViewAccountDetail(value)
    }

    const onChangeSort = (e) => {
        const {value} = e.target
        sort = value
        callApiListAccount()
    }

    const callApiSearchAccount = async(keyword) => {
        try {
            const url = `/api/v2/admin/account/sort=${sort}/search=${keyword}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                setListAccount(data)
            } else {
                toast.error("Đã xảy ra lỗi ", messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiChangeRole = async(value) => {
        try {
            const url = "/api/v2/supper_admin/roleAccount"
            const response = await API.postAdmin(url, value)
            const {data, messageCode, messageName} = response
            if (messageCode == 200) {
                let newValue = listAccount.map(elm=>{
                    return elm.id===data.id?data:elm
                })
                setListAccount(newValue)
                setAccountValue(newValue)
                toast.success("Đã chỉnh sửa quyền của account");
            } else {
                toast.error("Đã xảy ra lỗi ");
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onBlurValue = (e, data)=>{
        const {value} = e.target
        const newValue = {accountId:data.id, email:value}
        const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
        if(!regex.test(newValue.email)){
            toast.error("Email không đúng định dạng!");
            return
        }
        swal({
            title: "Chú ý!",
            text: "Bạn muốn thay đổi email ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                callApiUpdateEmailAccount(newValue)
            } else {
              
            }
          }); 
    }

    const onKeyValue = (e, data)=>{
        if(e.key === 'Enter'){
            const {value} = e.target
            const newValue = {accountId:data.id, email:value}
            const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
            if(!regex.test(newValue.email)){
                toast.error("Email không đúng định dạng!");
                return
            }
            swal({
                title: "Chú ý!",
                text: "Bạn muốn thay đổi email ?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    callApiUpdateEmailAccount(newValue)
                } else {
                  
                }
              }); 
        }
    }

    const callApiUpdateEmailAccount = async(value) => {
        
        setLoading(true)
        try {
            const url = "/api/v2/admin/account-update-email"
            const response = await API.putAdmin(url, value)
            const {data, messageCode, messageName} = response
            if (messageCode == 200) {
                let newValue = listAccount.map(elm=>{
                    return elm.id===data.id?data:elm
                })
                setListAccount(newValue)
                setAccountValue(newValue)
                toast.success("Đã thay đổi email!");
            } else {
                toast.error("Đã xảy ra lỗi ");
                toast.error(messageName)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi ");
            console.log(error)
        }
        setLoading(false)
    }

    const onChangeActivated = (e, data) => {
        const {checked} = e.target
        const newValue = {
            id: data.id,
            status:checked===true?1:0
        }
        callApiUpdateStatus(newValue)
        console.log(newValue)
    }

    const callApiUpdateStatus = async(value) => {
        setLoading(true)
        try {
            const url = "/api/v2/supper_admin/account-update-status"
            const response = await API.putAdmin(url, value)
            const {data, messageCode, messageName} = response
            if (messageCode == 200) {
                let newValue = listAccount.map(elm=>{
                    return elm.id===data.id?data:elm
                })
                setListAccount(newValue)
                setAccountValue(newValue)
                toast.success("Đã thay đổi trạng thái account!");
            } else {
                toast.error("Đã xảy ra lỗi ");
                toast.error(messageName)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi ");
            console.log(error)
        }
        setLoading(false)
    }

    const onClickDeleteAccount = (value) => {
        swal({
            title: "Chú ý!",
            text: "Bạn muốn xóa account ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                callApiDelete(value.id)
            } else {
              
            }
          }); 
    }

    const callApiDelete = async(id) => {
        setLoading(true)
        try {
            const url = `/api/v2/supper_admin/account/${id}`
            const response = await API.deleteAdmin(url)
            const {data, messageCode, messageName} = response
            if (messageCode == 200) {
                let newValue = listAccount.map(elm=>{
                    return elm.id===data.id?data:elm
                })
                setListAccount(newValue)
                setAccountValue(newValue)
                toast.success("Đã xóa account!");
            } else {
                toast.error("Error "+ messageCode+":Đã xảy ra lỗi ");
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        accountValue.length==0? callApiListAccount():setListAccount(accountValue)
    }, [])

    const clickNext = () => {
        if ((page + 1) * size >= listAccount.length) return
        setPage(page + 1)
    }

    const clickPre = () => {
        if (page == 0) return
        setPage(page - 1)
    }

    const onChangeSearch = (e, data) => {
        const { value } = e.target
        if (typingTimeOut.current) {
            clearTimeout(typingTimeOut.current);
        }
        typingTimeOut.current = setTimeout(() => {
            callApiSearchAccount(value)
        }, 400)
    }


    return (
        <AdminAccount
            onChangeActivated={onChangeActivated}
            listAccount={listAccount} 
            loadingElm={loadingElm} 
            onClickAccountViewDetail={onClickAccountViewDetail}
            viewAccountDetail={viewAccountDetail}
            callApiChangeRole={callApiChangeRole}
            onBlurValue={onBlurValue}
            onKeyValue={onKeyValue} onClickDeleteAccount={onClickDeleteAccount}
            page={page}
            setSize={setSize}
            size={size}
            clickNext={clickNext} 
            clickPre={clickPre}
            onChangeSort={onChangeSort}
            onChangeSearch={onChangeSearch}
            
        />
    )
}

export default AdminAccountLogic;
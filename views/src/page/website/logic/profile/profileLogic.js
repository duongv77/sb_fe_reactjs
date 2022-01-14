import Profile from "../../view/profile/profile"
import API from "../../../../api/api";
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { toast } from "react-toastify"; 
import { useForm } from "react-hook-form"; 

function ProfileLogic({ profile, setProfile ,callApiGetAccount}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false)

    const [listWard, setListWard]= useState([]) //xã phường
    const [listDistrict, setListDistrict] = useState([]) //quận huyện
    const [listPvrovince, setListProvince]= useState([]) //tỉnh thành phố

    const [ward, setWard] = useState('')
    const [district, setDistrict] = useState('')
    const [pvrovince, setPvrovince] = useState('')
    const [addressDetail, setAddressDetail] = useState(null)
    const [address, setAddress] = useState('')


    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangeWard = (valueStr) => {
        const valueObj = JSON.parse(valueStr)
        setWard(valueObj.prefix + " "+ valueObj.name)
    }

    const onChangeDistrict = (valueStr) => {
        const valueObj = JSON.parse(valueStr)
        setDistrict(valueObj.prefix + " "+ valueObj.name)
        callApiListWardOnchangeDistricts(valueObj.id)
        console.log(valueObj)
    }

    const onChangePvrovince = (valueStr) => {
        const valueObj = JSON.parse(valueStr)
        setPvrovince(valueObj.name)
        callApiListDistrictOnchange(valueObj.id)
        callApiListWardOnchangeProvince(valueObj.id)
    }

    const onClickDeleteAddress = (id) => {
        swal({
            title: "Chú ý?",
            text: "Bạn muốn xóa địa chỉ này !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                callApiDeleteAddress(id)
            } else {
            }
          });
    }

    const callApiDeleteAddress =  async(id)=>{
        try {
            const url = `/api/v1/user/address/${id}`
            const response = await API.deleteAdmin(url)
            const {messageCode, messageName, data} = response
            if(messageCode==200){
                toast.success("Đã xóa địa chỉ!")
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiListDistrictOnchange =async(id)=>{
        try {
            const url = `/api/v1/user/address-api-districts/find-districts/${id}`
            const response = await API.getAdmin(url)
            const {messageCode, messageName, data} = response
            if(messageCode==200){
                setListDistrict(data)
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiListWardOnchangeProvince =async(id)=>{
        try {
            const url = `/api/v1/user/address-api-ward/find-province/${id}`
            const response = await API.getAdmin(url)
            const {messageCode, messageName, data} = response
            if(messageCode==200){
                setListWard(data)
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiListWardOnchangeDistricts =async(id)=>{
        try {
            const url = `/api/v1/user/address-api-ward/find-districts/${id}`
            const response = await API.getAdmin(url)
            const {messageCode, messageName, data} = response
            if(messageCode==200){
                setListWard(data)
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiProvince = async() => {
        try {
            const url = '/api/v1/user/address-api-province'
            const response = await API.getAdmin(url)
            const {messageCode, messageName, data} = response
            if(messageCode==200){
                setListProvince(data)
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const callApiDistrict = async() => {
        try {
            const url = '/api/v1/user/address-api-districts'
            const response = await API.getAdmin(url)
            const {messageCode, messageName, data} = response
            if(messageCode==200){
                setListDistrict(data)
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const callApiWard = async() => {
        try {
            const url = '/api/v1/user/address-api-ward'
            const response = await API.getAdmin(url)
            const {messageCode, messageName, data} = response
            if(messageCode==200){
                setListWard(data)
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        callApiProvince()
        callApiDistrict()
        callApiWard()
    },[])

    const onSubmitProfile =(data)=>{
        swal({
            title: "Chú ý!",
            text: "Bạn muốn cập nhập thông tin ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                const value = {...data, id:profile.id}
                callApiUpdateProfile(value)
            } else {
            }
          });
    }

    const callApiUpdateProfile = async(value) => {
        try {
            const url = '/api/v2/user/update-profile'
            const response = await API.putAdmin(url, value)
            const {messageCode, messageName, data} = response
            console.log(response)
            if(messageCode==200){
                toast.success("Đã cập nhập thông tin!")
                setProfile(data)
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmitUpdatePassword = (data)=>{
        if(data.passwordNewConfirm!=data.passwordNew){
            toast.error("Xác nhận mật khẩu mới không chính xác!")
            return
        }
        swal({
            title: "Chú ý!",
            text: "Bạn muốn đổi mật khẩu ?",
            icon: "warning",
            buttons: true, 
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                const value = {...data, id:profile.id}
                callApiUpdateProduct(value)
            } else {
            }
          });
    } 
    const callApiUpdateProduct = async(value) => {
        try {
            const url = '/api/v2/user/update-password'
            const response = await API.putAdmin(url, value)
            const {messageCode, messageName, data} = response
            console.log(response)
            if(messageCode==200){
                toast.success("Mật khẩu đã được thay đổi!")
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onClickAdd=()=>{
        swal({
            title: "Chú ý!",
            text: "Bạn muốn thêm địa chỉ ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                const value = {address}
                callApiCreateAddress(value)
            } else {
            }
          });
    }

    const callApiCreateAddress = async(value) => {
        try {
            const url = '/api/v1/user/address-create'
            const response = await API.postAdmin(url, value)
            const {messageCode, messageName} = response
            if(messageCode==200){
                callApiGetAccount()
                handleClose()
                toast.success("Địa chỉ đã được thêm!")
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        let value = ""
        if(addressDetail==null || addressDetail.trim()) value= value+addressDetail+", "
        if(ward.trim()) value= value+ward+", "
        if(district.trim())  value= value+ district+", "
        if(pvrovince.trim())  value= value+ pvrovince
        setAddress(value)
    },[ward,district,pvrovince, addressDetail])

    return (
        <Profile profile={profile}
            register={register} handleSubmit={handleSubmit} errors={errors} onSubmitProfile={onSubmitProfile} 
            onSubmitUpdatePassword={onSubmitUpdatePassword} setAddressDetail={setAddressDetail} onClickAdd={onClickAdd}
            open={open} handleClose={handleClose} handleOpen={handleOpen} addressDetail={addressDetail}
            listPvrovince={listPvrovince} listDistrict={listDistrict} listWard={listWard} address={address}
            onChangePvrovince={onChangePvrovince} onChangeDistrict={onChangeDistrict} onChangeWard={onChangeWard}
            onClickDeleteAddress={onClickDeleteAddress} 
        />
    )
} 

export default ProfileLogic;
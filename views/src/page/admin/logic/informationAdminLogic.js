import InformationAdmin from "../view/informationAdmin";
import API from "../../../api/api";
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { toast } from "react-toastify";
import firebase from 'firebase/compat/app';
import { useForm } from "react-hook-form"; 

function InformationAdminLogic() {
    const [profile, setProfile] = useState({})
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [photo, setPhoto] = useState(undefined)
    const callApiGetAccount = async () => {
        try {
            const url = "/api/v2/admin/info"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setProfile(data)
                setPhoto(data.photo)
                console.log(data)
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const upImg1 = () => {
        try {
            const file = document.getElementById('img2').files[0]
            let storagerRef = firebase.storage().ref(`images/${file.name}`);
            storagerRef.put(file).then(function () {
                storagerRef.getDownloadURL().then((url) => {
                    setPhoto(url)
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const callApiUpdateProfile = async(value) => {
        try {
            const url = '/api/v2/admin/updateInformation'
            const response = await API.putAdmin(url, value)
            const {messageCode, messageName, data} = response
            console.log(response)
            if(messageCode==200){
                toast.success("Cập nhật thành công !")
                setProfile(data)
                setPhoto(data.photo)
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmitProfile =(data)=>{
        swal({
            title: "Chú ý!",
            text: "Bạn có chắc muốn cập nhập lại thông tin ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                const objValue = { id: profile.id, fullname: profile.fullname, phone: profile.phone,
                     mainAddress: profile.mainAddress, photo: photo }
                console.log(objValue)
                const validateFullname = document.getElementById("fullname").value
                const validatePhone = document.getElementById("phone").value
                const validateAddress = document.getElementById("mainAddress").value
                const formatPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                if (validateFullname == "") {
                    document.getElementById("errorFullname").innerHTML = " Bạn chưa nhập họ tên ! ";
                    return;
                } else {
                    document.getElementById("errorFullname").innerHTML = ""
                }

                if (validatePhone !== '') {
                    if (formatPhone.test(validatePhone) == true) {
                        document.getElementById("errorPhone").innerHTML = '';
                    } else {
                        document.getElementById("errorPhone").innerHTML = "Hãy nhập đúng định dạng số điện thoại !";
                        return;
                    }
                } else {
                    document.getElementById("errorPhone").innerHTML = " Bạn chưa nhập số điện thoại !";
                    return;
                }

                if (validateAddress == "") {
                    document.getElementById("errorMainAddress").innerHTML = " Bạn chưa nhập địa chỉ ! ";
                    return;
                } else {
                    document.getElementById("errorMainAddress").innerHTML = ""
                }

                // if(validateFullname =="" || validatePhone=="" || validateAddress==""
                //  || formatPhone.test(validatePhone) !== true) return;

                callApiUpdateProfile(objValue)
            } else {
            }
          });
    }

    const formInputOnChange = function (event) {
        const { name, value } = event.target;
        console.log(name, value)
        setProfile({
            ...profile,
            [name]: value
        })
    }
    
    useEffect(() => {
        callApiGetAccount()
    }, [])

    return (
        <InformationAdmin profile={profile} register={register} handleSubmit={handleSubmit} errors={errors}
          upImg1={upImg1} photo={photo} onSubmitProfile = {onSubmitProfile} 
          formInputOnChange = {formInputOnChange}/>
    )
}

export default InformationAdminLogic;
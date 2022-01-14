import AdminLoginChangePw from "../view/adminLoginChangePw";
import { useForm } from "react-hook-form";
import API from "../../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

function AdminLoginChangePwLogic(props){
    const { register, handleSubmit, formState: { errors } } = useForm();
    let history = useHistory();

    const onSubmit = (value) =>{
        callApiForgetPassword(value.email)
    }
    const callApiForgetPassword = async(email) => {
        try {
            props.setLoading(true)
            const url = `/api/v1/forget_password/${email}`
            const response = await API.get(url)
            const {messageCode, messageName} = response;
            props.setLoading(false)
            if (+messageCode === 200) {
                toast.success("Link đổi mật khẩu mới đã được gửi vào email đăng kí tài khoản của bạn !!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });

            }else{
                toast.error(messageName, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
        } catch (error) {
            
        }
    }
    return(
        <div>
            <ToastContainer />
            <AdminLoginChangePw 
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                onSubmit={onSubmit}
            />
        </div>
            
    )
}

export default AdminLoginChangePwLogic;
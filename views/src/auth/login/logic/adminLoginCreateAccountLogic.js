import AdminLoginCreateAccount from "../view/adminLoginCreateAccount";
import { useForm } from "react-hook-form";
import API from "../../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useState } from "react";

function AdminLoginCreateAccountLogic(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data)
        callApiCreateAccount(data)
    }

    const callApiCreateAccount = async (value) => {
        try {
            props.setLoading(true)
            const url = "/api/v1/account"
            const response = await API.post(url, value)
            const { messageCode, messageName, data } = response
            props.setLoading(false)
            if (+messageCode === 200) {
                console.log(data)
                toast.success("Đăng kí tài khoản thành công!");
            } else {
                toast.error(messageName);
            }
        } catch (error) {

        }
    }

    return (
        <div>
            <AdminLoginCreateAccount
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                onSubmit={onSubmit}
            />
            <ToastContainer />
        </div>
    )
}

export default AdminLoginCreateAccountLogic;
import RestartPassword from "../view/restartPassword"
import { useParams, useHistory } from "react-router-dom";
import { useState } from 'react';
import API from "../../../api/api";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function RestartPasswordLogic(props){
    const {  register, handleSubmit,  formState: { errors } } = useForm();
    const {key} = useParams()
    const {id}= useParams()
    let history = useHistory()
    const [account , setAccount] = useState({})


    useEffect(()=>{
        callApiGetAccount()
    },[])

    const callApiGetAccount = async() => {
        try {
            const url = `/api/v1/restart/password/account_${id}`
            const response = await API.get(url)
            const {data, messageCode} = response
            if(+messageCode===200){
                setAccount(data)
            }else{
                history.push("/")
            }
        } catch (error) {
            
        }
    }

    const onSubmit = (value) => {
        const {password, passwordComfirm} = value
        const {username} = account
        const data = {password, username}
        if(password!==passwordComfirm){
            toast.error("Mật khẩu nhập lại không chính xác");
            return
        }
        callApiUpdatePw(data)
    }
    
    const callApiUpdatePw = async(value) => {
        props.setLoading(true)
        console.log(key)
        try {
            const url = `/api/v1/change/password/${key}`
            const response = await API.post(url, value)
            const {messageName, messageCode} = response
            props.setLoading(false)
            if(+messageCode===200){
                toast.success("Đổi mật khẩu thành công");
            }else{
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
        props.setLoading(false)
    }

    return(
        <RestartPassword 
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        account={account}/>
    )
}

export default RestartPasswordLogic;
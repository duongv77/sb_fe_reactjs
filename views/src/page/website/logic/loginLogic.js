import Login from "../view/login.js";
import { useForm } from "react-hook-form";
import API from "../../../api/api";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect , useMemo} from "react";

function LoginLogic(props) {
    const [saveAccount, setSaveAccount] = useState(false)
    const account = JSON.parse(localStorage.getItem("SaveAccount"))

    const [defaultAccount, setDefaultAccount] = useState({
        username: account==null?"":account.username,
        password: account==null?"":account.password,
        checked: account==null?false: account.checked
    })

    const { register,handleSubmit,formState: { errors }} = useForm();
    let history = useHistory();

    const onSubmitFormLogin = (data) => {
        if (saveAccount) {
            const value = {...data, checked: saveAccount}
            console.log(value)
            localStorage.setItem("SaveAccount", JSON.stringify(value));
        } else {
            localStorage.removeItem("SaveAccount")
        }
        callApiLogin(data);
    };

    const callApiLogin = async (value) => {
        try {
            props.setLoading(true)
            const url = "/api/v1/login";
            const response = await API.post(url, value);
            const { data, messageCode, messageName } = response;
            if (messageCode == 200) {
                toast.success("Đăng nhập thành công. Chào Mừng bạn đã quay trở lại!")
                localStorage.setItem("AccessToken", data.accessToken);
                localStorage.setItem("AccountToken", JSON.stringify(data))
                history.push("/");
                window.location.reload();
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error);
        }
        props.setLoading(false)
    };

    useEffect(()=>{
        const checked = account!=null?account.checked:false
        console.log(checked)
        setSaveAccount(checked)
    },[])
    return (
        <Login
        onSubmitFormLogin={onSubmitFormLogin}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        saveAccount={saveAccount} setSaveAccount={setSaveAccount} defaultAccount={defaultAccount}
        />
    )
}

export default LoginLogic;
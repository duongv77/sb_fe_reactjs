import AdminNav from "./adminNav";
import { useEffect, useState } from "react";
import API from "../../api/api";
import swal from 'sweetalert';
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

function AdminNavLogic() { 
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [profile, setProfile] = useState({}) 

    const callApiGetAccount = async () => { 
        try {
            const url = "/api/v2/admin/info" 
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setProfile(data)
             //   setImage(data.photo)        
                console.log(data) 
            } else { 
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        callApiGetAccount()
    }, [])
  
    return(
        <AdminNav profile={profile} handleSubmit={handleSubmit} errors={errors} register={register} />
    )
}

export default AdminNavLogic;


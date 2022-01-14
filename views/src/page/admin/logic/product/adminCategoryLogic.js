import AdminCategory from "../../view/product/adminCategory";
import { useForm } from "react-hook-form";
import { useState, useEffect ,useRef} from "react";
import { toast } from "react-toastify";
import API from "../../../../api/api";
import swal from 'sweetalert';
import { setCategoryValue } from "../../../../Service/service";
import { useParams } from "react-router-dom"
function AdminCategoryLogic() {
    const formDataInit = {
        id: "", name: "", status: "", note: null, categorie: {}
    }
    const { id } = useParams()
    const [loadingElm, setLoadingElm] = useState(false)
    const [listTypeCategory, setListTypeCategory] = useState([])
    const [listNameCategory, setListNameCategory] = useState([])
    const [updateTypeCategory, setUpdateTypeCategory] = useState([])
    const [listSubCategory, setListSubCategory] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [listCateDetails, setListCateDetails] = useState([{ id: 14, name: "Không xác định" }])
    const [formData, setFormData] = useState(formDataInit);
    const [formData1, setFormData1] = useState(formDataInit);
    const [clickRow, setClickRow] = useState(-1);
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const typingTimeOut = useRef(null)
    let sort = "name"

    const callApiListNameCategory = async (data) => {
        try {
            const url = "/api/v2/admin/nameCategory"
            const response = await API.getAdmin(url)
            const { data } = response
            console.log(data)
            setListNameCategory(data)
        } catch (error) {
            console.log(error)
        }
    }

    const callApiUpdateTypeCategory = async (data) => {
        try {
            const url = "/api/v2/admin/typeBigCategory"
            const response = await API.getAdmin(url)
            const { data } = response
            console.log(data)
            setUpdateTypeCategory(data)
        } catch (error) {
            console.log(error)
        }
    }

    const callApiListTypeCategory = async (data) => {
        try {
            const url = "/api/v2/admin/category"
            const response = await API.getAdmin(url)
            const { data } = response
            console.log(data)
            setListTypeCategory(data)
        } catch (error) {
            console.log(error)
        }
    }

    

    const callApiListSubCategory = async (id) => {
        try {
            const url = `/api/v2/admin/listSubCategory/${id}`
            const response = await API.getAdmin(url)
            const { data } = response
            console.log(data)
            setListSubCategory(data)
        } catch (error) {
            console.log(error)
        }
    }

    const callApiDeleteCategory = async (id) => {
        try {
            const url = `/api/v2/admin/category/${id}`
            const response = await API.deleteAdmin(url)
            const { messageName, messageCode } = response
            if (+messageCode === 200) {
                toast.success("Xóa thành công !");
                setListTypeCategory((oldValue) => {
                    let listNewCategory = oldValue.filter((val) => {
                        return val.id !== id
                    })
                    return listNewCategory
                })
                setListSubCategory((oldValue) => {
                    let listNewCategory1 = oldValue.filter((val) => {
                        return val.id !== id
                    })
                    return listNewCategory1
                })
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            toast.error("Xóa không thành công ! Hãy kiểm tra lại các ràng buộc với danh mục này !")
            console.log(error)
        }
    }

    const onClickUpdate = (value, index) => {
        console.log(value, index);
        setFormData(value)
        callApiListSubCategory(value.id)
        setClickRow(index)
    }

    const onClickUpdate1 = (value, index) => {
        console.log(value, index);
        setFormData1(value)
        setClickRow(index)
    }

    const onClickDelete = (value) => {
        console.log(value)
        swal({
            title: "Chú ý :",
            text: "Bạn có chắc muốn xóa danh mục " + value.name + " ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    callApiDeleteCategory(value.id)

                } else {
                    //  toast.error("Xóa không thành công !");
                }
            });
    }

    const onChangeTypeCate = (e) => {
        const { value } = e.target
        console.log(value)

    }

    const formInputOnChange = function (event) {
        const { name, value } = event.target;
        console.log(name, value)
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const formInputOnChange1 = function (event) {
        const { name, value } = event.target;
        console.log(name, value)
        setFormData1({
            ...formData1,
            [name]: value
        })
    }

    const callApiUpdateCategory = async (value) => {
        try {
            const url = "/api/v2/admin/category"
            const response = await API.putAdmin(url, value)
            const { messageCode, messageName, data } = response
            console.log(data)
            if (messageCode == 200) {
                toast.success("Cập nhật thông tin danh mục thành công !");
                setListTypeCategory(oldValue => {
                    const newValue = oldValue.map(elm => {
                        return elm.id == data.id ? data : elm

                    })
                    return newValue
                })
                document.getElementById('close-modal1').click();
                document.getElementById('close-modal2').click();
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
            toast.error("Lỗi khi cập nhật danh mục !")
        }
    }

    const submitCategoryUpdate = () => {
        swal({
            title: "Chú ý!",
            text: "Bạn có chắc muốn cập nhật lại thông tin danh mục này ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const cate = document.getElementById("categoriee").value
                    const cateFinal = cate !== "" ? { id: +cate } : { id: 14 }
                    const objValue = { id: formData.id, name: formData.name, note: formData.note, categorie: cateFinal }
                    const nameCate = document.getElementById("name").value
                    if (nameCate == "") {
                        document.getElementById("errorName").innerHTML = " Bạn chưa nhập tên danh mục ! ";
                        return;
                    } else {
                        document.getElementById("errorName").innerHTML = ""
                    }
                    console.log(objValue)
                    callApiUpdateCategory(objValue)
                }
            });

    }

    const submitCategoryUpdate1 = () => {
        swal({
            title: "Chú ý!",
            text: "Bạn có chắc muốn cập nhật lại thông tin danh mục này ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const cate = document.getElementById("categoriee1").value
                    const cateFinal = cate !== "" ? { id: +cate } : { id: 14 }
                    const objValue = { id: formData1.id, name: formData1.name, note: formData1.note, categorie: cateFinal }
                    const nameSubcate = document.getElementById("name1").value
                    if (nameSubcate == "") {
                        document.getElementById("errorName1").innerHTML = " Bạn chưa nhập tên danh mục ! ";
                        return;
                    } else {
                        document.getElementById("errorName1").innerHTML = ""
                    }
                    console.log(objValue)
                    callApiUpdateCategory(objValue)
                }
            });
    }

    

    const submitCategoryCreate = (data) => {
        swal({
            title: "Chú ý!",
            text: "Bạn có chắc muốn thêm danh mục này ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const cate = document.getElementById("categorie").value
                    const cateFinal = cate !== "" ? JSON.parse(cate) : { id: 14, name: "Không xác định" }
                    let categorie = listCateDetails.filter(elm => { return elm.id == data.categorie })[0];
                    categorie = categorie === undefined ? cateFinal : categorie
                    const objValue = { name: data.name, note: data.note, categorie: categorie }
                     

                    callApiCreateCategory(objValue)
                }
            });
                   
            
    } 

    const callApiCreateCategory = async (data) => {
        try {
            const url = "/api/v2/admin/category"
            const response = await API.postAdmin(url, data)
            console.log(response)
            const { messageCode } = response
            if (+messageCode === 200) {
                toast.success("Thêm thành công !");

                setListTypeCategory([
                    ...listTypeCategory,
                    response.data
                ])
            }
            document.getElementById('close-modal').click();
        } catch (error) {
            console.log(error)
            toast.error("Lỗi khi thêm")
        }
    }



    const onChangeSwith = async (e, id) => {
        swal({
            title: "Chú ý!",
            text: "Bạn có chắc muốn cập nhật trạng thái cho danh mục ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    callAPIUpdateStatus(id)
                }
            });

    }

    const callAPIUpdateStatus = async (id) => {
        try {

            const url = `/api/v2/admin/category/updateStatus/${id}`
            const response = await API.putAdmin(url, "")
            const { data, messageName, messageCode } = response
            if (+messageCode === 200) {
                toast.success("Thay đổi trạng thái thành công !");
                let newValue = listTypeCategory.map(elm => {
                    return elm.id == data.id ? data : elm
                })
                setListTypeCategory(newValue)
                setCategoryValue(newValue)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            toast.error("Thay đổi không thành công !");
            console.log(error)
        }
    }

    useEffect(() => {
        callApiListTypeCategory()
        callApiListNameCategory()
        callApiListSubCategory()
        callApiUpdateTypeCategory()
    }, [])

    const clickNext = () => {
        if ((page + 1) * size >= listTypeCategory.length) return
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
            if(value.trim()){
                callApiSearchCategory(value)
            }else{
                callApiListTypeCategory()
            }
        }, 400)
    }

    const callApiSearchCategory = async(keyword) => {
        try {
            const url = `/api/v2/admin/category/sort=${sort}/search=${keyword}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                setListTypeCategory(data)
            } else {
                toast.error("Đã xảy ra lỗi ", messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AdminCategory listTypeCategory={listTypeCategory} onClickDelete={onClickDelete}
            listNameCategory={listNameCategory} onChangeTypeCate={onChangeTypeCate}
            updateTypeCategory = {updateTypeCategory}
            submitCategoryCreate={submitCategoryCreate} handleSubmit={handleSubmit}
            register={register} errors={errors} onChangeSwith={onChangeSwith} onClickUpdate={onClickUpdate}
            page={page}
            setSize={setSize}
            size={size}
            clickNext={clickNext} 
            clickPre={clickPre}
            onClickUpdate1={onClickUpdate1} formData1={formData1} formInputOnChange1={formInputOnChange1}
            formData={formData} formInputOnChange = {formInputOnChange} 
            submitCategoryUpdate={submitCategoryUpdate} listSubCategory={listSubCategory}
            submitCategoryUpdate1={submitCategoryUpdate1}  
            onChangeSearch={onChangeSearch}

            />
    )
}

export default AdminCategoryLogic;
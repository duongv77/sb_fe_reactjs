import AdminAuthor from "../../view/product/adminAuthor";
import firebase from "firebase/compat/app"
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import API from "../../../../api/api";
import { Eggy } from '@s-r0/eggy-js';
import { toast } from "react-toastify";
import { authorValue, setAuthorValue } from '../../../../Service/service'
import swal from 'sweetalert';

function AdminAuthorLogic() {
    const formDataInit = {
        id: "", name: "", status: "", photo: ""
    }
    const [editAuthor, setEditAuthor] = useState(formDataInit);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [listAuthor, setListAuthor] = useState([])
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [photo, setPhoto] = useState(undefined)
    const [loadingElm, setLoadingElm] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const typingTimeOut = useRef(null)
    let sort = "name"

    const callApiCreateAuthor = async (value) => {
        try {
            const url = "/api/v2/admin/author"
            const response = await API.postAdmin(url, value)
            console.log(response)
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                toast.success('Thêm tác giả thành công !');
                setListAuthor([
                    ...listAuthor,
                    data
                ])
                document.getElementById('close-modal').click();
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    

    const onChangeSwith = async (e, id) => {
        swal({
            title: "Chú ý!",
            text: "Bạn có chắc muốn cập nhật trạng thái tác giả này ?",
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

            const url = `/api/v2/admin/author/updateStatus/${id}`
            const response = await API.putAdmin(url, "")
            const { data, messageName, messageCode } = response
            if (+messageCode === 200) {
                toast.success("Thay đổi trạng thái thành công !");
                let newValue = listAuthor.map(elm => {
                    return elm.id == data.id ? data : elm
                })
                setListAuthor(newValue)

            } else {
                toast.error(messageName);
            }
        } catch (error) {
            toast.error("Thay đổi không thành công !");
            console.log(error)
        }
    }

    const onChangeSort = (e) => {
        const { value } = e.target
        sort = value
        callApiAuthor()
    }

    const onChangeSearch = (e, data) => {
        const { value } = e.target
        if (typingTimeOut.current) {
            clearTimeout(typingTimeOut.current);
        }
        typingTimeOut.current = setTimeout(() => {
            callApiSearchAuthor(value)
        }, 400)
    }

    const callApiSearchAuthor = async (keyword) => {
        try {
            const url = `/api/v2/admin/author/sort=${sort}/search=${keyword}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                setListAuthor(data)
            } else {
                toast.error("Đã xảy ra lỗi ", messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiUpdateAuthor = async (data) => {
        
        try {
            const url = "/api/v2/admin/author"
            const response = await API.putAdmin(url, data)
            console.log(response)
            toast.success('Cập nhật thông tin tác giả thành công !');
            setListAuthor((oldValue) => {
                let newValue = oldValue.map(function (val) {
                    return val.id === response.data.id ? response.data : val
                })
                return newValue
            })
            document.getElementById('close-modal1').click();
        } catch (error) {
            console.log(error)
        }
    }

    const callApiDeleteAuthor = async (id) => {
        try {
            const url = "/api/v2/admin/author/" + id;
            const response = await API.deleteAdmin(url)
            const { messageName, messageCode } = response
            if (+messageCode === 200) {
                toast.success("Xóa thành công !");
                setListAuthor((oldValue) => {
                    let listProductNew = oldValue.filter((val) => {
                        return val.id !== id
                    })
                    return listProductNew
                })
            }
            else {
                toast.error(messageName)
            }
        } catch (error) {
            toast.error("Xóa không thành công ! Hãy kiểm tra lại các ràng buộc với tác giả này !")
            console.log(error);
        }
    }

    const upImg = () => {
        setLoadingElm(true)
        try {
            const file = document.getElementById('img').files[0]
            let storagerRef = firebase.storage().ref(`images/${file.name}`);
            storagerRef.put(file).then(function () {
                storagerRef.getDownloadURL().then((url) => {
                    setPhoto(url)
                    setLoadingElm(false)
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const upImg1 = () => {
        setLoading1(true)
        try {
            const file = document.getElementById('img1').files[0]
            let storagerRef = firebase.storage().ref(`images/${file.name}`);
            storagerRef.put(file).then(function () {
                storagerRef.getDownloadURL().then((url) => {
                    setPhoto(url)
                    setLoading1(false)
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const submitAuthorCreate = (data) => {
        swal({
            title: "Chú ý!",
            text: "Bạn có chắc muốn thêm tác giả này ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const { name } = data
                    const value = { name, photo }
                    console.log(value)
                    callApiCreateAuthor(value)
                }
            });

    }


    const submitAuthorUpdate = (e) => {
        e.preventDefault();
        swal({
            title: "Chú ý!",
            text: "Bạn có chắc muốn cập nhật lại thông tin tác giả này ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const id = editAuthor.id
                    const name = editAuthor.name;
                    const value = { id, name, photo }
                    const validateNameAuthor = document.getElementById("name").value
                    if (validateNameAuthor == "") {
                        document.getElementById("errorNameAuthor").innerHTML = " Bạn chưa nhập tên tác giả ! ";
                        return;
                    } else {
                        document.getElementById("errorNameAuthor").innerHTML = ""
                    }
                    callApiUpdateAuthor(value)
                }
            });
    }

    const onClickUpdateAuthor = (value, index) => {
        console.log(value, index);
        setEditAuthor(value)
        setPhoto(value.photo)

    }

    const formInputOnChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        setEditAuthor({
            ...editAuthor,
            [name]: value
        })
    }

    const confirmDeleteAuthor = (e, value) => {
        e.preventDefault();
        swal({
            title: "Chú ý:",
            text: "Bạn có chắc muốn xóa tác giả " + value.name + " ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    callApiDeleteAuthor(value.id)
                } else {

                }
            });
    }

    const callApiAuthor = async () => {
        try {
            setLoadingElm(true)
            const url = `/api/v2/admin/author/sort=${sort}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                setListAuthor(data)
                setAuthorValue(data)
            } else {
                toast.error("Đã xảy ra lỗi ", messageName);
            }
        } catch (error) {
            console.log(error)
        }
        setLoadingElm(false)
    }

    useEffect(() => {
        authorValue.length === 0 ? callApiAuthor() : setListAuthor(authorValue)
    }, [])

    const clickNext = () => {
        if ((page + 1) * size >= listAuthor.length) return
        setPage(page + 1)
    }

    const clickPre = () => {
        if (page == 0) return
        setPage(page - 1)
    }



    return (
        <AdminAuthor
            listAuthor={listAuthor}
            photo={photo}
            loadingElm={loadingElm}
            loading1={loading1}
            errors={errors}
            upImg={upImg}
            upImg1={upImg1}
            register={register}
            handleSubmit={handleSubmit}
            submitAuthorCreate={submitAuthorCreate}
            onClickUpdateAuthor={onClickUpdateAuthor}
            formInputOnChange={formInputOnChange}
            editAuthor={editAuthor}
            submitAuthorUpdate={submitAuthorUpdate}
            confirmDeleteAuthor={confirmDeleteAuthor}
            page={page}
            setSize={setSize}
            size={size}
            clickNext={clickNext}
            clickPre={clickPre}
            onChangeSort={onChangeSort}
            onChangeSearch={onChangeSearch}
            onChangeSwith={onChangeSwith}
        />
    )


}

export default AdminAuthorLogic;
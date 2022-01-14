import AdminProduct from "../../view/product/adminProduct";
import firebase from 'firebase/compat/app';
import { useState, useEffect, useRef } from "react";
import API from "../../../../api/api";
import swal from 'sweetalert';
import { toast } from "react-toastify";
import { productValue, setProductValue } from '../../../../Service/service'

function AdminProductLogic({ setLoading }) {
    const [listProduct, setListProduct] = useState([])
    const [loadingElm, setLoadingElm] = useState(false)
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const typingTimeOut = useRef(null)
    const [productDetail, setProductDetail] = useState({})
    let sort = "createDate"

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const callApiListProduct = async () => {
        setLoadingElm(true)
        try {
            const url = `/api/v2/admin/product/sort=${sort}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                setListProduct(data)
                setProductValue(data)
            } else {
                toast.error("Đã xảy ra lỗi ", messageName);
            }
        } catch (error) {
            console.log(error)
        }
        setLoadingElm(false)
    }

    const onClickDelete = (value) => {
        console.log(value)
        swal({
            title: "Chú ý!",
            text: `Bạn muốn xóa sản phẩm ${value.title !== null ? value.title.name : ""} ${value.name} !!`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    callApiDeleteProduct(value.id)
                } else {
                    toast.error("Xóa không thành công !");
                }
            });
    }

    const callApiDeleteProduct = async (id) => {
        try {
            const url = `/api/v2/admin/product/${id}`
            const response = await API.deleteAdmin(url)
            const { messageName, messageCode } = response
            if (+messageCode === 200) {
                toast.success("Xóa thành công !");
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onChangeSwith = async (id) => {
        swal({
            title: "Chú ý!",
            text: `Bạn muốn thay đổi trạng thái sản phẩm!`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    callApiSetStatus(id)
                } else {
                }
            });
    }

    const callApiSetStatus = async(id)=>{
        setLoading(true)
        try {
            const url = `/api/v2/admin/product-status/${id}`
            const response = await API.putAdmin(url, "")
            const { data, messageName, messageCode } = response
            if (+messageCode === 200) {
                toast.success("Đã thay đổi trạng thái của sản phẩm !");
                let newValue = listProduct.map(elm => {
                    return elm.id == data.id ? data : elm
                })
                setListProduct(newValue)
                setProductValue(newValue)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    // const ok = () => {
    //     let newV = listProduct.sort((p1,p2)=>{
    //         return p1.id-p2.id
    //     })
    //     setListProduct(newV)
    // }

    useEffect(() => {
        productValue.length === 0 ? callApiListProduct() : setListProduct(productValue)
    }, [])

    const clickNext = () => {
        if ((page + 1) * size > listProduct.length) return
        setPage(page + 1)
    }

    const clickPre = () => {
        if (page == 0) return
        setPage(page - 1)
    }

    const onChangeSort = (e) => {
        const {value} = e.target
        sort = value
        callApiListProduct()
    }
    

    const onChangeSearch = (e, data) => {
        const { value } = e.target
        if (typingTimeOut.current) {
            clearTimeout(typingTimeOut.current);
        }
        typingTimeOut.current = setTimeout(() => {
            callApiSearchProduct(value)
        }, 400)
    }

    const callApiSearchProduct = async(keyword) => {
        try {
            const url = `/api/v2/admin/product/sort=${sort}/search=${keyword}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                setListProduct(data)
            } else {
                toast.error("Đã xảy ra lỗi ", messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onClickUpdate = (e,value) =>{
        e.preventDefault()
        setProductDetail(value)
        handleOpen()
    }

    return (
        <AdminProduct
            listProduct={listProduct} onChangeSort={onChangeSort} setListProduct={setListProduct}
            onClickDelete={onClickDelete} size={size} onClickUpdate={onClickUpdate}
            loadingElm={loadingElm} page={page} onChangeSearch={onChangeSearch}
            onChangeSwith={onChangeSwith} setSize={setSize}
            setLoading={setLoading} clickNext={clickNext} clickPre={clickPre}
            productDetail={productDetail} 
            open={open} setOpen={setOpen}
            handleOpen={handleOpen} handleClose={handleClose}
        />
    )
}

export default AdminProductLogic;
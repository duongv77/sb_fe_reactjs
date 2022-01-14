import AdminPromotion from "../../view/promotion/adminPromotion";
import { useState, useEffect ,useRef } from "react"
import API from "../../../../api/api"
import { toast } from "react-toastify";
import { promotionValue, setPromotionValue } from '../../../../Service/service'
import { useHistory } from "react-router";
import swal from 'sweetalert';
import { useForm } from "react-hook-form";


function AdminPromotionLogic({ setLoading }) {
    const history = useHistory()
    const [listPromotion, setListPromotion] = useState([])
    const [loadingElm, setLoadingElm] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const typingTimeOut = useRef(null)
    let sort = "createDate"
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const callApiGetListPromotion = async () => {
        try {
            setLoadingElm(true)
            const url = `/api/v2/admin/promotion/sort=${sort}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            setPromotionValue(data)
            setLoadingElm(false)
            if (+messageCode === 200) {
                setListPromotion(data)
            } else {
                toast.error("Đã xảy ra lỗi: " + messageName);
            }
        } catch (error) {
            setLoadingElm(false)
            console.log(error)
        }
    }

    const push = (value) => {
        history.push(`/admin/promotion/${value.id}`)
    }

    const onClickDeletePromotion = (e, id) => {
        e.stopPropagation();
        swal({
            title: "Chú ý !",
            text: "Bạn muốn dừng chương trình này ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    callApiDeletePromotion(id)
                } else {
                    toast.warning("Xóa không thành công !!")
                }
            });
    }

    const callApiDeletePromotion = async (id) => {
        setLoading(true)
        try {
            const url = `/api/v2/admin/stop/${id}`
            const response = await API.putAdmin(url)
            const { messageCode, messageName , data} = response
            if (+messageCode === 200) {
                setListPromotion(oldValue=>{
                    const newValue = oldValue.map(elm=>{
                        return elm.id == id ? data: elm
                    })
                    return newValue;
                })
                toast.success("Đã dừng chương trình!!")
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const onClickPausePromotion = (e, value) => {
        e.stopPropagation();
        swal({
            title: "Chú ý !",
            text: "Bạn muốn tạm dừng chương trình này ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    callApiPausePromotion(value.id)
                } else {
                    toast.warning("Dừng chương trình không thành công !!")
                }
            });
    }

    const callApiPausePromotion = async (id) => {
        try {
            const url = `/api/v2/admin/pause/${id}`
            const response = await API.putAdmin(url, "")
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                let newValue = promotionValue.map(elm => {
                    return elm.id === id ? data : elm
                })
                setListPromotion(newValue)
                setPromotionValue(newValue)
                toast.success("Đã tạm dừng chương trình!");
            } else {
                toast.error("Đã xảy ra lỗi: " + messageName);
            }
        } catch (error) {

        }
    }

    const onClickPlayPromotion = (e, value) => {
        e.stopPropagation();
        swal({
            title: "Chú ý !",
            text: "Bạn muốn khởi động lại chương trình này ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    callApiPlayPromotion(value.id)
                } else {
                    toast.warning("Khởi động lại chương trình không thành công !!")
                }
            });
    }

    const callApiPlayPromotion = async (id) => {
        try {
            const url = `/api/v2/admin/play/${id}`
            const response = await API.putAdmin(url, "")
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                let newValue = promotionValue.map(elm => {
                    return elm.id === id ? data : elm
                })
                setListPromotion(newValue)
                setPromotionValue(newValue)
                toast.success("Chương trình đã hoạt động!");
            } else {
                toast.error("Đã xảy ra lỗi: " + messageName);
            }
        } catch (error) {

        }
    }
    const onSubmit = (data) => {
        const { endDate, createDate, description, saleStr, name } = data
        const sale = Number(saleStr)
        const value = { name, endDate, createDate, description, sale }
        const timeDiff = ((new Date(endDate)) - (new Date(createDate))) / (1000 * 60 * 60 * 24);
        if (timeDiff < 0) {
            toast.error("Ngày kết thúc phải sau ngày bắt đầu !");
            return;
        }
        callApiCreatePromotion(value)
    }

    const callApiCreatePromotion = async (value) => {
        try {
            const url = "/api/v2/admin/promotion"
            const response = await API.postAdmin(url, value)
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                setListPromotion([...listPromotion, data])
                setPromotionValue([...promotionValue, data])
                toast.success("Chương trình " + data.name + " đã được tạo !");
                document.getElementById('promotion').reset()

                handleClose()
            }else{
                toast.error("Lỗi: " +messageName);
            }
        } catch (error) {

        }
    }
    const clickNext = () => {
        if ((page + 1) * size >= listPromotion.length) return
        setPage(page + 1)
    }

    const clickPre = () => {
        if (page == 0) return
        setPage(page - 1)
    }

    useEffect(() => {
        promotionValue.length === 0 ? callApiGetListPromotion() : setListPromotion(promotionValue)
    }, [])

    const onChangeSort = (e) => {
        const {value} = e.target
        sort = value
        callApiGetListPromotion()
    }
    

    const onChangeSearch = (e, data) => {
        const { value } = e.target
        if (typingTimeOut.current) {
            clearTimeout(typingTimeOut.current);
        }
        typingTimeOut.current = setTimeout(() => {
            callApiSearchPromotion(value)
        }, 400)
    }

    const callApiSearchPromotion = async(keyword) => {
        try {
            const url = `/api/v2/admin/promotion/sort=${sort}/search=${keyword}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                setListPromotion(data)
            } else {
                toast.error("Đã xảy ra lỗi ", messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AdminPromotion listPromotion={listPromotion} loadingElm={loadingElm}
            push={push}
            onClickDeletePromotion={onClickDeletePromotion}
            onClickPausePromotion={onClickPausePromotion}
            onClickPlayPromotion={onClickPlayPromotion}
            onSubmit={onSubmit}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            page={page}
            setSize={setSize}
            size={size}
            clickNext={clickNext}
            clickPre={clickPre}
            onChangeSearch={onChangeSearch}
            onChangeSort={onChangeSort}
            onSubmit={onSubmit} handleOpen={handleOpen} handleClose={handleClose}
            register={register} 
            handleSubmit={handleSubmit} 
            errors={errors} open={open} setOpen={setOpen}
        />
    )
}

export default AdminPromotionLogic; 
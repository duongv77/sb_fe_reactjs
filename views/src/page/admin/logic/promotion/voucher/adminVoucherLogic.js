import AdminVoucher from "../../../view/promotion/voucher/adminVoucher";
import API from "../../../../../api/api"
import { toast } from "react-toastify";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import swal from 'sweetalert';

function AdminVoucherLogic() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [listVoucher, setListVoucher] = useState([])
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const typingTimeOut = useRef(null)
    let sort = "createDate"

    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const callApiGetListVoucher = async () => {
        try {
            const url = `/api/v2/admin/voucher/find-all/sort=${sort}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setListVoucher(data)
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onChangeSort = (e) => {
        const { value } = e.target
        sort = value
        callApiGetListVoucher()
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

    const callApiSearchProduct = async (keyword) => {
        try {
            const url = `/api/v2/admin/voucher/sort=${sort}/search=${keyword}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                setListVoucher(data)
            } else {
                toast.error("Đã xảy ra lỗi ", messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = (value) => {
        swal({
            title: "Chú ý?",
            text: "Bạn muốn tạo mã giảm giá " + value.voucherCode.toUpperCase()
                + "\nThời gian: " + value.startDate + " - " + value.endDate
            ,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const data = {
                        voucherCode: value.voucherCode.toUpperCase(),
                        productQuantity: +value.quantityProduct,
                        totalPrice: +value.totalPrice,
                        orderQuantity: +value.orderQuantity,
                        startDate: value.startDate + " 00:00:00",
                        endDate: value.endDate + " 00:00:00",
                        salePercent: +value.salePercent==0?null:+value.salePercent,
                        salePrice: +value.salePrice==0?null:+value.salePrice
                    }
                    console.log(data)
                    callApiCreateVoucher(data)
                } else {
                }
            });
    }

    const callApiCreateVoucher = async (value) => {
        try {
            const url = `/api/v2/admin/voucher`
            const response = await API.postAdmin(url, value)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setListVoucher([...listVoucher, data])
                toast.success("Đã thêm voucher!")
                handleClose()
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiStopVoucher = async (id) => {
        try {
            const url = `/api/v2/admin/voucher/stop-voucher/${id}`
            const response = await API.putAdmin(url, null)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setListVoucher(oldValue => {
                    const newValue = oldValue.map(elm => {
                        return elm.id == id ? data : elm
                    })
                    return newValue
                })
                toast.success("Đã thay đổi trạng thái!")
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiStartVoucher = async (id) => {
        try {
            const url = `/api/v2/admin/voucher/start-voucher/${id}`
            const response = await API.putAdmin(url, null)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setListVoucher(oldValue => {
                    const newValue = oldValue.map(elm => {
                        return elm.id == id ? data : elm
                    })
                    return newValue
                })
                toast.success("Đã thay đổi trạng thái!")
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiPauseVoucher = async (id) => {
        try {
            const url = `/api/v2/admin/voucher/pause-voucher/${id}`
            const response = await API.putAdmin(url, null)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setListVoucher(oldValue => {
                    const newValue = oldValue.map(elm => {
                        return elm.id == id ? data : elm
                    })
                    return newValue
                })
                toast.success("Đã thay đổi trạng thái!")
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onClickStop = (value) => {
        swal({
            title: "Chú ý!",
            text: `Bạn muốn kết thúc mã giảm giá ${value.voucherCode}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    callApiStopVoucher(value.id)
                } else {
                }
            });
    }
    const onClickStart = (value) => {
        swal({
            title: "Chú ý!",
            text: `Bạn muốn bắt đầu mã giảm giá ${value.voucherCode}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    callApiStartVoucher(value.id)
                } else {
                }
            });
    }
    const onClickPause = (value) => {
        swal({
            title: "Chú ý!",
            text: `Bạn muốn tạm dừng mã giảm giá ${value.voucherCode}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    callApiPauseVoucher(value.id)
                } else {
                }
            });
    }

    useEffect(() => {
        callApiGetListVoucher()
    }, [])

    const clickNext = () => {
        if ((page + 1) * size >= listVoucher.length) return
        setPage(page + 1)
    }

    const clickPre = () => {
        if (page == 0) return
        setPage(page - 1)
    }

    return (
        <AdminVoucher
            listVoucher={listVoucher} open={open} handleOpen={handleOpen} handleClose={handleClose}
            register={register} handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmit}
            onClickStop={onClickStop} onClickStart={onClickStart} onClickPause={onClickPause}
            page={page}
            setSize={setSize}
            size={size}
            clickNext={clickNext}
            clickPre={clickPre}
            onChangeSearch={onChangeSearch}
            onChangeSort={onChangeSort}
        />
    )
}

export default AdminVoucherLogic
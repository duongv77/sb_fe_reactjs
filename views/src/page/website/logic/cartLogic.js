import Cart from "../view/cart";
import API from "../../../api/api";
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { toast } from "react-toastify";
import { useRef } from "react";

function CartLogic({setLoading}) {
    const [productCart, setProductCart] = useState([])
    const [account, setAccount] = useState([])
    const [listAddress, setListAddress] = useState([])
    const [listCartCheckbox, setlistCartCheckbox] = useState([])
    const [title, setTitle] = useState([])
    const typingTimeOut = useRef(null)
    const [mainAddress, setMainAddress] = useState("")
    const [total, setTotal] = useState(0)
    const [totalChildren, setTotalChildren] = useState(0)
    const [shipping, setShipping] = useState(0);
    const [datcoc, setDatcoc] = useState(0);
    const [voucherCode, setVoucherCode]=useState("")
    const [listVoucher, setListVoucher] = useState([])
    const [orderQuantityHistory, setOrderQuantityHistory] = useState(0)

    const [loadingElm, setLoadingElm] = useState(false)
    
    const [open, setOpen] = useState(false)
    const [openModalChildren, setOpenModalChildren] = useState(false)
    const [openOrder, setOpenOrder] = useState(false)

    const [productInCart, setProductInCart] = useState(0)

    const handleOpenOrder = (e) => {
        e.preventDefault()
        if( mainAddress==null){
            toast.error("Chưa có địa chỉ!")
            return
        }
        if(listCartCheckbox.length==0){
            toast.error("Chưa chọn sản phẩm thanh toán!")
            return
        }
        setOpenOrder(true)
    };

    const handleCloseOrder = () => {
        setOpenOrder(false);
    };

    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const callApiCart = async () => {
        setLoadingElm(true)
        try {
            const url = "/api/v2/user/cartdetail"
            const response = await API.getAdmin(url);
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setProductCart(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
        setLoadingElm(false)
    }

    const callApititle = async () => {
        try {
            const url = "/api/v1/title"
            const response = await API.get(url);
            setTitle(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        callApiCart()
        callApiAccount()
        callApititle()
    }, [])

    useEffect(()=>{
        let totalProduct = 0
        productCart.map(value=>{
            totalProduct += value.cartdetail.quantity
        })
        setProductInCart(totalProduct)
    },[productCart])

    const callApiAccount = async () => {
        try {
            const url = "/api/v2/user"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (+messageCode === 200) {
                setAccount(data)
                setMainAddress(data.mainAddress)
                if (data.address.length > 0) {
                    let { address } = data
                    const addressCustom = {
                        id: 0,
                        address: data.mainAddress==null? "": data.mainAddress
                    }
                    let valueN = [...address, addressCustom]
                    console.log(valueN)
                    setListAddress(valueN)
                }
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

 
  
    const callApiCreateOrder = async (value) => {
        try {
            const url = "/api/v2/user/order"
            const response = await API.postAdmin(url, value)
            const { messageCode, messageName , data} = response
            if (+messageCode === 200) {
                toast.success("Đã tạo hóa đơn thành công. Vui lòng đợi cửa hàng xác nhận !");
                setProductCart(data)
                setlistCartCheckbox([])
                handleCloseOrder()
                handleClose()
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    const onClickOrder = (e) => {
        e.preventDefault()
        if(mainAddress==null){
            toast.error("Bạn chưa có địa chỉ. Vui lòng thêm địa chỉ để tiếp tục mua hàng!");
            return 
        }
        if(account.phone==null){
            toast.error("Bạn chưa có số điện thoại. Vui lòng thêm số điện thoại để tiếp tục mua hàng!");
            return 
        }
        if(listCartCheckbox.length==0){
            toast.error("Bạn chưa chọn sản phẩm nào để đặt hàng!");
            return
        }
        const address = account.mainAddress
        let listCartdetailFinal=[]
        listCartCheckbox.forEach(elm=>{
            const {cartdetail} = elm
            listCartdetailFinal = [...listCartdetailFinal,cartdetail]
        })
        const value = { address: mainAddress, cartdetail: listCartdetailFinal, voucherCode}
        console.log(value)
        callApiCreateOrder(value)
    }

    const callApiUpdateQuantityCartdetail = async (value) => {
        try {
            console.log(value)
            const url = "/api/v2/user/cartdetail/quantity"
            const response = await API.putAdmin(url, value)
            const { messageCode, messageName, data } = response
            if (messageCode == 200) {
                setProductCart(oldValue => {
                    let newValue = oldValue.map(elm => {
                        return elm.cartdetail.id === data.cartdetail.id ? data : elm
                    })
                    return newValue;
                })
                setlistCartCheckbox(oldValue => {
                    let newValue = oldValue.map(elm => {
                        return elm.cartdetail.id === data.cartdetail.id ? data : elm
                    })
                    return newValue;
                })
                // toast.success("Cập nhập số lượng thành công!");
            } else {
                toast.error( messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onChangeQuantity = (e, data) => {
        e.stopPropagation()
        const { value } = e.target
        if(value<=0){
            swal({
                title: "Chú ý !",
                text: "Bạn muốn xóa sản phẩm khỏi giỏ hàng ?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    callApiDeleteCartDetail(data.id)
                    return
                } else {
                    return
                }
            });
        }else{
            const dataUpdate = {
                id: Number = data.id,
                quantity: Number = +value
            }
            callApiUpdateQuantityCartdetail(dataUpdate)
        }
        // if (typingTimeOut.current) {
        //     clearTimeout(typingTimeOut.current);
        // }
        // typingTimeOut.current = setTimeout(() => {
            
        // }, 400)
    }

    const onClickCheckbox = (e, value) => {
        const { checked } = e.target

        if (checked === true) {
            setlistCartCheckbox([
                ...listCartCheckbox,
                value
            ])
        } else {
            setlistCartCheckbox((oldValue) => {
                let newValue = oldValue.filter(elm => {
                    return elm.cartdetail.id !== value.cartdetail.id
                })
                return newValue
            })
        }

    }

    const onChangeAddress = (value) => {
        setMainAddress(value)
        toast.success("Đã đổi địa chỉ giao hàng");
    }

    useEffect(() => {
        tinhTong()
    }, [listCartCheckbox,shipping])

    const tinhTong = () => {
        let tong = 0;
        listCartCheckbox.map(value => {
            const { cartdetail, sale } = value
            const { product, quantity } = cartdetail
            const { price } = product
            let prices = price * quantity
            prices = sale === null? prices : prices*(1-sale/100) 
            tong += prices
        })
        setTotal(tong )

        setTotalChildren(tong / 100 * 110 + shipping)
    }

    const callApiDeleteCartDetail = async (id) => {
        //setLoading(true)
        try {
            const url = `/api/v2/user/cartdetail/${id}`
            const response = await API.deleteAdmin(url)
            const {messageName , messageCode} = response 
            if(+messageCode===200){
                toast.success("Xoá sản phẩm thành công !");
                setProductCart(oldValue => {
                    let newValue = oldValue.filter(elm => {
                        return elm.cartdetail.id !== id 
                    })
                    return newValue;
                })
                setlistCartCheckbox([])
            }else{
                toast.error(messageName);
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi ");
        }
        //setLoading(false)
    }

    

    const deleteCart = (id) => {
        //e.stopPropagation();
        swal({
            title: "Chú ý !",
            text: "Bạn muốn xóa sản phẩm khỏi giỏ hàng ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                callApiDeleteCartDetail(id)
            } else {
                toast.warning("Xóa không thành công !!")
            }
        });
    }

    useEffect(()=>{
        if(mainAddress!==null){
            checkAddress(mainAddress) ? setShipping(20000) : setShipping(30000)
        }else{
            setShipping(0)
        }
    }, [mainAddress])

    const checkAddress=(string)=>{
        let check = false
        const HN = "HÀ NỘI"
        if(string==null) return check
        const stringToCase = string.toUpperCase()
        for(var i=0; i<string.length; i++){
            if(stringToCase.charAt(i)=="H"){
                if(stringToCase.slice(i, i+7).trim()==="HÀ NỘI") check=true
            }
        }
        return check
    }

    useEffect(()=>{
        if(checkAddress(mainAddress)){
            if(total<=80000){
                setDatcoc(0)
            }else if(total<=200){
                let datCocvalue = (total+shipping)*0.2
                setDatcoc(datCocvalue)
            }else{
                let datCocvalue = (total+shipping)*0.15
                setDatcoc(datCocvalue)
            }
        }else{
            if(total<=200){
                let datCocvalue = (total+shipping)*0.3
                setDatcoc(datCocvalue)
            }else{
                let datCocvalue = (total+shipping)*0.15
                setDatcoc(datCocvalue)
            }
        }
    },[total, shipping])

    useEffect(()=>{
        callApiListVoucher()
        callApiGetOrderQuantityHistory()
    },[])

    const onClickCheckBoxAddAllCart = (e) => {
        const {checked} = e.target 
        if(checked){
            setlistCartCheckbox(productCart)
        }else{
            setlistCartCheckbox([])
        }
    }

    // tổng tất cả bao gồm phí ship và VAT
    const totalAll = () => {
        return total / 100 * 110 + shipping
    }

    const callApiGetOrderQuantityHistory = async(value) => {
        try {
            const url = `/api/v2/user/order/quantity-order/history`
            const response = await API.getAdmin(url, value)
            const {messageName , messageCode, data} = response 
            if(messageCode==200){
                setOrderQuantityHistory(data)
                console.log(data)
            }else{
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }


    const callApiApplyVoucherCode = async(value) => {
        setLoading(true)
        try {
            const url = `/api/v2/user/voucher/apply-voucher`
            const response = await API.postAdmin(url, value)
            const {messageName , messageCode, data} = response 
            if(messageCode==200){
                applyVoucherToTotal(data)
                document.getElementById('inputCode').style.color = "green"
                toast.success("Đã áp dụng mã giảm giá")
            }else{
                setTotalChildren(totalAll)
                toast.error(messageName);
                document.getElementById('inputCode').style.color = "red"
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const applyVoucherToTotal = (value) => {
        const {salePercent,salePrice} = value
        if(salePercent!=null){
            const newTotal = totalAll() / 100 * (100-salePercent)
            setTotalChildren(newTotal)
        }else{
            const newTotal = totalAll() - salePrice
            setTotalChildren(newTotal)
        }
    }

    const onClickApply = () => {
        if(voucherCode.trim()=="") return
        const value = {
            voucherCode: voucherCode.trim(),
            total: total,
            quantity: quantityTotalOrder()
        }
        callApiApplyVoucherCode(value)
    }

    const quantityTotalOrder = () => {
        let quantityTotal = 0
        listCartCheckbox.map(elm=>{
            const {quantity} = elm.cartdetail
            quantityTotal += quantity
        })
        return quantityTotal
    }

    const callApiListVoucher = async()=>{
        try {
            const url = `/api/v1/voucher/find-all`
            const response = await API.getAdmin(url)
            const {messageName , messageCode, data} = response 
            if(messageCode==200){
                setListVoucher(data)
            }else{
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onClickVoucher = (value) => {
        setLoading(true)
        setVoucherCode(value.voucherCode)
        const data = {
            voucherCode: value.voucherCode,
            total: total,
            quantity: quantityTotalOrder()
        }
        callApiApplyVoucherCode(data)
        setOpenModalChildren(false)
        setLoading(false)
    }


    return (
        <Cart productCart={productCart}
            account={account} listVoucher={listVoucher}
            listAddress={listAddress} onClickVoucher={onClickVoucher}
            onClickOrder={onClickOrder}
            title={title} onClickApply={onClickApply}
            onChangeQuantity={onChangeQuantity}
            onClickCheckbox={onClickCheckbox}
            open={open} handleOpen={handleOpen} handleClose={handleClose}
            total={total} setVoucherCode={setVoucherCode} voucherCode={voucherCode}
            deleteCart={deleteCart} totalChildren={totalChildren}
            onClickCheckBoxAddAllCart={onClickCheckBoxAddAllCart}
            total={total} mainAddress={mainAddress}
            shipping= {shipping} onChangeAddress={onChangeAddress}
            datcoc={datcoc} listCartCheckbox={listCartCheckbox}
            openModalChildren={openModalChildren} setOpenModalChildren={setOpenModalChildren}
            handleOpenOrder={handleOpenOrder} openOrder={openOrder} handleCloseOrder={handleCloseOrder}
            loadingElm={loadingElm} orderQuantityHistory={orderQuantityHistory} productInCart={productInCart}
        />
    )
}

export default CartLogic;
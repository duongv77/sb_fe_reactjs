import Product from "../view/product";
import firebase from 'firebase/compat/app';
import { useState, useEffect ,useRef} from "react";
import API from "../../../api/api";
import {  useHistory } from "react-router-dom";
import swal from 'sweetalert';
import { toast } from "react-toastify";


function ProductLogic() {
    const [listProduct, setListProduct] = useState([])
    const [photo, setPhoto] = useState(undefined)
    const [listLanguage, setListLanguage] = useState([])
    const [listNxb, setListNxb] = useState([])
    const [listCate, setListCate] = useState([])
    const [size, setSize] = useState(12)
    const [page, setPage] = useState(1)
    const history = useHistory()
    const [listSqlCate, setListSqlCate] = useState([])
    const [listSqlPrice, setListSqlPrice] = useState([])
    const [listSqlNxb, setListSqlNxb] = useState([])
    const [listSqlLanguage, setListSqlLanguage] = useState([])
    const [listSqlForm, setListSqlForm] = useState([])
    const typingTimeOut = useRef(null)

    let sort = ""

    const callApiListCate = async () => {
        try {
            const url = "/api/v1/category/list-cate/lv2"
            const response = await API.get(url)
            const {data, messageCode, messageName} = response
            if(messageCode==200){
                setListCate(data)
            }else{
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
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
            const url = `/api/v1/product-and-sale/search=${keyword}`
            const response = await API.get(url)
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

    const callApiListProduct = async () => {
        try {
            const url = "/api/v1/product-and-sale"
            const response = await API.get(url)
            const {data, messageCode, messageName} = response
            if(messageCode==200){
                setListProduct(data)
            }else{
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiListLanguage = async () => {
        try {
            const url = "/api/v1/product/find-list-Language"
            const response = await API.get(url)
            const {data, messageCode, messageName} = response
            if(messageCode==200){
                setListLanguage(data)
            }else{
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiListNxb = async () => {
        try {
            const url = "/api/v1/product/find-list-nxb"
            const response = await API.get(url)
            const {data, messageCode, messageName} = response
            if(messageCode==200){
                setListNxb(data)
            }else{
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        callApiListLanguage()
        callApiListProduct()
        callApiListNxb()
        callApiListCate()
    }, [])

    const upImg = () => {
        try {
            const file = document.getElementById('img').files[0]
            let storagerRef = firebase.storage().ref(`images/${file.name}`);
            storagerRef.put(file).then(function () {
                storagerRef.getDownloadURL().then((url) => {
                    setPhoto(url)
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const callApiAddProductToCart = async(id) => {
        try {
            const url = `/api/v2/user/addtocart/product/${id}`
            const response = await API.getAdmin(url)
            const {messageName , messageCode} = response 
            if(+messageCode===200){
                toast.success("Sản phẩm đã được thêm vào giỏ hàng !");
            }else{
                toast.error(messageName);
            }
        } catch (error) {
            toast.error("Thêm vào giỏ hàng thất bại !");
        }
    }

    const onClickAddCart =(e, id)=>{
        e.preventDefault()
        const userLogin = localStorage.getItem("AccountToken")
        if(userLogin === null) {
            toast.error("Bạn chưa đăng nhập. Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
            history.replace("/login")
        } else {
            callApiAddProductToCart(id)
        }
    }

    const showAll = () => {
        setSize(10100*1000)
        setPage(1)
    }

    const onChangeSort = (e) => {
        const {value} = e.target
        sort=value
        callApiListProductSort(value)
    }

    const onChangeCheckBoxCate = (checked, value) => {
        if(checked){
            setListSqlCate([...listSqlCate, value])
        }else{
            setListSqlCate(oldValue=>{
                const newVl = oldValue.filter(elm=>{
                    return elm.id!==value.id
                })
                return newVl
            })
        }
    }

    const onChangeCheckboxPrice = (checked, value) => {
        if(checked){
            setListSqlPrice([...listSqlPrice, value])
        }else{
            setListSqlPrice(oldValue=>{
                const newVl = oldValue.filter(elm=>{
                    return elm.id!==value.id
                })
                return newVl
            })
        }
    }

    const onChangeCheckboxNxb = (checked, value) => {
        if(checked){
            setListSqlNxb([...listSqlNxb, value])
        }else{
            setListSqlNxb(oldValue=>{
                const newVl = oldValue.filter(elm=>{
                    return elm.id!==value.id
                })
                return newVl
            })
        }
    }

    const onChangeCheckboxLanguage = (checked, value) => {
        if(checked){
            setListSqlLanguage([...listSqlLanguage, value])
        }else{
            setListSqlLanguage(oldValue=>{
                const newVl = oldValue.filter(elm=>{
                    return elm.id!==value.id
                })
                return newVl
            })
        }
    }

    const onChangeCheckboxForm = (checked, value) => {
        if(checked){
            setListSqlForm([...listSqlForm, value])
        }else{
            setListSqlForm(oldValue=>{
                const newVl = oldValue.filter(elm=>{
                    return elm.id!==value.id
                })
                return newVl
            })
        }
    }

    const totalSqlCate = () => {
        var sql = ""
        listSqlCate.map((elm, index)=>{
            if(index==0){
                sql = sql + elm.sql 
            }else{
                sql = sql + " or " + elm.sql 
            }
        })
        return sql
    }

    const totalSqlPrice = () => {
        var sql = ""
        listSqlPrice.map((elm, index)=>{
            if(index==0){
                sql = sql + elm.sql 
            }else{
                sql = sql + " or " + elm.sql 
            }
        })
        return sql
    }

    const totalSqlNxb = () => {
        var sql = ""
        listSqlNxb.map((elm, index)=>{
            if(index==0){
                sql = sql + elm.sql 
            }else{
                sql = sql + " or " + elm.sql 
            }
        })
        return sql
    }

    const totalSqlLanguage = () => {
        var sql = ""
        listSqlLanguage.map((elm, index)=>{
            if(index==0){
                sql = sql + elm.sql 
            }else{
                sql = sql + " or " + elm.sql 
            }
        })
        return sql
    }

    const totalSqlForm = () => {
        var sql = ""
        listSqlForm.map((elm, index)=>{
            if(index==0){
                sql = sql + elm.sql 
            }else{
                sql = sql + " or " + elm.sql 
            }
        })
        return sql
    }

    useEffect(()=>{
        let sql = "where "
        if(listSqlCate.length>0){
            sql += " ( " + totalSqlCate() +" ) "
        }

        if(listSqlPrice.length>0 && listSqlCate.length>0){
            sql = sql +  " and "+ " ( "  + totalSqlPrice()+" ) "
        }else if(listSqlPrice.length>0 && listSqlCate.length==0){
            sql = sql + " ( "  + totalSqlPrice()+" ) "
        }

        if(listSqlPrice.length==0 && listSqlCate.length==0){
            if(listSqlNxb.length>0){
                sql = sql + " ( "  + totalSqlNxb()+" ) "
            }
        }else{
            if(listSqlNxb.length>0)
                sql =  sql +  " and "+ " ( "  + totalSqlNxb()+" ) "
        }

        if(listSqlPrice.length==0 && listSqlCate.length==0 && listSqlNxb==0){
            if(listSqlLanguage.length>0){
                sql = sql + " ( "  + totalSqlLanguage()+" ) "
            }
        }else{
            if(listSqlLanguage.length>0){
                sql = sql +  " and "+ " ( "  + totalSqlLanguage()+" ) "
            }
        }

        if(listSqlPrice.length==0 && listSqlCate.length==0 && listSqlNxb==0 && listSqlLanguage.length==0){
            if(listSqlForm.length>0){
                sql = sql + " ( "  + totalSqlForm()+" ) "
            }
        }else{
            if(listSqlForm.length>0){
                sql = sql +  " and "+ " ( "  + totalSqlForm()+" ) "
            }
        }

        const value = {
            photo: sql
        }

        if(sql!="where "){
            console.log(value)
            callApiSearchFormProduct(value)
        }else {
            callApiSearchFormProduct({photo: ""})
        }
        setPage(1)
    }, [listSqlCate, listSqlPrice, listSqlNxb, listSqlLanguage, listSqlForm])


    const callApiSearchFormProduct = async(value)=>{
        try {
            const url = `/api/v1/product/search-form-custom`
            const response = await API.post(url,value)
            const { data, messageCode, messageName } = response
            if(messageCode == 200) {
                setListProduct(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiListProductSort = async (sort) => {
        try {
            const url = `/api/v1/product/sort=${sort}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if(messageCode == 200) {
                setListProduct(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onClickFavorite = (e, id) => {
        e.preventDefault()
        const account = JSON.parse(localStorage.getItem("AccountToken"))
        if(account==undefined||null){
            toast.error("Bạn chưa đăng nhập. Vui lòng đăng nhập để thực hiện chức năng này!")
            return
        }
        const value = {
            productId: +id
        }
        callApiCreateFavorite(value)
    }

    const callApiCreateFavorite = async(value) => {
        try {
            const url = "/api/v2/user/favorite-create"
            const response = await API.postAdmin(url, value)
            const { messageCode, messageName} = response
            if(messageCode==200){
                toast.success("Đã thêm vào danh sách yêu thích!")
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Product
            listProduct={listProduct}
            photo={photo} listNxb={listNxb}
            upImg={upImg} listLanguage={listLanguage}
            onClickAddCart={onClickAddCart} onChangeSort={onChangeSort}
            listCate={listCate} size={size} setSize={setSize}
            setPage={setPage} page={page} showAll={showAll}
            onChangeCheckBoxCate={onChangeCheckBoxCate}
            onChangeCheckboxPrice={onChangeCheckboxPrice} onChangeCheckboxNxb={onChangeCheckboxNxb}
            onChangeCheckboxLanguage={onChangeCheckboxLanguage} onChangeCheckboxForm={onChangeCheckboxForm}
            onChangeSearch={onChangeSearch} onClickFavorite={onClickFavorite}
        />
    )
}

export default ProductLogic;
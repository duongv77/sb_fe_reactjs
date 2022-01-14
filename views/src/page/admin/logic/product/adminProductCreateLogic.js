import firebase from 'firebase/compat/app';
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import AdminProductCreate from '../../view/product/adminProductCreate';
import API from '../../../../api/api';
import { toast } from "react-toastify";
import { productValue, setProductValue } from '../../../../Service/service'
import { useHistory } from 'react-router';
import swal from 'sweetalert';
function AdminProductCreateLogic(props) {
    const history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [image, setImage] = useState(undefined)
    const [listTitle, setListTitle] = useState([])
    const [listAuthor, setListAuthor] =  useState([])
    const [listCate, setListCate] =  useState([])
    const [listCateDetails, setListCateDetails] =  useState([{ id:14, name:"Không xác định" }])
    const [listRegion, setListRegion] = useState([])
    const [loadingElm, setLoadingElm] = useState(false)

    const callApiListTitle = async() => {
        try {
            const url = "/api/v1/title"
            const response = await API.get(url)
            setListTitle(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const callApiListAuthor = async() => {
        try {
            const url = "/api/v2/admin/author"
            const response = await API.getAdmin(url)
            setListAuthor(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const callApiListCate = async() => {
        try {
            const url = "/api/v1/category_big"
            const response = await API.get(url)
            const {categories} = response.data[0]
            setListCate(categories)
        } catch (error) {
            
        }
    }
    const callApiListCateDetail = async(id) => {
        try {
            const url = `/api/v1/category/detail/${id}`
            const response = await API.get(url)
            const {categories} = response.data[0]
            setListCateDetails(categories)
        } catch (error) {
            console.log(error)
        }
    }

    const onChangCate = (e) =>{
        const {value} = e.target
        console.log(value)
        callApiListCateDetail(value)
    }

    const callApiCreateProduct = async(value) => {
        console.log(value)
        props.setLoading(true)
        try {
            const url = `/api/v2/admin/product`
            const response = await API.postAdmin(url, value)
            props.setLoading(false)
            const {data, messageCode, messageName} = response
            if(+messageCode === 200){
                toast.success('Thêm sản phẩm thành công!');
                setProductValue([...productValue, data])
                history.push("/admin/product")
            }else{
                toast.error(messageName);
            }
            console.log(response)
        } catch (error) {
            props.setLoading(false)
        }
    }

    useEffect(() => {
        callApiListTitle()
        callApiListAuthor()
        callApiListCate()
        callApiRegion()
    }, [])

    const upImg = () => {
        setLoadingElm(true)
        try {
            const file = document.getElementById('img').files[0]
            let storagerRef = firebase.storage().ref(`images/${file.name}`);
            storagerRef.put(file).then(function () {
                storagerRef.getDownloadURL().then((url) => {
                    setImage(url)
                    setLoadingElm(false)
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    
    const callApiRegion = async() => {
        try {
            const url = "/api/v1/region"
            const response = await API.get(url)
            setListRegion(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    const onSubmitCreateProduct = (data) => {
        const cate = document.getElementById("cate").value
        const cateFinal = cate!==""?JSON.parse(cate):{ id:14, name:"Không xác định" }
        let categorie = listCateDetails.filter(elm=>{return elm.id == data.categorie})[0];
        categorie = categorie === undefined ? cateFinal : categorie

        let region = listRegion.filter(elm=>{return elm.id == data.region})[0]
        region = region === undefined ? listRegion[0]:region
        let title = data.title === "Trống"?null: JSON.parse(data.title)
        let author = listAuthor.filter(elm=>{return elm.id == data.authorStr})[0]
        author = author === undefined ? listAuthor[0] : author
        const productObjValue = { name:data.name, price: +data.price, numberpages:+data.numberpages, form: data.form, title:title, publishyear:+data.publishyear, quantity: +data.quantity, 
            region: region , categorie:categorie , language:data.language, author: author, publisher: data.publisher, supplier: data.supplier,description:data.description, image: image
        }
        console.log(productObjValue)
        confirmCreateProduct(productObjValue)
    }

    const confirmCreateProduct = (productObjValue) => {
        swal({
            title: "Chú ý !",
            text: "Bạn muốn thêm sản phẩm mới !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                callApiCreateProduct(productObjValue)
            } else {
            }
          });
    }


    return (
        <AdminProductCreate
            image={image}
            errors={errors}
            upImg={upImg}
            register={register}
            handleSubmit={handleSubmit}
            onSubmitCreateProduct={onSubmitCreateProduct}
            listTitle={listTitle}
            listAuthor={listAuthor}
            listCate={listCate}
            onChangCate={onChangCate}
            listCateDetails={listCateDetails}
            listRegion= {listRegion} loadingElm={loadingElm}
        />
    )
}

export default AdminProductCreateLogic;
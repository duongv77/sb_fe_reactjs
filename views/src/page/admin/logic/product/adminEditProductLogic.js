import AdminEditProduct from "../../view/product/adminEditProduct";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import API from '../../../../api/api';
import { toast } from "react-toastify";
import firebase from "firebase/compat/app"
import { productValue, setProductValue } from '../../../../Service/service'
import swal from 'sweetalert';

function AdminEditProductLogic({productDetail, setListProduct}){
    const history = useHistory()
    const [image, setImage] = useState(undefined)
    const [listTitle, setListTitle] = useState([])
    const [listAuthor, setListAuthor] =  useState([])
    const [listCategories, setListCategories] =  useState([])
    const [listRegion, setListRegion] = useState([])
    const [product, setProduct] = useState({})
    const [listCateProduct, setListCateProduct] = useState([])  //quản lí cate của product
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [loadingElm, setLoadingElm] = useState(false)

    const onSubmit = () => {
        const productObjValue = {
            id:+form.id,
            name:form.name,
            price: +form.price,
            numberpages:+form.numberpages,
            form: form.form,
            title:listTitle.filter(elm=>{return elm.id == form.title})[0],
            publishyear:+form.publishyear,
            quantity: +form.quantity,
            region:listRegion.filter(elm=>{return elm.id == form.region})[0],
            categorie:listCategories.filter(elm=>{return elm.id == form.categorie})[0],
            language:form.language,
            author:listAuthor.filter(elm=>{return elm.id == form.author})[0],
            publisher: form.publisher,
            supplier: form.supplier,
            description:form.description,
            image: image
        }
        confirmUpdateProduct(productObjValue)
    }

    const confirmUpdateProduct = (productObjValue) => {
        swal({
            title: "Chú ý !",
            text: "Bạn muốn cập nhập !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                callApiUpdateProduct(productObjValue)
            } else {
            }
          });
    }
 
    const callApiUpdateProduct = async(value) => {
        try {
            const url = "/api/v2/admin/product"
            const response = await API.putAdmin(url , value)
            const {data, messageCode, messageName} = response
            if(messageCode==200){
                toast.success("Cập nhập thành công")
                setListProduct(oldValue=>{
                    const newValue = oldValue.map(elm=>{
                        return data.id==elm.id?data:elm
                    })
                    return newValue
                })
                const newValue = productValue.map(elm=>{
                    return elm.id !== value.id ? elm:data
                })
                document.getElementById('close-modal').click();
                setProductValue(newValue)
            }else{
                toast.error(messageName)
            }
        } catch (error) {
            toast.error("Cập nhập thất bại")
            console.log(error)
        }
    }

    const [form, setForm] = useState({
        id: productDetail.id,
        name:String,
        price:Number,
        available:Number,
        description:String,
        image:String,
        quantity:Number,
        numberpages:Number,
        form:String,
        publishyear:Number,
        publisher:String,
        supplier:String,
        language:String,
        author:Number,
        region:Number,
        title: Number,
        categorie: Number
    })

    const onChange = (e) => {
        const {name, value} = e.target
        setForm({
            ...form,[name]:value
        })
    }

    const setFormValue = () => {
        try {
            setForm({
                id: productDetail.id,
                name:productDetail.name,
                price:productDetail.price,
                available:productDetail.available,
                description:productDetail.description==null?"trống":productDetail.description,
                image:productDetail.image,
                quantity:productDetail.quantity,
                numberpages:productDetail.numberpages,
                form:productDetail.form,
                publishyear:productDetail.publishyear,
                publisher:productDetail.publisher,
                supplier:productDetail.supplier,
                language:productDetail.language,
                author:productDetail.author==null?null:productDetail.author.id,
                region:productDetail.region.id,
                title: productDetail.title===null?null:productDetail.title.id,
                categorie: productDetail.categorie.id
            })
            setImage(productDetail.image)
        } catch (error) {
            
        }
        // setLoadingElm(true)
        // try {
        //     const url = `/api/v2/admin/product/${id}`
        //     const response = await API.getAdmin(url)
        //     const {data, messageCode, messageName} = response
        //     if(+messageCode===200){
        //         console.log(data)
                
        //         setProduct(data)
        //         setListCateProduct(data.categories)
        //         setImage(data.image)
        //     }else{
        //         toast.error(messageName)
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
        // setLoadingElm(false)
    }

    useEffect(()=>{setFormValue()},[productDetail])
    

    const callApiListTitle = async() => {
        try {
            const url = "/api/v1/title"
            const response = await API.get(url)
            setListTitle(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const callApiListAuthor = async() => {
        try {
            const url = "/api/v2/admin/author/sort=name"
            const response = await API.getAdmin(url)
            setListAuthor(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const callApiListCategories = async() => {
        try {
            const url = `/api/v2/admin/categories-hight-lv`
            const response = await API.getAdmin(url)
            const {data, messageCode, messageName} = response
            if(+messageCode===200){
                setListCategories(data)
            }else{
                toast.error(messageName)
            }
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

    const upImg = () => {
        try {
            setLoadingElm(true)
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

    useEffect(() => {
        callApiListTitle()
        callApiListAuthor()
        callApiRegion()
        callApiListCategories()
    }, [])

    const addListCateProduct =(e, value) =>{
        const {checked} = e.target
        let check = false
        listCateProduct.forEach(element => {
            if(element.id===value.id) check = true
        });

        if(checked && !check){
            setListCateProduct([...listCateProduct, value])
        }
    }

    const deleteListCateProduct = (e, value) => {
        const {checked} = e.target
        if(!checked){
            setListCateProduct(oldValue=>{
                let listCateProductNew = oldValue.filter(val => {
                    return val.id !== value.id
                })
                return listCateProductNew
            })
        }
    }


    return(
        <AdminEditProduct 
            // onSubmitUpdateProduct={onSubmitUpdateProduct}
            image={image}
            upImg={upImg}
            listTitle={listTitle}
            listAuthor={listAuthor}
            listCategories={listCategories}
            listRegion= {listRegion}   
            product={product}
            listCateProduct={ listCateProduct }       
            editListCateProduct={addListCateProduct}
            deleteListCateProduct={deleteListCateProduct}                     
            register={register} handleSubmit={handleSubmit}  errors ={errors}
            onSubmit={onSubmit}
            form={form} onChange={onChange} loadingElm={loadingElm}
        />
    )
}

export default AdminEditProductLogic;
import API from "../../../../api/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import swal from 'sweetalert';
import Rating from '@mui/material/Rating';
import { convertDate } from "../../../../Service/common";
import { useForm } from "react-hook-form";

function ProductComment(props) {
    const user = JSON.parse(localStorage.getItem("AccountToken"))
    const [page, setPage] = useState(1)
    const [listComment, setListComment] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm();
    const callApiFindListCommentToProductId = async () => {
        try {
            const url = `/api/v1/comment/list-comment/product-id/${props.id}`
            const response = await API.get(url)
            console.log(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setListComment(data)
                console.log(data)
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onClickNext = () => {
        let pageNew = page + 1
        setPage(pageNew)
    }

    const onClickPre = () => {
        let pageNew = page == 0 ? 0 : page - 1
        setPage(pageNew)
    }

    useEffect(() => {
        callApiFindListCommentToProductId()
    }, [props.id])

    const callApiCreateComment = async (value) => {
        try {
            const url = `/api/v1/user/comment`
            const response = await API.postAdmin(url, value)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setListComment([...listComment, data])
                toast.success("Đã thêm bình luận")
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = (data) => {
        const value = { comment: data.comment, id: Number(props.id) }
        callApiCreateComment(value)
    }

    return (
        <>
            <div className="row tab-review-row">
                <div className="padding-5">
                    {
                        listComment.map((value, index) => {
                            return (
                                <div key={index}>
                                    <div className="tab-rating-box" style={{ marginBottom: "20px" }}>
                                        <div>
                                            <img className="img-circle img-user mar-rgt" src={value.account.photo} alt="" />
                                            <span>{value.account.fullname} </span>
                                        </div>
                                        <div className="review-author-info">
                                            <p>{value.comment}</p>
                                            <span >{convertDate(value.createDate)}</span>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>
                <div className="col-lg-12" style={{ marginBottom: "-100px", marginTop: "10px", marginRight: "30px" }}>
                    {
                        user == null ? 
                        <div className="col-lg-6">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group">
                                        <div className="col-lg-11">
                                            <textarea className="form-control" placeholder="Nhập bình luận ..."  {...register("comment", { required: true, maxLength: 225 })} disabled/>
                                            {errors.comment?.type === 'required' && <span className="text-danger">Không được để trống</span>}
                                            {errors.comment?.type === 'maxLength' && <span className="text-danger">Không được quá 225 kí tự</span>}
                                        </div>
                                        <div className="col-lg-1">
                                            <button type="submit" className="btn btn-success"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        :
                            <div className="col-lg-6">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group">
                                        <div className="col-lg-11">
                                            <textarea className="form-control" placeholder="Nhập bình luận ..."  {...register("comment", { required: true, maxLength: 225 })} />
                                            {errors.comment?.type === 'required' && <span className="text-danger">Không được để trống</span>}
                                            {errors.comment?.type === 'maxLength' && <span className="text-danger">Không được quá 225 kí tự</span>}
                                        </div>
                                        <div className="col-lg-1">
                                            <button type="submit" className="btn btn-success"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                    }
                    <div className="col-lg-6 text-right">
                        <i onClick={onClickPre} className="fa fa-chevron-left custom-hover-mouse" aria-hidden="true" style={{ marginRight: "5px" }}></i>
                        <i onClick={onClickNext} class="fa fa-chevron-right custom-hover-mouse" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductComment;
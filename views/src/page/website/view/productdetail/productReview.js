import API from "../../../../api/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import swal from 'sweetalert';
import Rating from '@mui/material/Rating';
import { convertDate } from "../../../../Service/common";

function ProductReview(props) {
    const [quantityTurnVote, setQuantityTurnVote] = useState(0)
    const [listVote, setListVote] = useState([])
    const [page, setPage] = useState(0)
    const [vote, setVote] = useState({
        star: 0,
        comment: ""
    })

    const callApiRate = async () => {
        try {
            const url = `/api/v1/rate-product/page=${page}/${props.id}`
            const response = await API.get(url)
            const { data, messageCode, messageName } = response
            console.log(data)
            if (messageCode == 200) {
                setListVote(data)
            } else {
                setQuantityTurnVote(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiQuantityTurnVote = async () => {
        const account = JSON.parse(localStorage.getItem("AccountToken"))
        if(account==undefined || account== null){
            return ;
        }
        try {
            const url = `/api/v2/user/product_id/${props.id}`
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            console.log(data)
            if (messageCode == 200) {
                setQuantityTurnVote(data.quantity)
            } else {
                setQuantityTurnVote(0)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi!")
            console.log(error)
        }
    }

    const onClickVote = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        callApiQuantityTurnVote()
        callApiRate()
    }, [props.id, page])

    const callApiCreateVote = async () => {
        const value = {
            rate: vote.star,
            productId: +props.id,
            comment: vote.comment
        }
        console.log(value)
        try {
            const url = "/api/v2/user/rate"
            const response = await API.postAdmin(url, value)
            const { data, messageCode, messageName } = response
            console.log(data)
            if (messageCode == 200) {
                toast.success("Đã đánh giá sản phẩm!")
                setQuantityTurnVote(quantityTurnVote - 1)
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi!")
            console.log(error)
        }
    }

    const onClickNext=()=>{
        let pageNew=page+1
        setPage(pageNew)
    }

    const onClickPre = () => {
        let pageNew = page==0? 0 : page-1
        setPage(pageNew)
    }

    try {
        return (
            <div className="row tab-review-row">

                <div className="padding-5">
                    {
                        listVote.map(value => {
                            return (
                                <div className="tab-rating-box" style={{ marginBottom: "20px" }}>
                                    <div>
                                        <img className="img-circle img-user mar-rgt" src={value.account.photo} alt="" />
                                        <span>{value.account.fullname} </span>
                                    </div>
                                        <Rating
                                            name="simple-controlled"
                                            value={value.vote} readOnly 
                                        />
                                    <div className="review-author-info">
                                        <p>{value.comment}</p>
                                        <span >{convertDate(value.createDate)}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col-xs-7 col-sm-8 col-md-8 col-lg-9 padding-5">
                    {/* <div className="write-your-review">
                        <p><strong>Viết đánh giá</strong></p>
                        <p>Bạn hãy đánh giá về chất lượng của chúng tôi!</p>
                        <span className="usefull-comment">Bạn đang có {quantityTurnVote} lượt đánh giá đối với sản phẩm này</span>
                        {quantityTurnVote.quantity > 0 ? <span className="usefull-comment">Bạn đang muốn đánh giá ? <span>có</span></span> : ""}
                        <a href="#">Report abuse </a>
                    </div> */}
                </div>
                <div className="row">
                    <div className="text-left col-lg-6"  style={{ marginLeft: "30px" }}>
                        {
                            listVote.length==0?
                            <div className="review-author-info">
                                <span >Chưa có đánh giá</span>
                            </div>:
                            <div>
                                <button className="btn btn-default" 
                                    onClick={() => { onClickPre() }}
                                >
                                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                                </button>
                                <button className="btn btn-default"
                                    onClick={() => { onClickNext() }}
                                >
                                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                                </button>
                            </div>
                        }
                    </div>
                    <div className="text-right col-lg-5" style={{ marginRight: "30px" }}>
                        {
                            quantityTurnVote <= 0 ?
                                <a href="#" className="write-review-btn" onClick={(e) => {
                                    e.preventDefault()
                                    toast.error("Bạn không có lượt đánh giá!")
                                }}>Đánh giá!</a> :
                                <a href="#" className="write-review-btn" onClick={(e) => { onClickVote(e) }}
                                    data-target="#vote" data-toggle="modal"
                                >Đánh giá!</a>
                        }
                    </div>
                </div>

                <div className="modal" id="vote" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button data-dismiss="modal" className="close" type="button">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h4 className="modal-title">Đánh giá!</h4>
                            </div>
                            <div className="modal-body">
                                <p>Cảm ơn bạn đã để lại đánh giá:</p>
                                <Rating
                                    name="simple-controlled"
                                    value={vote.star}
                                    onChange={(event, newValue) => {
                                        setVote({ ...vote, star: newValue })
                                    }}
                                />
                                <textarea className="form-control" value={vote.comment} onChange={e => {
                                    const { value } = e.target
                                    setVote({ ...vote, comment: value })
                                }} />
                            </div>
                            <div className="modal-footer">
                                <button data-dismiss="modal" className="btn btn-primary" onClick={() => callApiCreateVote()}>Đồng ý</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } catch (error) {
        return ""
    }
}

export default ProductReview;
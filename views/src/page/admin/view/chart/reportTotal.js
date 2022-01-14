import API from "../../../../api/api";
import { useState, useEffect } from "react";
function ReportTotal() {
    const [reportQuantity, setReportQuantity] = useState()

    const callApiReportQuantity = async() => {
        try {
            const url = "/api/v2/supper_admin/report/report-quantity-all"
            const response = await API.getAdmin(url)
            const {data, messageCode} = response
            if(messageCode==200){
                setReportQuantity(data)
            }
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        callApiReportQuantity()
    },[])

    try {
        return (
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-lg-6">
                        {/*Sales tile*/}
                        <div className="panel panel-primary panel-colorful">
                            <div className="pad-all text-center">
                                <span className="text-5x text-thin">{reportQuantity.productQuantity==null?0:reportQuantity.productQuantity}</span>
                                <p>Tổng số lượng sản phẩm</p>
                                <i className="fa fa-shopping-cart" />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-6">
                        {/*Messages tile*/}
                        <div className="panel panel-warning panel-colorful">
                            <div className="pad-all text-center">
                                <span className="text-5x text-thin">{reportQuantity.productQuantitySold==null?0:reportQuantity.productQuantitySold}</span>
                                <p>Tổng số lượng sản phẩm đã bán</p>
                                <i className="fa fa-envelope" />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-6">
                        {/*Projects*/}
                        <div className="panel panel-purple panel-colorful">
                            <div className="pad-all text-center">
                                <span className="text-5x text-thin">{reportQuantity.accountQuantity==null?0:reportQuantity.accountQuantity}</span>
                                <p>Số lượng tài khoản</p>
                                <i className="fa fa-code" />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-6">
                        {/*Reports*/}
                        <div className="panel panel-dark panel-colorful">
                            <div className="pad-all text-center">
                                <span className="text-5x text-thin">{reportQuantity.orderSold==null?0:reportQuantity.orderSold}</span>
                                <p>Tổng đơn hàng đã bán</p>
                                <i className="fa fa-file-text" />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-6">
                        {/*New Items*/}
                        <div className="panel panel-info panel-colorful">
                            <div className="pad-all text-center">
                                <span className="text-5x text-thin">{reportQuantity.promotionQuantity==null?0:reportQuantity.promotionQuantity}</span>
                                <p>Tất cả chương trình giảm giá</p>
                                <i className="fa fa-plus-circle" />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-6">
                        {/*Task*/}
                        <div className="panel panel-success panel-colorful">
                            <div className="pad-all text-center">
                                <span className="text-5x text-thin">{reportQuantity.quantityRate==null?0:reportQuantity.quantityRate}</span>
                                <p>Tổng số lượng đánh giá</p>
                                <i className="fa fa-tasks" />
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

export default ReportTotal;
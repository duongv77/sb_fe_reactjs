import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { useState } from "react";
import { convertDate, numberWithCommas } from '../../../../Service/common';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function HistoryOrder(props) {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="container" style={{maxWidth:"100%"}}>
            <div className="row mar-top">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <h2 className="page-title about-page-title">Lịch sử đơn hàng:</h2>
                </div>
                <div style={{ minHeight: "400px", marginTop: "50px" }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Đơn hàng chờ xác nhận" value="1" />
                                <Tab label="Đơn hàng đã xác nhận" value="2" />
                                <Tab label="Đơn hàng đang giao" value="3" />
                                <Tab label="Đơn hàng đã giao" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <div className="panel-body">
                                <table className="table  table-condensed">
                                    <thead>
                                        <tr>
                                            <th>ID hóa đơn</th>
                                            <th>Thời gian tạo</th>
                                            <th>Tổng tiền</th>
                                            <th width={120}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.listOrder.map(value => {
                                                if (value.status !== 1) return null;
                                                return (
                                                    <tr key={value.id}>
                                                        <td><a className="btn-link custom-hover-mouse" onClick={() => { props.onClickOrder(value) }}>Order #{value.id}</a></td>
                                                        <td>{convertDate(value.createDate)}</td>
                                                        <td>{value.total == null ? 0 : numberWithCommas(value.total)}₫</td>
                                                        <td>
                                                            <button title="Hủy đơn" onClick={() => { props.onClickCancelOrder(value.id) }} className="btn btn-active-danger"><i class="fa fa-repeat" aria-hidden="true"></i></button>
                                                            <button title="Lịch sử" data-target="#history" data-toggle="modal" className="btn btn-active-warning" onClick={() => { props.onClickSetOrder(value) }}><i class="fa fa-history" aria-hidden="true"></i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    {/* <a className="custom-hover-mouse">Hiển thị thêm</a> */}
                                </table>
                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            <div className="panel-body">
                                <table className="table  table-condensed">
                                    <thead>
                                        <tr>
                                            <th>ID hóa đơn</th>
                                            <th>Thời gian duyệt</th>
                                            <th>Tổng tiền</th>
                                            <th width={120}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.listOrder.map(value => {
                                                if (value.status !== 2) return null;
                                                return (
                                                    <tr key={value.id}>
                                                        <td><a className="btn-link" onClick={() => { props.onClickOrder(value) }}>Order #{value.id}</a></td>
                                                        <td>{convertDate(value.createDate)}</td>
                                                        <td>{value.total == null ? 0 : numberWithCommas(value.total)}₫</td>
                                                        <td>
                                                            <button title="Lịch sử" data-target="#history" data-toggle="modal" className="btn btn-active-warning" onClick={() => { props.onClickSetOrder(value) }}><i class="fa fa-history" aria-hidden="true"></i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>
                        <TabPanel value="3">
                            <div className="panel-body">
                                <table className="table  table-condensed">
                                    <thead>
                                        <tr>
                                            <th>ID hóa đơn</th>
                                            <th>Thời gian giao hàng</th>
                                            <th>Tổng tiền</th>
                                            <th width={120}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.listOrder.map(value => {
                                                if (value.status !== 3) return null;
                                                return (
                                                    <tr key={value.id}>
                                                        <td><a  className="btn-link" onClick={() => { props.onClickOrder(value) }}>Order #{value.id}</a></td>
                                                        <td>{convertDate(value.createDate)}</td>
                                                        <td>{value.total == null ? 0 : numberWithCommas(value.total)}₫</td>
                                                        <td>
                                                            <button title="Lịch sử" data-target="#history" data-toggle="modal" className="btn btn-active-warning" onClick={() => { props.onClickSetOrder(value) }}><i class="fa fa-history" aria-hidden="true"></i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>
                        <TabPanel value="4">
                            <div className="panel-body">
                                <table className="table  table-condensed">
                                    <thead>
                                        <tr>
                                            <th>ID hóa đơn</th>
                                            <th>Thời gian nhận</th>
                                            <th>Tổng tiền</th>
                                            <th width={120}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.listOrder.map(value => {
                                                if (value.status !== 4) return null;
                                                return (
                                                    <tr key={value.id}>
                                                        <td><a  className="btn-link" onClick={() => { props.onClickOrder(value) }}>Order #{value.id}</a></td>
                                                        <td>{convertDate(value.createDate)}</td>
                                                        <td>{value.total == null ? 0 : numberWithCommas(value.total)}₫</td>
                                                        <td>
                                                            <td>
                                                                <button title="Lịch sử" data-target="#history" data-toggle="modal" className="btn btn-active-warning" onClick={() => { props.onClickSetOrder(value) }}><i class="fa fa-history" aria-hidden="true"></i></button>
                                                            </td>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>
                    </TabContext>
                </div>
                <Modal
                    open={props.open}
                    onClose={props.handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 1000, height: 620 }}>
                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true" onClick={props.handleClose}>×</span>
                            </button>
                            <h4 className="modal-title">Đơn hàng: {props.orderDetail.id}</h4>
                        </div>
                        <div className="modal-body custom-overflow">
                            <div className="row">
                                <h4>Địa chỉ: {props.orderDetail.address}</h4>
                                <table id="demo-dt-basic" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th width={40}>STT</th>
                                            <th>Tên sản phẩm</th>
                                            <th width={100}>Ảnh</th>
                                            <th width={120}>Đơn giá</th>
                                            <th width={90} >Số lượng</th>
                                            <th width={90}>Giảm giá</th>
                                            <th className="min-desktop">Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.orderDetail.orderdetail == undefined ? "" :
                                                props.orderDetail.orderdetail.map((value, index) => {
                                                    const { product, quantity, price, sale } = value
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{product.title == null ? product.name : product.title.name + " " + product.name}</td>
                                                            <td><img src={product.image} height={50} /></td>
                                                            <td>{numberWithCommas(price)}₫</td>
                                                            <td>{quantity}</td>
                                                            <td>{sale == null ? "0%" : sale + "%"}</td>
                                                            <td>{numberWithCommas(price * quantity / 100 * (100 - sale))}₫</td>
                                                        </tr>
                                                    )
                                                })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer" style={{ backgroundColor: "white" }}>
                            <button onClick={props.handleClose} className="btn btn-default" type="button">Close</button>
                        </div>
                    </Box>
                </Modal>
                <div className="modal" id="history" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content ">
                            {/*Modal header*/}
                            <div className="modal-header">
                                <button data-dismiss="modal" className="close" type="button">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h4 className="modal-title">Lịch sử:</h4>
                            </div>
                            {/*Modal body*/}
                            <div className="modal-body">
                                <div className="row">
                                    <ul style={{ marginLeft: "50px" }}>
                                        {
                                            props.orderHistory.map((value, index) => {
                                                if (index + 1 == props.orderHistory.length) {
                                                    return (
                                                        <li style={{ color: "red", fontStyle: "italic" }} key={index}>- {index + 1}. Trạng thái: {value.statusorder.status}. Thời gian: {convertDate(value.createDate)}</li>
                                                    )
                                                }
                                                return (
                                                    <li key={index}>- {index + 1}. Trạng thái: {value.statusorder.status}. Thời gian: {convertDate(value.createDate)}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            {/*Modal footer*/}
                            <div className="modal-footer">
                                <button data-dismiss="modal" className="btn btn-default" type="button">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Trả hàng */}
                <Modal
                    open={props.open2}
                    onClose={props.handleClose2}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 1000, height: 620 }}>
                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true" onClick={props.handleClose2}>×</span>
                            </button>
                            <h4 className="modal-title">Yêu cầu trả hàng: </h4>
                        </div>
                        <div className="modal-body custom-overflow">
                            <div className="row">
                                <div className="col-lg-12">
                                    <h4>Lí do: <textarea value={props.descriptionReturnOrder} className="form-control" onChange={(e)=>{
                                        props.setDescriptionReturnOrder(e.target.value)
                                    }}/></h4>
                                    <table style={{marginTop:"20px"}} id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                        <thead>
                                            <tr>
                                                <th width={40}>STT</th>
                                                <th>Tên sản phẩm</th>
                                                <th width={100}>Ảnh</th>
                                                <th width={120}>Đơn giá</th>
                                                <th width={90} >Số lượng</th>
                                                <th width={90}>Giảm giá</th>
                                                <th className="min-desktop">Thành tiền</th>
                                                <th width={50}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                props.orderReturn == undefined ? "" :
                                                    props.orderReturn.map((value, index) => {
                                                        const { product, quantity, price, sale } = value
                                                        return (
                                                            <tr key={index} >
                                                                <td>{index + 1}</td>
                                                                <td>{product.title == null ? product.name : product.title.name + " " + product.name}</td>
                                                                <td><img src={product.image} height={50} /></td>
                                                                <td>{numberWithCommas(price)}₫</td>
                                                                <td><input type="number" value={quantity} className="form-control" onChange={(e)=>{props.onChangeQuantity(e, value.id)}}/></td>
                                                                <td>{sale == null ? "0%" : sale + "%"}</td>
                                                                <td>{numberWithCommas(price * quantity / 100 * (100 - sale))}₫</td>
                                                                <td><button className="btn btn-active-danger" onClick={()=>{props.onClickDeleteRowReturn(value)}}><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>
                                                            </tr>
                                                        )
                                                    })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer" style={{ backgroundColor: "white" }}>
                            <button onClick={props.handleClose2} className="btn btn-default" type="button">Đóng</button>
                            <button onClick={props.onClickCreateOrderReturn} className="btn btn-success" type="button">Tạo yêu cầu</button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default HistoryOrder
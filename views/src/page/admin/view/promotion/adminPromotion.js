import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Tooltip from '@mui/material/Tooltip';
import {
    NavLink
} from "react-router-dom";
import TextField from '@mui/material/TextField';
import { TrangThaiPromotion } from "../../../../Service/common"
import { SwapSpinner } from "react-spinners-kit";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #DCDCDC',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
function AdminPromotion(props) {
    return (
        <div>
            <div class="panel">
                <div class="panel-heading">
                    <h2 className="panel-title">Danh sách chương trình giảm giá:</h2>
                    <ol className="breadcrumb">
                        <li><NavLink to="/admin" style={{ fontSize: "15px" }}>Trang chủ</NavLink></li>
                        <li><NavLink to="/admin/promotion" style={{ fontSize: "15px" }}>Giảm giá</NavLink></li>
                    </ol>
                </div>
                <br />
                <br />
                <br />
                <div id="page-title" className="mar-top">
                    <div className="mar-top">
                        <span className="mar-rgt">Sắp xếp</span>
                        <select className="custom-select" displayEmpty onChange={props.onChangeSort}>
                            <option value="name">Sắp xếp theo tên </option>
                            <option value="createDate">Ngày bắt đầu</option>
                            <option value="endDate">Ngày kết thúc</option>
                            <option value="activated">Trạng thái</option>
                        </select>
                    </div>
                    <div className="searchbox">
                        <div className="input-group custom-search-form">
                            <input type="text" className="form-control" placeholder="Tìm kiếm . . ." onChange={props.onChangeSearch} onKeyPress={props.onChangeSearch} />

                            <span className="input-group-btn">
                                <button className="text-muted" type="button"><i className="fa fa-search" /></button>
                            </span>
                        </div>
                    </div>
                </div>
                <button onClick={props.handleOpen} className="btn btn-success  mar-lft mar-top"><i className="fa fa-plus-circle"></i> </button>
                {
                    props.loadingElm === true ?
                        <div className="custom-center">
                            <SwapSpinner size={40} color="#686769" loading={props.loadingElm} ></SwapSpinner>
                        </div>
                        :
                        <div>
                            <div class="panel-body">
                                <table id="demo-dt-basic" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th width={30}>STT</th>
                                            <th width={80}>ID</th>
                                            <th>Tên chương trình</th>
                                            <th className="min-tablet">Giảm giá (%)</th>
                                            <th className="min-tablet">Trạng thái</th>
                                            <th className="min-desktop">Ngày bắt đầu</th>
                                            <th className="min-desktop">Ngày kết thúc</th>
                                            <th className="min-desktop">Số lượng sản phẩm</th>
                                            <th className="text-center" width={120}>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            props.listPromotion.map((value, index) => {
                                                if (props.page * props.size > index) return null
                                                if ((props.page + 1) * props.size < index + 1) return null
                                                return (
                                                    <tr className="custom-hover-mouse" onClick={() => { props.push(value) }}>
                                                        <td>{index + 1}</td>
                                                        <td>{value.id}</td>
                                                        <td>{value.name}</td>
                                                        <td>{value.sale}%</td>
                                                        <td>{TrangThaiPromotion(value.activated)}</td>
                                                        <td>{value.createDate}</td>
                                                        <td>{value.endDate}</td>
                                                        <td></td>
                                                        <td className="custom-right">
                                                            {
                                                                value.activated === 1 ?
                                                                    <Tooltip title="Tạm dừng" placement="top-start" arrow>
                                                                        <button onClick={(e) => { props.onClickPausePromotion(e, value) }}
                                                                            className="btn btn-warning mar-rgt" ><i class="fa fa-pause" ></i></button>
                                                                    </Tooltip>
                                                                    : ""
                                                            }
                                                            {
                                                                value.activated === 2 ?
                                                                    <Tooltip title="Khởi động" placement="top-start" arrow>
                                                                        <button onClick={(e) => { props.onClickPlayPromotion(e, value) }}
                                                                            className="btn btn-success mar-rgt" ><i class="fa fa-play" ></i></button>
                                                                    </Tooltip>
                                                                    : ""
                                                            }
                                                            {
                                                                value.activated == 1 || value.activated == 2 ?
                                                                    <Tooltip title="Dừng chương trình" placement="top-start" arrow>
                                                                        <button className="btn btn-danger " onClick={(e) => { props.onClickDeletePromotion(e, value.id) }}><i className="fa fa-stop"></i></button>
                                                                    </Tooltip> : ""
                                                            }

                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                            <div className="btn-toolbar mar-rgt row" >
                                <div className=" col-lg-6 ">
                                    <select className="text-left custom-select"
                                        onChange={(event) => {
                                            const { value } = event.target
                                            props.setSize(+value)
                                        }}
                                    >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={30}>30</option>
                                    </select>
                                </div>
                                <div className="text-right col-lg-6 review-box" >
                                    <span> {(props.page + 1) * props.size > props.listPromotion.length ? props.listPromotion.length : (props.page + 1) * props.size}
                                        / {props.listPromotion.length}</span>
                                    <button className="btn btn-default btn-active-purple mar-lft" onClick={() => { props.clickPre() }}><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                                    <button className="btn btn-default btn-active-purple">{props.page + 1}</button>
                                    <button className="btn btn-default btn-active-purple" onClick={() => { props.clickNext() }}><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                }

            </div>

            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 900, height: 450 }}>
                    <div className="modal-header" style={{ marginTop: "-10px" }}>
                        <button data-dismiss="modal" className="close" type="button">
                            <span aria-hidden="true" onClick={props.handleClose}>×</span>
                        </button>
                        <h4 className="modal-title">Đặt hàng</h4>
                    </div>
                    <form id="promotion" onSubmit={props.handleSubmit(props.onSubmit)}>
                        <div className="row " style={{ marginTop: "30px" }}>
                            <div className="col-sm-11 col-sm-offset-1" >
                                <div className="form-group row">
                                    <div className="col-sm-2">
                                        <label className="control-label">Tên chương trình:</label>
                                    </div>
                                    <div className="col-sm-9">
                                        <input type="text" placeholder="Tên chương trình . . ." className="form-control" {...props.register("name", { required: true, maxLength: 200 })} />
                                        {props.errors.name?.type === 'required' && <span className="text-danger !">Không được để trống !</span>}
                                        {props.errors.name?.type === 'maxLength' && <span className="text-danger !">Không quá 200 kí tự !</span>}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-2">
                                        <label className="control-label">Giảm giá(%):</label>
                                    </div>
                                    <div className="col-sm-9">
                                        <input type="number" placeholder="% giảm. . ." className="form-control" {...props.register("saleStr", { required: true, min: 1, max: 99 })} />
                                        {props.errors.saleStr?.type === 'required' && <span className="text-danger !">Không được để trống !</span>}
                                        {props.errors.saleStr?.type === 'min' && <span className="text-danger !">% sale không nhỏ hơn 1 !</span>}
                                        {props.errors.saleStr?.type === 'max' && <span className="text-danger !">% sale không lớn hơn 99 !</span>}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-2">
                                        <label className="control-label">Thời gian:</label>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <TextField
                                                    id="date"
                                                    label="Thời gian bắt đầu"
                                                    type="date"
                                                    sx={{ width: 250 }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    {...props.register("createDate", { required: true })}
                                                />
                                                {props.errors.createDate?.type === 'required' && <span className="text-danger !">Không được để trống !</span>}
                                            </div>
                                            <div className="col-sm-6">
                                                <TextField
                                                    id="date"
                                                    label="Thời gian kết thúc"
                                                    type="date"
                                                    sx={{ width: 250 }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    {...props.register("endDate", { required: true })}
                                                />
                                                {props.errors.endDate?.type === 'required' && <span className="text-danger !">Không được để trống !</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-2">
                                        <label className="control-label">Mô tả:</label>
                                    </div>
                                    <div className="col-sm-9">
                                        <textarea type="text" placeholder="Mô tả . . ." className="form-control" {...props.register("description", { maxLength: 225 })} />
                                        {props.errors.description?.type === 'maxLength' && <span className="text-danger !">Không quá 225 kí tự !</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer" style={{ backgroundColor: "white", position: 'absolute', bottom: '1px', right: '10px', width: '98%' }}>
                            <button onClick={props.handleClose} className="btn btn-default" type="button">Đóng</button>
                            <button type="submit" className="btn btn-success" type="submit">Tạo</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div >
    )
}

export default AdminPromotion;
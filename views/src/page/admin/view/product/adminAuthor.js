import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {
    NavLink
} from "react-router-dom";
import { SwapSpinner } from "react-spinners-kit";
import Tooltip from '@mui/material/Tooltip'
import Switch from '@mui/material/Switch';
import { blue } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';
function AdminAuthor(props) {
    const GreenSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: blue[600],
            '&:hover': {
                backgroundColor: alpha(blue[600], theme.palette.action.hoverOpacity),
            },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: blue[600],
        },
    }));

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
        <div>
            <div class="panel">
                <div class="panel-heading">
                    <h2 className="panel-title">DANH SÁCH TÁC GIẢ</h2>
                    <ol className="breadcrumb">

                        <li style={{ fontSize: 20 }}><NavLink to="/admin">Trang chủ</NavLink></li>
                        <li style={{ fontSize: 20 }}><NavLink to="/admin/product/author">Tác giả</NavLink></li>
                    </ol>
                </div>
                <br />
                <br />
                <br />
                <div id="page-title" className="mar-top">
                    <div className="mar-top">
                    <span className="mar-rgt">Sắp xếp</span>
                        <select className='custom-select' onChange={props.onChangeSort}>
                            <option value="name">Sắp xếp theo tên </option>
                        </select>
                    </div>
                    <div className="searchbox" style={{ paddingTop: 20 }}>
                        <div className="input-group custom-search-form">
                            <input type="text" className="form-control" placeholder="Tìm kiếm . . ." onChange={props.onChangeSearch} onKeyPress={props.onChangeSearch} />
                            <span className="input-group-btn">
                                <button className="text-muted" type="button"><i className="fa fa-search" /></button>
                            </span>
                        </div>
                    </div>
                </div>
                <Tooltip title="Thêm mới tác giả" placement="top-start" arrow>
                    <button data-target="#add-author" data-toggle="modal" className="btn btn-success mar-lft mar-top"><i className="fa fa-plus-circle"></i></button>
                </Tooltip>
                {
                    props.loadingElm === true ?
                        <div className="custom-center">
                            <SwapSpinner size={40} color="#686769" loading={props.loadingElm} ></SwapSpinner>
                        </div> :
                        <div>
                            <div class="panel-body">
                                <table id="demo-dt-basic" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th width={10}>STT</th>
                                            <th width={40}>ID </th>
                                            <th width={60} className="min-tablet">Ảnh</th>
                                            <th width={200}>Tên tác giả</th>
                                            <th width={200} >Status</th>
                                            <th width={40} className="min-desktop col-sm-3">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.listAuthor.map((value, index) => {
                                                if (props.page * props.size > index) return null
                                                if ((props.page + 1) * props.size < index + 1) return null
                                                return (
                                                    <tr key={value.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{value.id}</td>
                                                        <td>
                                                            <img src={value.photo} style={{ display: "block", height: "50px", marginLeft: "auto", marginRight: "auto" }} />
                                                        </td>
                                                        <td>{value.name}</td>
                                                        <td>
                                                            <GreenSwitch {...label} inputProps={{ "aria-label": "primary checkbox" }} checked={value.status == 1 ? true : false} onClic onChange={(e) => { props.onChangeSwith(e, value.id) }} />
                                                        </td>
                                                        <td>
                                                            <Tooltip title="Sửa tác giả" placement="top-start" arrow>
                                                                <button onClick={() => props.onClickUpdateAuthor(value, index)} data-target="#demo-modal-wo-anim" data-toggle="modal" className="btn btn-warning mar-rgt"><i className="fa fa-pencil"></i></button>
                                                            </Tooltip>
                                                            <Tooltip title="Xóa tác giả" placement="top-start" arrow>
                                                                <button onClick={(e) => props.confirmDeleteAuthor(e, value)} className="btn btn-danger"><i className="fa fa-trash-o"></i></button>
                                                            </Tooltip>

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
                                    <span> {(props.page + 1) * props.size > props.listAuthor.length ? props.listAuthor.length : (props.page + 1) * props.size}
                                        / {props.listAuthor.length}</span>
                                    <button className="btn btn-default btn-active-purple mar-lft" onClick={() => { props.clickPre() }}><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                                    <button className="btn btn-default btn-active-purple">{props.page + 1}</button>
                                    <button className="btn btn-default btn-active-purple" onClick={() => { props.clickNext() }}><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                }
            </div>

            {/* thêm mới */}
            <div className="modal" id="add-author" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/*Modal header*/}
                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">Thêm tác giả:</h4>
                        </div>
                        {/*Modal body*/}
                        <div className="row mar-all">
                            <div className="col-sm-4 text-right mar-lft">
                                {
                                    props.loadingElm ?
                                        <div className="custom-center" style={{ marginTop: "30px" }}>
                                            <Box sx={{ display: 'flex' }}>
                                                <CircularProgress />
                                            </Box>
                                        </div>
                                        :
                                        <img src={props.image} />
                                }
                                {props.photo !== undefined ? <img width={300} height={200} src={props.photo} alt="" /> : null}
                                <input type="file" id="img" onChange={() => { props.upImg() }} />
                            </div>
                            <div className="col-sm-7">
                                <form onSubmit={props.handleSubmit(props.submitAuthorCreate)}>
                                    <div className="panel-body">
                                        <div className="col-sm-11">
                                            <div className="form-group">
                                                <label className="control-label">Tên tác giả</label>
                                                <input type="text" placeholder="Tên tác giả . . ." className="form-control" {...props.register("name", { required: true })} />
                                                {props.errors.name && <span className="text-danger">Bạn chưa nhập tên tác giả !</span>}
                                            </div>
                                        </div>
                                        <button style={{ marginTop: "10px" }} type="submit" className="btn btn-primary mar-lft">Thêm</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                        {/*Modal footer*/}
                        <div className="modal-footer">
                            <button data-dismiss="modal" id="close-modal" className="btn btn-default" type="button">Đóng</button>

                        </div>
                    </div>
                </div>
            </div>

            {/* cập nhật */}
            <div className="modal" id="demo-modal-wo-anim" tabIndex={-1}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/*Modal header*/}
                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">Cập nhật tác giả:</h4>
                        </div>
                        {/*Modal body*/}
                        <div className="pad-all">
                            <div className="row mar-all">
                                <div className="col-sm-4 text-right mar-lft">
                                    <img width={300} height={200} src={props.photo} alt="" />
                                    <input type="file" id="img1" onChange={() => { props.upImg1() }} />
                                </div>
                                <div className="col-sm-7">
                                    <form id="form" onSubmit={(e) => {

                                        props.submitAuthorUpdate(e);
                                    }}>
                                        <div className="panel-body">
                                            <div className="col-sm-11">
                                                <div className="form-group">
                                                    <label className="control-label">Tên tác giả</label>
                                                    <input name="name" id="name" type="text" value={props.editAuthor.name}
                                                        placeholder="Tên tác giả..."
                                                        className="form-control" onChange={props.formInputOnChange} />
                                                    <span id="errorNameAuthor" class="error"></span>
                                                </div>
                                            </div>
                                            <button style={{ marginTop: "10px" }} className="btn btn-info mar-lft" type="submit">Cập nhật</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/*Modal footer*/}
                        <div className="modal-footer">
                            <button data-dismiss="modal" id="close-modal1" className="btn btn-default" type="button">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminAuthor;

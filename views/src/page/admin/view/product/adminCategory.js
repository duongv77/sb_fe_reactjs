import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {
    NavLink
} from "react-router-dom";
import Switch from '@mui/material/Switch';
import { blue } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip'

function AdminCategory(props) {
    let categoryOff = 0
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
                    <h2 className="panel-title">DANH MỤC SẢN PHẨM</h2>
                    <ol className="breadcrumb">
                        <li style={{fontSize:20}}><NavLink to="/admin">Trang chủ</NavLink></li>
                        <li style={{fontSize:20}}><NavLink to="/admin/category">Danh mục sản phẩm</NavLink></li>
                    </ol>
                </div>
                <br />
                <br />
                <br />
                <div id="page-title" className="mar-top">
                    <div className="mar-top">
                        
                    </div>
                    <div className="searchbox" style={{paddingTop:20}}>
                        <div className="input-group custom-search-form">
                            <input  type="text" className="form-control" placeholder="Tìm kiếm . . ." onChange={props.onChangeSearch}/>
                            <span className="input-group-btn">
                                <button className="text-muted" type="button"><i className="fa fa-search" /></button>
                            </span>
                        </div>
                    </div>
                </div>
                <Tooltip title="Thêm mới danh mục" placement="top-start" arrow>
                    <button data-target="#add-category" data-toggle="modal" className="btn btn-success mar-lft mar-top"><i className="fa fa-plus-circle"></i></button>
                </Tooltip>
                <div class="panel-body">
                    <table id="demo-dt-basic" class="table table-striped table-bordered" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th width={30}>STT</th>
                                <th width={50}>ID</th>
                                <th width={350}>Tên danh mục</th>
                                <th width={120} className="min-desktop">Trạng thái</th>
                                <th width={200} className="min-desktop">Loại danh mục</th>
                                <th width={250} className="min-desktop">Ghi chú</th>
                                <th width={170} >Thao tác</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {
                                props.listTypeCategory.map((value, index) => {
                                    if (props.page * props.size > index) return null
                                    if ((props.page + 1) * props.size < index + 1) return null
                                    if (value.available == 0) categoryOff++
                                    return (
                                        <tr key={value.id}>
                                            <td>{index + 1}</td>
                                            <td>{value.id}</td>
                                            <td>{value.name}</td>
                                            <td>
                                                <GreenSwitch {...label} inputProps={{ "aria-label": "primary checkbox" }} checked={value.status == 1 ? true : false} onChange={(e) => { props.onChangeSwith(e, value.id) }} />
                                            </td>
                                            <td>{value.categorie == null ? "" : value.categorie.name}</td>
                                            <td>{value.note}</td>
                                            <td>
                                                {
                                                    props.listTypeCategory.length==0?"":
                                                    value.categorie.id == 1 ?
                                                        <Tooltip title="Sửa danh mục lớn" placement="top-start" arrow>
                                                            <button onClick={() => { props.onClickUpdate(value, index) }} data-target="#edit-category" data-toggle="modal" className="btn btn-warning  mar-rgt"><i className="fa fa-pencil"></i></button>
                                                        </Tooltip>
                                                        :
                                                        <Tooltip title="Sửa danh mục nhỏ" placement="top-start" arrow>
                                                            <button onClick={() => { props.onClickUpdate1(value, index) }} data-target="#edit-Subcategory" data-toggle="modal" className="btn btn-warning  mar-rgt"><i className="fa fa-pencil"></i></button>
                                                        </Tooltip>
                                                }
                                                <Tooltip title="Xóa danh mục" placement="top-start" arrow>
                                                    <button onClick={() => { props.onClickDelete(value) }} className="btn btn-danger"><i className="fa fa-trash-o"></i></button>
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
                        {/* <span style={{ opacity: "0.6", marginLeft: "20px" }}>Danh mục ngưng hoạt đông: {categoryOff}/{props.listTypeCategory.length}</span> */}
                    </div>
                    <div className="text-right col-lg-6 review-box" >
                        <span> {(props.page + 1) * props.size > props.listTypeCategory.length ? props.listTypeCategory.length : (props.page + 1) * props.size}
                            / {props.listTypeCategory.length}</span>
                        <button className="btn btn-default btn-active-purple mar-lft" onClick={() => { props.clickPre() }}><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                        <button className="btn btn-default btn-active-purple">{props.page + 1}</button>
                        <button className="btn btn-default btn-active-purple" onClick={() => { props.clickNext() }}><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>

            {/* thêm mới */}
            <div className="modal " id="add-category" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        {/*Modal header*/}
                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">Thêm danh mục:</h4>
                        </div>
                        {/*Modal body*/}
                        <div className="row mar-all">

                            <div className="col-sm-12">
                                <form onSubmit={props.handleSubmit(props.submitCategoryCreate)}>
                                    <div className="panel-body">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="control-label">Tên danh mục</label>
                                                <input type="text" placeholder="Tên danh mục ..." className="form-control"
                                                    {...props.register("name", { required: true })} />

                                                {props.errors.name && <span className="text-danger">Bạn chưa nhập tên danh mục !!!</span>}
                                            </div>

                                            <div>
                                                <label className="control-label" >Loại danh mục</label>
                                                <select className="form-control" id="categorie" onChange={(e) => { props.onChangeTypeCate(e) }}
                                                    {...props.register("categorie", { required: true })}>
                                                    <option disabled>Choose</option>

                                                    {
                                                        props.updateTypeCategory.map(value => {
                                                            return (
                                                                <option value={JSON.stringify(value)}>{value.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>


                                            </div>

                                            <br />
                                            <div className="form-group">
                                                <label className="control-label">Ghi chú</label>
                                                <textarea rows="3" type="text" placeholder="Ghi chú ..." className="form-control"
                                                    {...props.register("note")} />

                                            </div>

                                            <hr />
                                            <button type="reset" className="btn btn-warning">Reset</button>
                                            <button type="submit" className="btn btn-primary mar-lft">Thêm</button>
                                        </div>
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



            <div className="modal" id="edit-category" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                <div className="modal-dialog modal-lg custom-center2">
                    <div className="modal-content custom-width-model">
                        {/*Modal header*/}
                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">Cập nhật danh mục lớn</h4>
                        </div>
                        {/*Modal body*/}
                        <div className="row mar-all" style={{ height: "390px" }} >

                            <div className="col-sm-12">
                                <form id="formUpdate" >
                                    <div className="panel-body">
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label className="control-label">Tên danh mục</label>
                                                <input type="text" placeholder="Tên danh mục" className="form-control"
                                                    name="name" id="name" value={props.formData.name}
                                                    onChange={props.formInputOnChange} />
                                                <span id="errorName" class="error"></span>
                                            </div>


                                            <div className="form-group">
                                                <label className="control-label">Loại danh mục</label>
                                                <select disabled className="form-control" id="categoriee" onChange={props.formInputOnChange}
                                                    name="categorie">
                                                    <option disabled>Choose</option>
                                                    {
                                                        props.listNameCategory.map(value => {

                                                            return (
                                                                <option selected={props.formData.categorie.name === value.name} value={value.id}>{value.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>



                                            <div className="form-group">
                                                <label className="control-label">Ghi chú</label>
                                                <textarea rows="3" type="text" placeholder="Ghi chú ..." className="form-control"
                                                    name="note" id="note" value={props.formData.note == null ? "" : props.formData.note}
                                                    onChange={props.formInputOnChange} />
                                            </div>



                                            <hr />

                                            <button style={{ marginLeft: "0px" }} onClick={props.submitCategoryUpdate} type="button" className="btn btn-primary mar-lft">Cập nhật</button>

                                        </div>


                                        <div class="col-sm-8" id="listSubCate">
                                            <div>
                                                <label className="control-label">Danh mục con thuộc danh mục {props.formData.name} : </label>
                                            </div>

                                            <table id="demo-dt-basic" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                                <thead>
                                                    <tr>
                                                        <th width={50}>ID</th>
                                                        <th width={350}>Tên danh mục</th>
                                                        <th width={120} className="min-desktop">Trạng thái</th>
                                                        <th width={200} className="min-desktop">Loại danh mục</th>
                                                        <th width={250} className="min-desktop">Ghi chú</th>
                                                        <th width={170} >Thao tác</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        props.listSubCategory.map((value, index) => {
                                                            return (
                                                                <tr key={value.id}>
                                                                    <td>{value.id}</td>
                                                                    <td>{value.name}</td>
                                                                    <td>
                                                                        <GreenSwitch {...label} defaultChecked={value.status == 1 ? true : false} />
                                                                    </td>
                                                                    <td>{value.categorie == null ? "" : value.categorie.name}</td>
                                                                    <td>{value.note === null ? "" : value.note}</td>
                                                                    <td>
                                                                        <button type="button" onClick={() => { props.onClickDelete(value) }} className="btn btn-danger"><i className="fa fa-trash-o"></i></button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                        {/*Modal footer*/}
                        <div className="modal-footer">
                            <button data-dismiss="modal" id="close-modal1" className="btn btn-default" type="button">Đóng</button>

                        </div>
                    </div>
                </div>
            </div>


            <div className="modal" id="edit-Subcategory" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        {/*Modal header*/}
                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">Cập nhật danh mục nhỏ</h4>
                        </div>
                        {/*Modal body*/}
                        <div className="row mar-all" >

                            <div className="col-sm-12">
                                <form id="formUpdate1" >
                                    <div className="panel-body">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="control-label">Tên danh mục</label>
                                                <input type="text" placeholder="Tên danh mục" className="form-control"
                                                    name="name" id="name1" value={props.formData1.name}
                                                    onChange={props.formInputOnChange1} />
                                                <span id="errorName1" class="error"></span>
                                            </div>


                                            <div className="form-group">
                                                <label className="control-label">Loại danh mục</label>
                                                <select className="form-control" id="categoriee1" onChange={props.formInputOnChange1}
                                                    name="categorie">
                                                    <option disabled>Choose</option>
                                                    {
                                                        props.updateTypeCategory.map(value => {

                                                            return (
                                                                <option selected={props.formData1.categorie.name === value.name} value={value.id}>{value.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>



                                            <div className="form-group">
                                                <label className="control-label">Ghi chú</label>
                                                <textarea rows="3" type="text" placeholder="Ghi chú ..." className="form-control"
                                                    name="note" id="note1" value={props.formData1.note == null ? "" : props.formData1.note}
                                                    onChange={props.formInputOnChange1} />

                                            </div>



                                            <hr />
                                            <button style={{ marginLeft: "0px" }} onClick={props.submitCategoryUpdate1} type="button" className="btn btn-primary mar-lft">Cập nhật</button>
                                        </div>


                                    </div>
                                </form>

                            </div>
                        </div>
                        {/*Modal footer*/}
                        <div className="modal-footer">
                            <button data-dismiss="modal" id="close-modal2" className="btn btn-default" type="button">Đóng</button>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default AdminCategory;
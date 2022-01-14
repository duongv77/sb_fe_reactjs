import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {
    NavLink
} from "react-router-dom";

function AdminCategoryDetail(){
    return(
        <div>
            <div class="panel">
                <div class="panel-heading">
                    <h2 className="panel-title">Danh mục sản phẩm chi tiết:</h2>
                    <ol className="breadcrumb">
                        <li><NavLink to="/admin" style={{ fontSize:"15px" }}>Trang chủ</NavLink></li>
                        <li><NavLink to="/admin/category" style={{ fontSize:"15px" }}>Danh mục chi tiết</NavLink></li>
                    </ol>
                </div>
                <br />
                <br />
                <br />
                <div id="page-title" className="mar-top">
                    <div className="mar-top">
                        <span className="mar-rgt">Sắp xếp</span>
                        <Select displayEmpty>
                            <MenuItem value="">Sắp xếp theo tên </MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                        </Select>
                    </div>
                    <div className="searchbox">
                        <div className="input-group custom-search-form">
                            <input type="text" className="form-control" placeholder="Tìm kiếm . . ." />
                            <span className="input-group-btn">
                                <button className="text-muted" type="button"><i className="fa fa-search" /></button>
                            </span>
                        </div>
                    </div>
                </div>
                <button data-target="#add-author" data-toggle="modal" className="btn btn-success btn-labeled fa fa-plus-circle mar-lft mar-top">Thêm </button>
                <div class="panel-body">
                    <table id="demo-dt-basic" class="table table-striped table-bordered" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th className="min-desktop">Trạng thái</th>
                                <th className="min-desktop">Ghi chú</th>
                                <th className="min-desktop col-sm-3">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>System Architect</td>
                                <td>Edinburgh</td>
                                <td>61</td>
                                <td>
                                    <button data-target="#demo-modal-wo-anim" data-toggle="modal" className="btn btn-primary btn-labeled fa fa-eye mar-rgt">Chi tiết</button>
                                    <NavLink to="/admin/product/category_detail/1" className="btn btn-warning btn-labeled fa fa-pencil mar-rgt">sửa</NavLink>
                                    <button className="btn btn-danger btn-labeled fa fa-trash-o">Xóa</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="btn-toolbar ">
                    <div className="text-right">
                        <button className="btn btn-default btn-active-purple"><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                        <button className="btn btn-default btn-active-purple">1</button>
                        <button className="btn btn-default btn-active-purple">2</button>
                        <button className="btn btn-default btn-active-purple">4</button>
                        <button className="btn btn-default btn-active-purple">5</button>
                        <button className="btn btn-default btn-active-purple">6</button>
                        <button className="btn btn-default btn-active-purple">7</button>
                        <button className="btn btn-default btn-active-purple">8</button>
                        <button className="btn btn-default btn-active-purple"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>

            {/* from alert */}
            {/* xem chi tiết */}
            <div className="modal" id="demo-modal-wo-anim" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/*Modal header*/}
                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">Tác giả:</h4>
                        </div>
                        {/*Modal body*/}
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-5">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/fistproject-d19c7.appspot.com/o/images%2F104711405_157695292490091_250783928511044112_o.jpg?alt=media&token=758dfa85-64e8-4e5b-a74e-be6d6ef66fb5" alt="lỗi" />
                                </div>
                                <div className="col-sm-7">
                                    <h4>Tên tác giả: Dưỡng is me</h4>

                                </div>
                            </div>
                        </div>
                        {/*Modal footer*/}
                        <div className="modal-footer">
                            <button data-dismiss="modal" className="btn btn-default" type="button">Close</button>
                            <button className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* thêm mới */}
            <div className="modal fade" id="add-author" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/*Modal header*/}
                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">Thêm danh mục chi tiết:</h4>
                        </div>
                        {/*Modal body*/}
                        <div className="row mar-all">
                        <div className="col-sm-4 text-right mar-lft">
                            <img width={400} src="https://firebasestorage.googleapis.com/v0/b/fistproject-d19c7.appspot.com/o/images%2F104711405_157695292490091_250783928511044112_o.jpg?alt=media&token=758dfa85-64e8-4e5b-a74e-be6d6ef66fb5" alt="lỗi" />
                            <input type="file" />
                        </div>
                        <div className="col-sm-7">
                            <form>
                                <div className="panel-body">
                                        <div className="col-sm-11">
                                            <div className="form-group">
                                                <label className="control-label">Tên tác giả</label>
                                                <input type="text" placeholder="Tên tác giả . . ." className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-sm-11">
                                            <div className="form-group">
                                                <label className="control-label">Firstname</label>
                                                <input type="text" placeholder="Tên tác giả . . ." className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-sm-11">
                                            <div className="form-group">
                                                <label className="control-label">Firstname</label>
                                                <input type="text" placeholder="Tên tác giả . . ." className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-sm-11">
                                            <div className="form-group">
                                                <label className="control-label">Firstname</label>
                                                <textarea  type="text" placeholder="Tên tác giả . . ." className="form-control" />
                                            </div>
                                        </div>
                                    <button type="reset" className="btn btn-warning">Xóa</button>
                                    <button className="btn btn-primary mar-lft">Thêm</button>
                                </div>
                            </form>

                        </div>
                    </div>
                        {/*Modal footer*/}
                        <div className="modal-footer">
                            <button data-dismiss="modal" className="btn btn-default" type="button">Close</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCategoryDetail;
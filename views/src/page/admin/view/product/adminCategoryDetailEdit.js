import {
    NavLink
} from "react-router-dom";

function AdminCategoryDetailEdit(){
    return(
        <div>
            <div class="panel">
                <div class="panel-heading">
                    <h2 className="panel-title">Thông tin danh mục chi tiết:</h2>
                    <ol className="breadcrumb">
                        <li><NavLink to="/admin" style={{ fontSize:"15px" }}>Trang chủ</NavLink></li>
                        <li><NavLink to="/admin/product/author" style={{ fontSize:"15px" }}>Danh mục</NavLink></li>
                    </ol>
                </div>
                <br />
                <br />
                <br />
                <div className="pad-all">
                    <div className="row mar-all">
                        <div className="col-sm-5 text-right">
                            <img width={400} src="https://firebasestorage.googleapis.com/v0/b/fistproject-d19c7.appspot.com/o/images%2F104711405_157695292490091_250783928511044112_o.jpg?alt=media&token=758dfa85-64e8-4e5b-a74e-be6d6ef66fb5" alt="lỗi" />
                            <input type="file" className="col-sm-7 col-sm-offset-5"/>
                        </div>
                        <div className="col-sm-7">
                            <form>
                                <div className="panel-body">
                                        <div className="col-sm-7">
                                            <div className="form-group">
                                                <label className="control-label">Tên tác giả</label>
                                                <input type="text" placeholder="Tên tác giả . . ." className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-sm-7">
                                            <div className="form-group">
                                                <label className="control-label">Firstname</label>
                                                <input type="text" placeholder="Tên tác giả . . ." className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-sm-7">
                                            <div className="form-group">
                                                <label className="control-label">Firstname</label>
                                                <input type="text" placeholder="Tên tác giả . . ." className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-sm-7">
                                            <div className="form-group">
                                                <label className="control-label">Firstname</label>
                                                <textarea  type="text" placeholder="Tên tác giả . . ." className="form-control" />
                                            </div>
                                        </div>
                                </div>
                                <div className="text-right col-sm-7">
                                    <NavLink to="/admin/product/author" className="btn btn-warning">Quay lại</NavLink>
                                    <button className="btn btn-info mar-lft" type="submit">Cập nhập</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCategoryDetailEdit;
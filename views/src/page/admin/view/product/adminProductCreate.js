import {
    NavLink
} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function AdminProductCreate(props) {
    return (
        <div>
            <div class="panel">
                <div class="panel-heading">
                    <h2 className="panel-title">Thêm mới sản phẩm:</h2>
                    <ol className="breadcrumb">
                        <li><NavLink to="/admin" style={{ fontSize: "15px" }}>Trang chủ</NavLink></li>
                        <li><NavLink to="/admin/product" style={{ fontSize: "15px" }}>Sản phẩm</NavLink></li>
                        <li><NavLink to="/admin/product" style={{ fontSize: "15px" }}>Thêm sản phẩm mới</NavLink></li>
                    </ol>
                </div>
                <br />
                <br />
                <br />
                <div className="pad-all">
                    <div className="row mar-all">
                        <div className="col-sm-10 col-sm-offset-1">
                            <div className="col-sm-4">
                                {
                                    props.loadingElm?
                                        <div className="custom-center" style={{marginTop:"30px"}}>
                                            <Box sx={{ display: 'flex' }}>
                                                <CircularProgress />
                                            </Box>
                                        </div>
                                        :
                                        <img src={props.image} />
                                }
                                <input type="file" id="img" onChange={() => { props.upImg() }} />
                            </div>
                            <div className="col-sm-8">
                                <form onSubmit={props.handleSubmit(props.onSubmitCreateProduct)}>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="form-group col-sm-10">
                                                <label className="control-label">Tên sản phẩm</label>
                                                <input type="text" placeholder="tên sản phẩm . . ." className="form-control"
                                                    {...props.register("name", { required: true })}
                                                />
                                                {props.errors.name?.type === 'required' && <span className="text-danger col-sm-12">Không được để trống</span>}
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col-sm-2">
                                                <div className="form-group">
                                                    <label className="control-label">Số trang</label>
                                                    <input type="number" placeholder="số trang . . ." className="form-control"
                                                        {...props.register("numberpages", { required: true })}
                                                    />
                                                    {props.errors.numberpages?.type === 'required' && <span className="text-danger col-sm-12">Không được để trống</span>}
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="form-group">
                                                    <label className="control-label">Năm xuất bản</label>
                                                    <input type="number" placeholder="năm xuất bản . . ." className="form-control"
                                                        {...props.register("publishyear", { required: true })}
                                                    />
                                                    {props.errors.publishyear?.type === 'required' && <span className="text-danger col-sm-12">Không được để trống</span>}
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="form-group">
                                                    <label className="control-label">Giá</label>
                                                    <input type="number" placeholder="giá sản phẩm . . ." className="form-control"
                                                        {...props.register("price", { required: true })}
                                                    />
                                                    {props.errors.price?.type === 'required' && <span className="text-danger col-sm-12">Không được để trống</span>}
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="form-group">
                                                    <label className="control-label">Số lượng</label>
                                                    <input type="number" placeholder="số lượng . . ." className="form-control"
                                                        {...props.register("quantity", { required: true })}
                                                    />
                                                    {props.errors.quantity?.type === 'required' && <span className="text-danger col-sm-12">Không được để trống</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-sm-2">
                                                <label className="control-label">Đầu sách</label>
                                                <select className="form-control"
                                                    {...props.register("title", { required: true })}
                                                >
                                                    <option value={null}>Trống</option>
                                                    {
                                                        props.listTitle.map(value => {
                                                            return (
                                                                <option value={JSON.stringify(value)}>{value.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {props.errors.title?.type === 'required' && <span className="text-danger col-sm-12">Không được để trống</span>}
                                            </div>
                                            <div className="form-group col-sm-2">
                                                <label className="control-label">Bìa sách</label>
                                                <select className="form-control"
                                                    {...props.register("form", { required: true })}
                                                >
                                                    <option>Bìa cứng</option>
                                                    <option>Bìa mềm</option>
                                                </select>
                                                {props.errors.form?.type === 'required' && <span className="text-danger col-sm-12">Không được để trống</span>}
                                            </div>
                                            <div className="form-group col-sm-3">
                                                <label className="control-label">Khu vực</label>
                                                <select className="form-control"
                                                    {...props.register("regionStr")}
                                                >
                                                    {
                                                        props.listRegion.map(value => {
                                                            return (
                                                                <option value={JSON.stringify(value)}>{value.region}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label className="control-label">Ngôn ngữ</label>
                                                    <input type="text" placeholder="ngôn ngữ . . ." className="form-control"
                                                        {...props.register("language", { required: true })}
                                                    />
                                                    {props.errors.language?.type === 'required' && <span className="text-danger col-sm-12">Không được để trống</span>}
                                                </div>
                                            </div>
                                            <div className="form-group col-sm-5">
                                                <label className="control-label">Tác giả</label>
                                                <select className="form-control"
                                                    {...props.register("authorStr", { required: true })}
                                                >
                                                    <option>Trống</option>
                                                    {
                                                        props.listAuthor.map(value => {
                                                            return (
                                                                <option value={value.id}>{value.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {props.errors.author?.type === 'required' && <span className="text-danger col-sm-12">Không được để trống</span>}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-sm-4">
                                                <label className="control-label" >Danh mục lớn</label>
                                                <select className="form-control" onChange={(e) => { props.onChangCate(e) }}>
                                                    {
                                                        props.listCate.map(value => {
                                                            return (
                                                                <option value={value.id}>{value.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group col-sm-6">
                                                <label className="control-label">Danh mục chi tiết</label>
                                                <select className="form-control" {...props.register("categorie", { required: true })} id="cate">
                                                    {
                                                        props.listCateDetails.map(value => {
                                                            return (
                                                                <option value={JSON.stringify(value)}>{value.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <label className="control-label">Nhà sản xuất</label>
                                                <input type="text" placeholder="nhà sản xuất . . ." className="form-control"
                                                    {...props.register("publisher", { required: true })}
                                                />
                                                {props.errors.publisher?.type === 'required' && <span className="text-danger col-sm-12">Không được để trống</span>}
                                            </div>
                                            <div className="col-sm-5">
                                                <label className="control-label">Nhà cung cấp</label>
                                                <input type="text" placeholder="nhà cung cấp . . ." className="form-control"
                                                    {...props.register("supplier", { required: true })}
                                                />
                                                {props.errors.supplier?.type === 'required' && <span className="text-danger col-sm-12">Không được để trống</span>}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-10">
                                                <div className="form-group">
                                                    <label className="control-label">Mô tả</label>
                                                    <textarea type="text" placeholder="mô tả . . ." className="form-control"
                                                        {...props.register("description")}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="text-right col-sm-7">
                                        <NavLink to="/admin/product" className="btn btn-warning">Quay lại</NavLink>
                                        <button className="btn btn-info mar-lft" type="submit">Thêm </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminProductCreate;
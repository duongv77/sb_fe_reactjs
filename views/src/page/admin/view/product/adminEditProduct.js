import CircularProgress from '@mui/material/CircularProgress';
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
function AdminEditProduct(props) {
    const { region, author, form, title, categorie } = props.product
    try {
        return (
            <>
                <div className="modal" id="update" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                    <div className="modal-dialog modal-lg  custom-center2">
                        <div className="modal-content custom-width-model">
                            <form id="from" onSubmit={props.handleSubmit(props.onSubmit)}>
                                <div className="modal-header">
                                    <button data-dismiss="modal" className="close" type="button">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                    <h4 className="modal-title">Sản phẩm:</h4>
                                </div>
                                <div className="modal-body" style={{ height: "600px" }}>
                                    <div className="col-sm-12">
                                        <div className="col-sm-4">
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
                                            <input type="file" id="img" onChange={() => { props.upImg() }} />
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="panel-body">
                                                <div className="row">
                                                    <div className="form-group col-sm-10">
                                                        <label className="control-label">Đầu sách</label>
                                                        <select className="form-control" name="title" onChange={props.onChange}>
                                                            <option value={null} selected={props.form.title === null ? true : false}>Trống</option>
                                                            {
                                                                props.listTitle.map(value => {
                                                                    return (
                                                                        <option key={value.id} selected={value.id === props.form.title ? true : false} value={value.id}>{value.name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col-sm-10">
                                                        <label className="control-label">Tên sản phẩm</label>
                                                        <input type="text" placeholder="tên sản phẩm . . ." className="form-control"
                                                            {...props.register("name", { maxLength: 225 })}
                                                            value={props.form.name} onChange={props.onChange}
                                                        />
                                                        {props.errors.name?.type === 'maxLength' && <span className="text-danger">Tên sản phẩm không được quá 225 kí tự!</span>}
                                                    </div>
                                                </div>
                                                <div className="row ">
                                                    <div className="col-sm-2">
                                                        <div className="form-group">
                                                            <label className="control-label">Số trang</label>
                                                            <input type="number" placeholder="số trang . . ." className="form-control"
                                                                {...props.register("numberpages", { min: 1, max: 100000 })}
                                                                value={props.form.numberpages}
                                                                onChange={props.onChange}
                                                            />
                                                            {props.errors.numberpages?.type === 'min' && <span className="text-danger">Số trang không được nhỏ hơn 1 !</span>}
                                                            {props.errors.numberpages?.type === 'max' && <span className="text-danger">Số trang không được lớn hơn 100000 !</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <div className="form-group">
                                                            <label className="control-label">Năm xuất bản</label>
                                                            <input type="number" placeholder="năm xuất bản . . ." className="form-control"
                                                                {...props.register("publishyear", { min: 1900, max: 2022 })}
                                                                value={props.form.publishyear} onChange={props.onChange}
                                                            />
                                                            {props.errors.publishyear?.type === 'min' && <span className="text-danger">Năm xuất bản không hợp lệ !</span>}
                                                            {props.errors.publishyear?.type === 'max' && <span className="text-danger">Năm xuất bản không hợp lệ !</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <div className="form-group">
                                                            <label className="control-label">Giá</label>
                                                            <input type="number" placeholder="giá sản phẩm . . ." className="form-control"
                                                                {...props.register("price", { min: 1000, max: 100000000 })}
                                                                value={props.form.price} onChange={props.onChange}
                                                            />
                                                            {props.errors.price?.type === 'min' && <span className="text-danger">Giá không được nhỏ hơn 1000 !</span>}
                                                            {props.errors.price?.type === 'max' && <span className="text-danger">Giá không được lớn hơn 100000000 !</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <div className="form-group">
                                                            <label className="control-label">Số lượng</label>
                                                            <input type="number" placeholder="số lượng . . ." className="form-control"
                                                                {...props.register("quantity", { min: 0, max: 100000 })}
                                                                value={props.form.quantity} onChange={props.onChange}
                                                            />
                                                            {props.errors.price?.type === 'min' && <span className="text-danger">Số lượng không được nhỏ hơn 0 !</span>}
                                                            {props.errors.price?.type === 'max' && <span className="text-danger">Số lượng không hợp lệ !</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col-sm-2">
                                                        <label className="control-label">Bìa sách</label>
                                                        <select className="form-control custom-hover-mouse"
                                                            name="form"
                                                            onChange={props.onChange}
                                                        >
                                                            <option selected={form === "Bìa cứng" ? true : false}>Bìa cứng</option>
                                                            <option selected={form === "Bìa mềm" ? true : false}>Bìa mềm</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-sm-3">
                                                        <label className="control-label">Khu vực</label>
                                                        <select className="form-control custom-hover-mouse" name="region" onChange={props.onChange}>
                                                            {
                                                                props.listRegion.map(value => {
                                                                    return (
                                                                        <option key={value.id} selected={value.id === props.form.region ? true : false} value={value.id}>{value.region}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-sm-3 ">
                                                        <label className="control-label">Loại sách</label>
                                                        <select className="form-control custom-hover-mouse" name="categorie" onChange={props.onChange}>
                                                            {
                                                                props.listCategories.map(value => {
                                                                    return (
                                                                        <option key={value.id} selected={value.id === props.form.categorie ? true : false} value={value.id}>{value.name}</option>
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
                                                                {...props.register("language", { maxLength: 100 })}
                                                                value={props.form.language} onChange={props.onChange}
                                                            />
                                                            {props.errors.language?.type === 'maxLength' && <span className="text-danger">Không quá 100 kí tự !</span>}
                                                        </div>
                                                    </div>
                                                    <div className="form-group col-sm-5">
                                                        <label className="control-label">Tác giả</label>
                                                        <select className="form-control custom-hover-mouse" name="author" onChange={props.onChange}>
                                                            {
                                                                props.listAuthor.map(value => {
                                                                    return (
                                                                        <option key={value.id} selected={value.id === props.form.author ? true : false} value={value.id}>{value.name}</option>
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
                                                            {...props.register("publisher", { maxLength: 200 })}
                                                            value={props.form.publisher} onChange={props.onChange}
                                                        />
                                                        {props.errors.publisher?.type === 'maxLength' && <span className="text-danger col-sm-12">Dữ liệu không hợp lệ</span>}
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <label className="control-label">Nhà cung cấp</label>
                                                        <input type="text" placeholder="nhà cung cấp . . ." className="form-control"
                                                            {...props.register("supplier", { maxLength: 200 })}
                                                            value={props.form.supplier} onChange={props.onChange}
                                                        />
                                                        {props.errors.supplier?.type === 'maxLength' && <span className="text-danger col-sm-12">Dữ liệu không hợp lệ</span>}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-10">
                                                        <div className="form-group">
                                                            <label className="control-label">Mô tả</label>
                                                            <textarea type="text" placeholder="mô tả . . ." className="form-control"
                                                                {...props.register("description", { maxLength: 1000 })}
                                                                value={props.form.description}
                                                                onChange={props.onChange}
                                                            />
                                                            {props.errors.description?.type === 'maxLength' && <span className="text-danger col-sm-12">Không được quá 1000 kí tự</span>}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div className="modal-footer">
                                    <button data-dismiss="modal" id="close-modal" className="btn btn-default" type="button">Close</button>
                                    <button type="submit" className="btn btn-success">Cập nhập</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    } catch (error) {
        return null
    }
}

export default AdminEditProduct;
import {
    NavLink
} from "react-router-dom";
import TextField from '@mui/material/TextField';
import { SwapSpinner } from "react-spinners-kit";
import { convertDateCustom, numberWithCommas } from "../../../../Service/common";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { useState } from "react"

function AdminPromotion(props) {
    const { promotion } = props

    const { register } = props

    const slSanpham = () => {
        try {
            return props.listPromotiondetail.length
        } catch (error) {
            return 0
        }
    }

    const [value, setValue] = useState('1');
    const [superfluous, setSuperfluous] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <div class="panel">
                <div class="panel-heading">
                    <ol className="breadcrumb">
                        <li><NavLink to="/admin" style={{ fontSize:"15px" }}>Trang chủ</NavLink></li>
                        <li><NavLink to="/admin/promotion" style={{ fontSize:"15px" }}>Giảm giá</NavLink></li>
                        <li><NavLink to="/admin/promotion" style={{ fontSize:"15px" }}>Thông tin chương trình</NavLink></li>
                    </ol>
                </div>
                <br />
                <br />
                {
                    props.loadingElm === true ?
                        <div className="custom-center">
                            <SwapSpinner size={40} color="#686769" loading={props.loadingElm} ></SwapSpinner>
                        </div>
                        :
                        <div>
                            <div >
                                <div className="row">
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-10">
                                        <h3 className="panel-title">Thông tin chương trình:</h3>
                                        <div className="mar-lft">
                                            <div className="col-sm-1"></div>
                                            <div className="col-sm-10">
                                                <form>
                                                    <div className="col-sm-8">
                                                        <div className="form-group row">
                                                            <div className="col-sm-3">
                                                                <label className="control-label">Tên chương trình:</label>
                                                            </div>
                                                            <div className="col-sm-9">
                                                                <input type="text"
                                                                    name="name"
                                                                    {...register("name", { required: true })}
                                                                    value={props.promotionForm !== undefined ? props.promotionForm.name : ""}
                                                                    onChange={props.onChange}
                                                                    placeholder="Tên chương trình . . ." className="form-control" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <div className="col-sm-3">
                                                                <label className="control-label">Giảm giá(<span className="text-danger">%</span>):</label>
                                                            </div>
                                                            <div className="col-sm-2">
                                                                <input type="number"
                                                                    name="sale"
                                                                    value={props.promotionForm !== undefined ? props.promotionForm.sale : ""}
                                                                    onChange={props.onChange}
                                                                    placeholder="% giảm . . ." className="form-control" disabled/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <div className="col-sm-3">
                                                                <label className="control-label">Thời gian:</label>
                                                            </div>
                                                            <div className="col-sm-9">
                                                                <div className="row">
                                                                    <div className="col-sm-6">
                                                                        <TextField
                                                                            id="datetime-local"
                                                                            label="Thời gian bắt đầu"
                                                                            type="date"
                                                                            name="createDate"
                                                                            defaultValue={props.promotionForm !== undefined ? props.promotionForm.createDate : ""}
                                                                            sx={{ width: 250 }}
                                                                            onChange={props.onChange}
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                            }}
                                                                            disabled
                                                                        />
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <TextField
                                                                            id="datetime-local"
                                                                            label="Thời gian kết thúc"
                                                                            type="date"
                                                                            name="endDate"
                                                                            defaultValue={props.promotionForm !== undefined ? props.promotionForm.endDate : ""}
                                                                            sx={{ width: 250 }}
                                                                            onChange={props.onChange}
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                            }}
                                                                            disabled
                                                                        />
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <div className="col-sm-3">
                                                                <label className="control-label">Mô tả:</label>
                                                            </div>
                                                            <div className="col-sm-9">
                                                                <textarea type="text"
                                                                    name="description"
                                                                    onChange={props.onChange}
                                                                    value={props.promotionForm !== undefined ? props.promotionForm.description : ''}
                                                                    placeholder="Mô tả . . ."
                                                                    className="form-control" />
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <NavLink to="/admin/promotion" className="btn btn-warning btn-labeled fa fa-undo " >Quay lại</NavLink>
                                                            <button className="btn btn-success btn-labeled fa fa-pencil mar-lft" onClick={(e) => props.onClickUpdatePromotion(e)}>Cập nhập</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div >
                                <div className="row">
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-10">
                                        <TabContext value={value}>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                    <Tab label="Danh mục" value="1" />
                                                    <Tab label="Sản phẩm" value="2" />
                                                </TabList>
                                            </Box>
                                            <TabPanel value="1">
                                                <div>
                                                    <div className="col-sm-6">
                                                        <h3 className="panel-title">Danh mục nằm trong khuyến mãi :{slSanpham()} danh mục</h3>

                                                    </div>
                                                    <div className="col-sm-6 text-lg-right">
                                                        <button data-target="#add-category" data-toggle="modal" className="btn btn-success mar-lft">Thêm danh mục</button>
                                                    </div>
                                                </div>
                                                <div class="panel-body">
                                                    <table id="demo-dt-basic" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                                        <thead>
                                                            <tr>
                                                                <th width={40}>Id</th>
                                                                <th className="min-tablet" >Tên danh mục</th>
                                                                <th width={80}>Thao tác</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                props.listCategories.map(value => {
                                                                    const { categorie } = value
                                                                    return (
                                                                        <tr>
                                                                            <td>{categorie.id}</td>
                                                                            <td>{categorie.name}</td>
                                                                            <td className="custom-center">
                                                                                <button className="btn btn-danger" onClick={() => { props.onCLickDeleteCate(value) }}><i className="fa fa-trash-o"></i></button>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="2">
                                                <div>
                                                    <div className="col-sm-6">
                                                        <h3 className="panel-title">Sản phẩm nằm trong khuyến mãi: {slSanpham()} sản phẩm</h3>
                                                    </div>
                                                    <div className="col-sm-6 text-lg-right">
                                                        <button data-target="#add-product" data-toggle="modal" className="btn btn-success mar-lft">Black list</button>
                                                    </div>
                                                </div>
                                                <div class="panel-body">
                                                    <table id="demo-dt-basic" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                                        <thead>
                                                            <tr>
                                                                <th width={40}>Id</th>
                                                                <th>sản phẩm</th>
                                                                <th className="min-tablet" width={130}>Hình ảnh</th>
                                                                <th className="min-tablet" width={60}>Số lượng</th>
                                                                <th className="min-tablet" width={150}>Giá trước khi giảm</th>
                                                                <th className="min-desktop" width={150}>Tiền giảm</th>
                                                                <th className="min-desktop" width={150}>Giá sau khi giảm</th>
                                                                <th width={50}>Thao tác</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                props.listProduct.map(value => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{value.id}</td>
                                                                            <td>{value.title==null?value.name:value.title.name+" "+value.name}</td>
                                                                            <td className="custom-center"><img src={value.image} height={50} alt=""></img></td>
                                                                            <td>{value.quantity}</td>
                                                                            <td>{numberWithCommas(value.price)}₫</td>
                                                                            <td>{numberWithCommas((value.price * (promotion.sale / 100)).toFixed(0))}₫ </td>
                                                                            <td>{numberWithCommas((value.price * (1 - promotion.sale / 100)).toFixed(0))}₫</td>
                                                                            <td>
                                                                                <button className="btn btn-danger" onClick={() => { props.onClickDeleteProduct(value) }}><i className="fa fa-trash-o"></i></button>
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
                                        {/* danh sách sản phẩm */}
                                        <div className="modal" id="add-product" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                                            <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    {/*Modal header*/}
                                                    <div className="modal-header">
                                                        <button data-dismiss="modal" className="close" type="button">
                                                            <span aria-hidden="true">×</span>
                                                        </button>
                                                        <h4 className="modal-title">Danh sách sản phẩm bị loại khỏi chương trình:</h4>
                                                    </div>
                                                    {/*Modal body*/}
                                                    <div className="row ">

                                                        <div className="col-sm-1"></div>
                                                        <div className="col-sm-10">
                                                            <div className="searchbox ">
                                                                <div className="input-group custom-search-form">
                                                                    <input type="text" className="form-control" placeholder="Search.." />
                                                                    <span className="input-group-btn">
                                                                        <button className="text-muted" type="button"><i className="fa fa-search" /></button>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                                                <thead>
                                                                    <tr>
                                                                        <th width={50}>ID</th>
                                                                        <th>Sản phẩm</th>
                                                                        <th width={130}>Hình ảnh</th>
                                                                        <th width={90}>Giá</th>
                                                                        <th className="min-tablet" width={50}>Số lượng</th>
                                                                        <th className="min-desktop col-sm-1" >Thao tác</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        props.listProductBlackList.map(value => {
                                                                            return (
                                                                                <tr>
                                                                                    <td>{value.id}</td>
                                                                                    <td>{value.title === null ? value.name : value.title.name + " " + value.name}</td>
                                                                                    <td className="custom-center"><img src={value.image} height={50} alt=""></img></td>
                                                                                    <td>{numberWithCommas(value.price)}₫</td>
                                                                                    <td>{value.quantity}</td>
                                                                                    <td>
                                                                                        <button title="Khôi phục" className="btn btn-danger" onClick={() => { props.onCLickDeleteBlackList(value) }}><i class="fa fa-undo" aria-hidden="true"></i></button>
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
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
                                                    </div>
                                                    {/*Modal footer*/}
                                                    <div className="modal-footer">
                                                        <button data-dismiss="modal" className="btn btn-default" type="button">Close</button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal" id="add-category" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                                            <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    {/*Modal header*/}
                                                    <div className="modal-header">
                                                        <button data-dismiss="modal" className="close" type="button">
                                                            <span aria-hidden="true">×</span>
                                                        </button>
                                                        <h4 className="modal-title">Danh sách danh mục có thể thêm vào chương trình:</h4>
                                                    </div>
                                                    {/*Modal body*/}
                                                    <div className="row ">

                                                        <div className="col-sm-1"></div>
                                                        <div className="col-sm-10">
                                                            <div className="searchbox ">
                                                                <div className="input-group custom-search-form">
                                                                    <input type="text" className="form-control" placeholder="Search.." />
                                                                    <span className="input-group-btn">
                                                                        <button className="text-muted" type="button"><i className="fa fa-search" /></button>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                                                <thead>
                                                                    <tr>
                                                                        <th width={50}>ID</th>
                                                                        <th>Danh mục</th>
                                                                        <th width={80}>Thao tác</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        props.listCategoriesNotPromotion.map(value => {
                                                                            return (
                                                                                <tr>
                                                                                    <td>{value.id}</td>
                                                                                    <td>{value.name}</td>
                                                                                    <td>
                                                                                        <button title="Thêm" className="btn btn-success" onClick={() => { props.onClickCreatePromotionCategorie(value) }}><i class="fa fa-plus" aria-hidden="true"></i></button>
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
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
                                                    </div>
                                                    {/*Modal footer*/}
                                                    <div className="modal-footer">
                                                        <button data-dismiss="modal" className="btn btn-default" type="button">Close</button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}

export default AdminPromotion;
import {
    NavLink
} from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

function FavoriteProduct(props) {
    return (
        <div>
            <div class="panel">
                <div class="panel-heading">
                    <h2 className="panel-title" >Sản phẩm được yêu thích:</h2>
                    <ol className="breadcrumb">
                        <li><NavLink to="/admin"style={{ fontSize:"15px" }}>Trang chủ</NavLink></li>
                        <li><NavLink to="/admin/statistic/favorite_product"style={{ fontSize:"15px" }}>Sản phẩm được yêu thích</NavLink></li>
                    </ol>
                </div>
                <br />
                <br />
                <br />
                <div id="page-title" className="mar-top">
                    <div className="mar-top">
                        {/* <span className="mar-rgt">Hiển thị</span>
                        <Select displayEmpty>
                            <MenuItem value=""><span>Tất cả</span> </MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                        </Select>
                        <span className="mar-rgt">Sắp xếp</span>
                        <Select displayEmpty>
                            <MenuItem value="">Sắp xếp theo tên </MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                        </Select> */}
                    </div>
                    <div className="searchbox">
                        <div className="input-group custom-search-form">
                            <input type="text" className="form-control" placeholder="Tên sản phẩm..." />
                            <span className="input-group-btn">
                                <button className="text-muted" type="button"><i className="fa fa-search" /></button>
                            </span>
                        </div>
                    </div>
                </div>



                <div class="panel-body">
                    <table id="demo-dt-basic" class="table table-striped table-bordered" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th width={50}>STT</th>
                                <th>ID</th>
                                <th class="min-tablet">Sản phẩm</th>
                                <th class="min-tablet">Tên sách</th>
                                <th class="min-tablet">Số lượt yêu thích</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.listProduct.map((value, index) => {
                                    if (props.page * props.size > index) return null
                                    if ((props.page + 1) * props.size < index + 1) return null
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{value.id}</td>
                                            <td><img src={value.image} height={50}/></td>
                                            <td>{value.title==null?value.name: value.title.name+ " "+value.name }</td>
                                            <td>{value.favorite.length}</td>
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
                        <span> {(props.page + 1) * props.size > props.listProduct.length ? props.listProduct.length : (props.page + 1) * props.size}
                            / {props.listProduct.length}</span>
                        <button className="btn btn-default btn-active-purple mar-lft" onClick={() => { props.clickPre() }}><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                        <button className="btn btn-default btn-active-purple">{props.page + 1}</button>
                        <button className="btn btn-default btn-active-purple" onClick={() => { props.clickNext() }}><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default FavoriteProduct;

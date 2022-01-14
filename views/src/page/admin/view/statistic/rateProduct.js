import {
    NavLink
} from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Rating from '@mui/material/Rating';

function RateProduct(props) {
    const sum1star = (rate) => {
        let total = 0
        rate.map(elm => {
            if (elm.vote == 1) total++
        })
        return total
    }
    const sum2star = (rate) => {
        let total = 0
        rate.map(elm => {
            if (elm.vote == 2) total++
        })
        return total
    }
    const sum3star = (rate) => {
        let total = 0
        rate.map(elm => {
            if (elm.vote == 3) total++
        })
        return total
    }
    const sum4star = (rate) => {
        let total = 0
        rate.map(elm => {
            if (elm.vote == 4) total++
        })
        return total
    }
    const sum5star = (rate) => {
        let total = 0
        rate.map(elm => {
            if (elm.vote == 5) total++
        })
        return total
    }
    return (
        <div>
            <div class="panel">
                <div class="panel-heading">
                    <h2 className="panel-title" >Đánh giá sản phẩm:</h2>
                    <ol className="breadcrumb">
                        <li><NavLink to="/admin" style={{ fontSize: "15px" }}>Trang chủ</NavLink></li>
                        <li><NavLink to="/admin/statistic/product_rate" style={{ fontSize: "15px" }}>Đánh giá sản phẩm</NavLink></li>
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
                                <th>STT</th>
                                <th>ID</th>
                                <th class="min-tablet">Sản phẩm</th>
                                <th class="min-tablet">Tên sách</th>
                                <th class="min-tablet">Đánh giá trung bình</th>
                                <th class="min-tablet">1 Sao(Lượt)</th>
                                <th class="min-tablet">3 Sao(Lượt)</th>
                                <th class="min-tablet">2 Sao(Lượt)</th>
                                <th class="min-tablet">4 Sao(Lượt)</th>
                                <th class="min-tablet">5 Sao(Lượt)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.listProduct.map((value, index) => {
                                    if (props.page * props.size > index) return null
                                    if ((props.page + 1) * props.size < index + 1) return null
                                    const { rate } = value
                                    return (
                                        <tr key={index}>
                                            <td width={60}>{index+1}</td>
                                            <td>{value.id}</td>
                                            <td><img src={value.image} height={50} /></td>
                                            <td>{value.title == null ? value.name : value.title.name + " " + value.name}</td>
                                            <td>
                                                <Rating
                                                    size="small"
                                                    name="simple-controlled"
                                                    value={value.avgRating} readOnly
                                                />
                                            </td>
                                            <td>{sum1star(rate)}</td>
                                            <td>{sum2star(rate)}</td>
                                            <td>{sum3star(rate)}</td>
                                            <td>{sum4star(rate)}</td>
                                            <td>{sum5star(rate)}</td>
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

export default RateProduct;
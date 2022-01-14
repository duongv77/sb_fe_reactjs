import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { useState } from "react"
import TextField from '@mui/material/TextField';
import { numberWithCommas } from '../../../../Service/common';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });
  
  const NoMaxWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 'none',
    },
  });

function AdminCreateOrder(props) {
    const [value, setValue] = useState('1');
    const [superfluous, setSuperfluous] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const onChangeValuePrice = (e) => {
        const { value } = e.target
        const brand = Number(value) - (total + total * 0.1)
        if (brand > 0) {
            setSuperfluous(brand)
        } else {
            setSuperfluous(0)
        }
    }

    let totalQuantity: number = 0
    let total: number = 0
    let totalNoSale: number = 0

    const checkSizeText = (value) => {
        if(value.length > 25){
            return value.slice(0, 25) + "..."
        }
        return value
    }

    return (
        <div className="container-fluid ">
            <div className="row">
                <TabContext value={props.valueTabDefault}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            value={value}
                            onChange={props.handleChangeTab}
                            variant="scrollable"
                            scrollButtons
                            aria-label="visible arrows tabs example"
                            sx={{
                                [`& .${tabsClasses.scrollButtons}`]: {
                                    '&.Mui-disabled': { opacity: 0.3 },
                                },
                            }}
                        >
                            {
                                props.tabQuantity.map((value, index) => {
                                    index++
                                    return (
                                        <Tab sx={{ width: 130 }} key={index} label={"Đơn hàng " + index} value={value.id} />
                                    )
                                })
                            }
                            <a onClick={props.onClickAddTab} className="custom-hover-mouse custom-hover-add-tab"><i class="fa fa-plus" aria-hidden="true"></i></a>
                        </TabList>
                    </Box>
                </TabContext>
                <div className="col-sm-9 ">
                    <div className="custom-height1">
                        <div className="row ">
                            <div class="panel-body">
                                <table className="table table-hover table-vcenter" style={{ width: "100%" }}>
                                    <tbody>
                                        {
                                            props.listOrderDetail.map((value, index) => {
                                                const { product, sale, quantity, price } = value
                                                totalQuantity += Number(quantity)
                                                const tt = sale === null ? price * quantity : (price * quantity * (1 - sale / 100)).toFixed(0)
                                                total += Number(tt)
                                                totalNoSale += quantity * price
                                                return (
                                                    <tr key={index}>
                                                        <td width={20}>{index + 1}</td>
                                                        <td width={80} className="text-center"><img height={30} src={product.image} alt="" /></td>
                                                        <td>{product.title !== null ? product.title.name + " " + product.name : product.name} </td>
                                                        <td width={100}>{numberWithCommas(product.price)}₫</td>
                                                        <td width={100} className="text-center"><TextField type="number" onChange={(e) => { props.onChangeQuantity(e, value) }} value={quantity} id="standard-basic" variant="standard" sx={{ width: '7ch' }} /></td>
                                                        <td width={100} className="text-center"><span className="text-danger text-semibold">{sale !== null ? "-" + sale + "%" : "----"}</span></td>
                                                        <td width={100}>{numberWithCommas(tt)}₫</td>
                                                        <td width={40}><a href="#" onClick={(e) => { props.onClickDeleteOrder(e, value) }} className="custom-a-delete"><i className="fa fa-trash-o" aria-hidden="true"></i></a></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="custom-height2">
                        <div style={{ marginBottom: "-30px", opacity: "0.7" }}>
                            <button className="btn btn-default" onClick={props.onClickPre}>
                                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                            </button>
                            <button className="btn btn-default" onClick={props.onClickNext}>
                                <i class="fa fa-chevron-right" aria-hidden="true"></i>
                            </button>
                            <input type="text" className="custom-select mar-lft" placeholder="Tìm kiếm . . ." onChange={props.onChangeSearch} />
                            <span className="mar-lft">{props.page * 18 < props.listProduct.length ? props.page * 18 : props.listProduct.length}/{props.listProduct.length}</span>
                        </div>
                        <div className="custom-row">
                            {
                                props.listProduct.map((value, index) => {
                                    if ((props.page - 1) * 18 > index) return null
                                    if (props.page * 18 < index + 1) return null
                                    const { product } = value
                                    const name = product.title !== null ? product.title.name + " "+product.name : product.name
                                    return (
                                        <Tooltip  placement="top-start" title={name}>
                                            <div onClick={() => { props.onClickProduct(product) }} className=" custom-border" style={{ textAlign: "center", padding: "10px" }}>
                                                <img src={product.image} className="custom-image" alt="" />
                                                <span className="custom-price">{numberWithCommas(product.price)}₫</span>
                                                <span style={{ display: "inline-block" }}>{checkSizeText(name)}</span>
                                            </div>
                                        </Tooltip>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Hóa đơn" value="1" />
                                <Tab label="Đặt hàng" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {/* hóa đơn */}
                            <div className="row" style={{ margin: "-24px" }}>
                                <div className="col-sm-7">
                                    <p style={{ fontSize: "17px" }}>Tổng tiền({totalQuantity}):</p>
                                    <p style={{ fontSize: "17px" }}>Giảm giá:</p>
                                    <p style={{ fontSize: "17px" }}>VAT 10%:</p>
                                    <p style={{ fontSize: "17px" }} className="text-bold">Thanh toán<span className="text-danger">*:</span></p>
                                    <p style={{ fontSize: "17px", marginTop: "25px" }}>Khách thanh toán:</p>
                                    <p style={{ fontSize: "17px" }}>Tiền thừa:</p>

                                </div>
                                <div className="col-sm-5 text-right">
                                    <p style={{ fontSize: "17px" }}>{numberWithCommas(totalNoSale)}₫</p>
                                    <p style={{ fontSize: "17px" }}>{numberWithCommas(totalNoSale - total)}₫</p>
                                    <p style={{ fontSize: "17px" }}>{numberWithCommas(total * 0.1)}₫</p>
                                    <p className="text-danger text-bold" style={{ fontSize: "17px" }}>{numberWithCommas(total + total * 0.1)}₫</p>
                                    <p style={{ fontSize: "17px" }}><TextField type="number" onChange={onChangeValuePrice} variant="standard" sx={{ width: '12ch' }} /></p>
                                    <p style={{ fontSize: "17px" }}>{numberWithCommas(superfluous)}₫</p>
                                </div>
                            </div>
                            <div>
                                <TextField value={props.profile.fullname} onChange={props.onChangProfile} name="fullname" label="Tên khách hàng" variant="standard" sx={{ m: 1, width: '40ch' }} />
                                <TextField value={props.profile.phone} onChange={props.onChangProfile} name="phone" label="Số điện thoại khách hàng" variant="standard" sx={{ m: 1, width: '40ch' }} />
                                <TextField value={props.profile.address} onChange={props.onChangProfile} name="address" label="Địa chỉ" variant="standard" sx={{ m: 1, width: '40ch' }} />
                            </div>
                            <div className="custom-order row">
                                <button onClick={props.onClickThanhToan} className="btn btn-success custom-btn">Thanh toán</button>

                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            {/* order online */}
                            <form onSubmit={props.handleSubmit(props.onClickThanhToanOnline)}>
                                <div className="row" style={{ margin: "-24px" }}>
                                    <div className="col-sm-7">
                                        <p style={{ fontSize: "17px" }}>Tổng tiền({totalQuantity}):</p>
                                        <p style={{ fontSize: "17px" }}>Giảm giá:</p>
                                        <p style={{ fontSize: "17px" }}>VAT 10%:</p>
                                        <p style={{ fontSize: "17px" }}>Phí giao hàng:</p>
                                        <p style={{ fontSize: "17px" }} className="text-bold">Thanh toán<span className="text-danger">*:</span></p>

                                    </div>
                                    <div className="col-sm-5 text-right">
                                        <p style={{ fontSize: "17px" }}>{numberWithCommas(totalNoSale)}₫</p>
                                        <p style={{ fontSize: "17px" }}>{numberWithCommas(totalNoSale - total)}₫</p>
                                        <p style={{ fontSize: "17px" }}>{numberWithCommas(total * 0.1)}₫</p>
                                        <p style={{ fontSize: "17px" }}><TextField type="number" value={props.shipping}
                                            onChange={(e) => {
                                                const { value } = e.target
                                                if (+value > 100000) {
                                                    props.setShipping(100000)
                                                    return
                                                }
                                                props.setShipping(+value)
                                            }}
                                            variant="standard" sx={{ width: '12ch' }} /></p>
                                        <p className="text-danger text-bold" style={{ fontSize: "17px" }}>{numberWithCommas(total + totalNoSale * 0.1 + props.shipping)}₫</p>
                                    </div>
                                </div>
                                <div>
                                    <TextField
                                        {...props.register("fullname", { required: true, maxLength: 50 })}
                                        value={props.profile.fullname} onChange={props.onChangProfile}
                                        label="Tên khách hàng" variant="standard" sx={{ m: 1, width: '40ch' }}
                                    />
                                    {props.errors.fullname?.type === 'maxLength' && <span className="text-danger">Tên khách hàng không được quá 50 kí tự!</span>}
                                    {props.errors.fullname?.type === 'required' && <span className="text-danger">Không được để trống tên khách hàng!</span>}
                                    <TextField
                                        {...props.register("phone", { required: true, pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g })}
                                        value={props.profile.phone} onChange={props.onChangProfile}
                                        label="Số điện thoại khách hàng" variant="standard" sx={{ m: 1, width: '40ch' }}
                                    />
                                    {props.errors.phone?.type === 'pattern' && <span className="text-danger">Số điện thoại không đúng định dạng!</span>}
                                    {props.errors.phone?.type === 'required' && <span className="text-danger">Không được để trống số điện thoại!</span>}
                                    <TextField
                                        {...props.register("address", { required: true })}
                                        value={props.profile.address} onChange={props.onChangProfile} name="address"
                                        label="Địa chỉ khách hàng" variant="standard" sx={{ m: 1, width: '40ch' }}
                                    />
                                    {props.errors.address?.type === 'required' && <span className="text-danger">Không được để trống địa chỉ!</span>}
                                </div>
                                <div className="custom-order row">
                                    <button type="submit" className="btn btn-success custom-btn">Đặt hàng</button>
                                </div>
                            </form>
                        </TabPanel>
                    </TabContext>
                </div>
            </div>
        </div>
    )
}

export default AdminCreateOrder;
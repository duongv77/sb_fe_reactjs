import { NavLink } from "react-router-dom";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { numberWithCommas } from "../../../Service/common";
import { useState } from "react";
import { toast } from "react-toastify";
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

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

function Cart(props) {
    const [check, setCheck] = useState(false)
    const onChange = (e) => {
        const { checked } = e.target
        setCheck(checked)
    }

    const onClickFalse = () => {
        toast.warning("Bạn chưa đồng ý điều khoản!")
    }
    let totalShipping = props.total + props.total * 0.1 + props.shipping

    return (
        <div>
            {/* MAIN-CONTENT-SECTION START */}
            <section className="main-content-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {/* BSTORE-BREADCRUMB START */}
                            <div className="bstore-breadcrumb">
                                <a href="index.html">Trang chủ</a>
                                <span><i className="fa fa-caret-right	" /></span>
                                <span>Giỏ hàng</span>
                            </div>
                            {/* BSTORE-BREADCRUMB END */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {/* SHOPPING-CART SUMMARY START */}
                            <h2 className="page-title">Sản phẩm trong giỏ hàng <span className="shop-pro-item">Bạn có {props.productInCart} sản phẩm trong giỏ hàng</span></h2>
                            {/* SHOPPING-CART SUMMARY END */}
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {/* SHOPING-CART-MENU END */}
                            {/* CART TABLE_BLOCK START */}
                            <div className="table-responsive">
                                {/* TABLE START */}
                                <table className="table table-bordered" id="cart-summary">
                                    {/* TABLE HEADER START */}
                                    <thead>
                                        <tr>
                                            <th width={40}>
                                               
                                            </th>
                                            <th className=" text-center"> Id</th>
                                            <th className=" text-center" width={110}>Hình ảnh</th>
                                            <th >Tên sản phẩm</th>
                                            <th className=" text-center" >Đơn giá</th>
                                            <th width={100} >Số lượng</th>
                                            <th className=" text-center">Sale</th>
                                            <th className=" text-center" style={{ minWidth: "180px" }}>Thành tiền</th>
                                            <th className=" text-center">Thao tác</th>
                                        </tr>
                                    </thead>
                                    {
                                        props.loadingElm ?
                                            <Box sx={{ display: 'flex' }} className="custom-center">
                                                <CircularProgress />
                                            </Box> :
                                            <tbody>
                                                {
                                                    props.productCart === null ? "Bạn chưa có sản phẩm nào trong giở hàng !" :
                                                        props.productCart.map(function (value, index) {
                                                            const { cartdetail, sale } = value
                                                            const { product, quantity } = cartdetail
                                                            return (
                                                                <tr key={index}>
                                                                    <td className=" text-center">
                                                                        <Checkbox
                                                                            id="checkbox"
                                                                            defaultChecked={false}
                                                                            inputProps={{ 'aria-label': 'primary  checkbox' }}
                                                                            onClick={(e) => {
                                                                                props.onClickCheckbox(e, value)
                                                                            }}
                                                                        />
                                                                    </td>
                                                                    <td className=" text-center">{product.id}</td>
                                                                    <td >
                                                                        <div className="cart-product text-center">
                                                                            <div >
                                                                                <NavLink to={`/viewCartdetail_${product.id}`}>
                                                                                    <img
                                                                                        src={product.image}
                                                                                        alt={product.image}
                                                                                        height={50}
                                                                                    />
                                                                                </NavLink>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <td className="cart-description">
                                                                            <p className="product-name"><a href="#"><p>{product.title == null ? product.name : product.title.name + " " + product.name}</p></a></p>
                                                                        </td>
                                                                    </td>
                                                                    <td className="cart-unit">
                                                                        <ul className=" text-center">
                                                                            <h4 className="price">{numberWithCommas(product.price)} ₫</h4>
                                                                        </ul>
                                                                    </td>
                                                                    <td>
                                                                        <div className=" text-center" >
                                                                            <div className="form-group">
                                                                                <input type="number" onChange={(e) => { props.onChangeQuantity(e, cartdetail) }} className="form-control text-center" value={cartdetail.quantity} />
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className=" text-center">
                                                                        {sale !== null ? sale + "%" : ""}
                                                                    </td>
                                                                    <td className=" text-center">
                                                                        <h4>{numberWithCommas((sale === null ? quantity * product.price : quantity * product.price * (1 - sale / 100)).toFixed(0))}₫</h4>
                                                                    </td>
                                                                    <td className="cart-delete text-center">
                                                                        <span>
                                                                            <a href="#" className="cart_quantity_delete" title="Delete" onClick={() => { props.deleteCart(cartdetail.id) }}><i className="fa fa-trash-o" /></a>
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                            </tbody>
                                    }
                                    {/* TABLE BODY END */}
                                    {/* TABLE FOOTER START */}
                                    <tfoot>
                                        <tr className="cart-total-price">
                                            <td className="cart_voucher" colSpan={3} rowSpan={4} />
                                            <td className="text-right" colSpan={4}>Tổng tiền</td>
                                            <td id="total_product" className="price" colSpan={1}>{numberWithCommas(props.total.toFixed(0))}₫</td>
                                        </tr>
                                        <tr>
                                            <td className="text-right" colSpan={4}>Phí giao hàng</td>
                                            <td id="total_shipping" className="price" colSpan={1}>{props.total === 0 ? 0 : numberWithCommas(props.shipping)}₫</td>
                                        </tr>
                                        <tr>
                                            <td className="text-right" colSpan={4}>Thuế(VAT 10%)</td>
                                            <td className="price" colSpan={1}>{numberWithCommas((props.total * 0.1).toFixed(0))}₫</td>
                                        </tr>
                                        <tr>
                                            <td className="total-price-container text-right" colSpan={4}>
                                                <span>Tổng hóa đơn</span>
                                            </td>
                                            <td id="total-price-container" className="price" colSpan={1}>
                                                <span id="total-price" style={{ color: "red" }}>{props.total === 0 ? 0 : numberWithCommas(totalShipping.toFixed(0))}₫</span>
                                            </td>
                                        </tr>
                                    </tfoot>
                                    {/* TABLE FOOTER END */}
                                </table>
                                {/* TABLE END */}
                            </div>
                            {/* CART TABLE_BLOCK END */}
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="first_item primari-box mycartaddress-info">
                                {/* SINGLE ADDRESS START */}
                                <ul className="address">
                                    <li>
                                        <h3 className="page-subheading box-subheading">
                                            Thông tin cửa hàng
                                        </h3>
                                    </li>
                                    <li><span className="address_name">Địa Chỉ : Số 1 Trịnh Văn Bô-Phương Canh-Nam Từ Niêm-Hà Nội</span></li>
                                    <li><span className="address_company">Số Điện Thoại : 0968.397.968</span></li>
                                    <li><span className="address_phone_mobile">Hotline : 024.368.6789</span></li>
                                    <li><span className="address_address1">Email : Beebook1368@gmail.com</span></li>
                                    <a className="custom-hover-mouse" data-target="#model-alert-dieukhoan" data-toggle="modal">Xem điều khoản!</a>
                                    {/* <li><span className="address_address2">D-Block</span></li>
                                    <li><span className>Rampura</span></li>
                                    <li><span className>Dhaka</span></li>      
                                    <li><span className="address_phone">+880 1735161598</span></li>
                                    <li><span className="address_phone_mobile">+880 1975161598</span></li> */}
                                </ul>
                                {/* SINGLE ADDRESS END */}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="second_item primari-box mycartaddress-info">
                                {/* SINGLE ADDRESS START */}
                                <ul className="address">
                                    <li>
                                        <h3 className="page-subheading box-subheading">
                                            Thông tin người mua
                                        </h3>
                                    </li>
                                    <li><span className="address_name">Họ tên: {props.account.fullname}</span></li>
                                    <li><span className="address_company">Email đăng ký: </span>{props.account.email}</li>
                                    <li><span className="address_address1">Sđt: {props.account.phone}</span></li>
                                    <li><a href="#" title="Đổi địa chỉ" data-target="#update-address" data-toggle="modal"
                                        style={{ fontSize: "18px", color: "black" }}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                                        <span className="address_address2">Địa chỉ nhận hàng: {props.mainAddress}</span></li>
                                </ul>

                                {/* SINGLE ADDRESS END */}
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {/* RETURNE-CONTINUE-SHOP START */}
                            <div className="returne-continue-shop">
                                {/* <a href="index.html" className="continueshoping"><i className="fa fa-chevron-left" />Continue shopping</a> */}
                                <a href="#" className="procedtocheckout" onClick={props.handleOpenOrder}>Đặt hàng</a>
                            </div>
                            {/* RETURNE-CONTINUE-SHOP END */}
                        </div>
                    </div>
                </div>
            </section>

            <div className="modal" id="update-address" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">Thay đổi địa chỉ</h4>
                        </div>
                        <div className="modal-body">
                            <FormControl component="fieldset">
                                <RadioGroup
                                    defaultValue={0}
                                    name="radio-buttons-group"
                                >
                                    {
                                        props.listAddress !== null ?
                                            props.listAddress.map(value => {
                                                return (
                                                    <FormControlLabel onChange={() => { props.onChangeAddress(value.address) }} key={value.id} value={value.id} control={<Radio />} label={value.address} />
                                                )
                                            }) : "Bạn chưa có thêm địa chỉ nào"
                                    }
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="modal-footer">
                            <button data-dismiss="modal" className="btn btn-default" type="button">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={props.openOrder}
                onClose={props.handleCloseOrder}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 600, height: 400 }}>
                    <div className="modal-header" style={{ marginTop: "-10px" }}>
                        <button data-dismiss="modal" className="close" type="button">
                            <span aria-hidden="true" onClick={props.handleCloseOrder}>×</span>
                        </button>
                        <h4 className="modal-title">Đặt hàng</h4>
                    </div>
                    <div className="modal-body">
                        <div style={{ marginLeft: "15px", marginBottom: "-10px" }}>
                            <p>Đơn hàng của bạn cần phải đặt cọc {numberWithCommas(props.datcoc.toFixed(0))}đ</p>
                            <p>Bạn vui lòng chuyển khoản đến tài khoản để đặt hàng</p>
                            <p className="text-danger">Với nội dung: username(số điện thoại) + CKDC  </p>
                            <p>Tài khoản hưởng thụ: BIDV 1234546 - Chủ khoản SHOPBOOK</p>
                            <p className="custom-hover-mouse" data-target="#model-alert-dieukhoan" data-toggle="modal" data-dismiss="modal">Xem điều khoản!</p>
                        </div>
                        <Checkbox checked={check} onChange={onChange} color="secondary" id="confirm" />Đã hiểu
                    </div>
                    <div className="modal-footer" style={{ backgroundColor: "white", position: 'absolute', bottom: '1px', right: '10px', width: '98%' }}>
                        <button onClick={props.handleCloseOrder} className="btn btn-default" type="button">Đóng</button>
                        <button onClick={(e) => { 
                            if(check){
                                props.handleOpen() 
                            }else{
                                toast.warning("Vui lòng chọn đồng ý")
                            }
                        }}  className="btn btn-success" type="submit">Tạo</button>
                    </div>
                </Box>
            </Modal>
            <div className="modal" id="model-alert-dieukhoan" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button data-dismiss="modal" className="close" type="button">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">Điều khoản đặt hàng!</h4>
                        </div>
                        <div className="modal-body">
                            <div style={{ marginLeft: "15px", marginBottom: "-10px" }}>
                                <p>1. Nếu đơn hàng của bạn có phí đặt cọc thì bạn vui lòng chuyển khoản đặt cọc cho cửa hàng để đặt hàng!</p>
                                <p>2. Đơn hàng trong nội thành Hà Nội và dưới 80.000₫ sẽ không phải đặt cọc trước!</p>
                                <p>3. Đơn hàng trong nội thành Hà Nội và dưới 200.000₫ sẽ phải đặt cọc trước 20% tổng giá trị đơn hàng(bao gồm cả phí ship nội thành là 20.000₫)!</p>
                                <p>4. Đơn hàng trong nội thành Hà Nội và lớn hơn 200.000₫ sẽ phải đặt cọc trước 15% tổng giá trị đơn hàng(bao gồm cả phí ship nội thành là 20.000₫)!</p>
                                <p>5. Đơn hàng ngoại thành Hà Nội nhỏ hơn 200.000₫ sẽ phải đặt cọc 30% tổng giá trị đơn hàng(bao gồm cả phí ship ngoại thành là 30.000₫)</p>
                                <p>6. Đơn hàng ngoại thành Hà Nội lớn hơn 200.000d sẻ phải đặt cọc 15% tổng giá trị đơn hàng(bao gồm cả phí ship ngoại thành là 30.000₫)</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button data-dismiss="modal" className="btn btn-primary" >Tôi đã hiểu</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 1000, height: 700 }}>
                    <div className="modal-header" style={{ marginTop: "-10px" }}>
                        <button data-dismiss="modal" className="close" type="button">
                            <span aria-hidden="true" onClick={props.handleClose}>×</span>
                        </button>
                        <h4 className="modal-title">Đơn hàng: </h4>
                    </div>
                    <div className="modal-body custom-overflow">
                        <div style={{ marginBottom: "10px" }} className="row">
                            <div className="col-lg-6">
                                <h4>Tổng hóa đơn: <span className="text-bold text-danger">{numberWithCommas((props.total/ 100 * 110 + props.shipping).toFixed(0))}₫</span></h4>
                                <h4>Thanh toán: <span className="text-bold text-danger">{numberWithCommas(props.totalChildren.toFixed(0))}₫</span></h4>
                                <h4>Địa chỉ giao hàng: {props.mainAddress}</h4>
                            </div>
                            <div className="col-lg-6 text-right">
                                <div className="form-group">
                                    <ModelChildren {...props} />
                                    <input id="inputCode" className="custom-select" placeholder="Nhập mã giảm giá . . ." style={{ width: "200px" }}
                                        value={props.voucherCode} onChange={(e) => {
                                            const { value } = e.target
                                            props.setVoucherCode(value.toUpperCase())
                                        }}
                                    />
                                    <button className="btn btn-default" style={{ marginTop: "-4px", marginLeft: "4px" }} onClick={props.onClickApply}>Áp dụng</button>
                                </div>
                            </div>
                        </div>
                        <table id="demo-dt-basic" className="table table-striped table-bordered" cellSpacing={0} width="100%">
                            <thead>
                                <tr>
                                    <th width={50}>STT</th>
                                    <th>Sản phẩm</th>
                                    <th width={150}>Hình ảnh</th>
                                    <th width={110}>Số lượng</th>
                                    <th width={100}>Giá sản phẩm</th>
                                    <th width={100}>Giảm giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.listCartCheckbox == null ? "" :
                                        props.listCartCheckbox.map((value, index) => {
                                            const { cartdetail, sale } = value
                                            const { product } = cartdetail
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{product.title == null ? product.name : product.title.name + " " + product.name}</td>
                                                    <td><img src={product.image} height={50} /></td>
                                                    <td>{cartdetail.quantity}</td>
                                                    <td>{product.price}</td>
                                                    <td>{sale == null ? "----" : sale + "%"}</td>
                                                </tr>
                                            )
                                        })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer" style={{ backgroundColor: "white", position: 'absolute', bottom: '1px', right: '10px', width: '98%' }}>
                        <button onClick={props.handleClose} className="btn btn-default" type="button">Đóng</button>
                        <button onClick={props.onClickOrder} className="btn btn-success" type="button">Tạo</button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
export default Cart;

function ModelChildren(props) {
    const handleOpen = () => {
        props.setOpenModalChildren(true)
    };

    const handleClose = () => {
        props.setOpenModalChildren(false);
    };

    // tổng số lượng sản phẩm trong đơn
    const listProductQuantity = () => {
        let totalQuantity = 0;
        props.listCartCheckbox.map(elm => {
            totalQuantity += elm.cartdetail.quantity
        })
        return totalQuantity
    }

    const checkVoucher = (value) => {
        if (value.orderQuantity != null) {
            if (value.orderQuantity > props.orderQuantityHistory) return false;
        }
        if (value.productQuantity != null) {
            if (value.productQuantity > listProductQuantity()) return false
        }
        if (value.totalPrice != null) {
            if (value.totalPrice > props.totalChildren) return false
        }
        return true;
    }
    return (
        <>
            <Tooltip title="Xem mã giảm giá" placement="top-start" arrow>
                <img src="https://firebasestorage.googleapis.com/v0/b/fistproject-d19c7.appspot.com/o/images%2Fdiscount.png?alt=media&token=82dbb3f8-0f06-4086-a1c6-cfe5e9910803"
                    height={50} className="custom-hover-mouse custom-hover-img" style={{ marginRight: "5px" }} onClick={handleOpen} />
            </Tooltip>
            <Modal
                open={props.openModalChildren}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 700, height: 400 }}>
                    <div className="modal-header" style={{ marginTop: "-20px" }}>
                        <button data-dismiss="modal" className="close" type="button">
                            <span aria-hidden="true" onClick={handleClose}>×</span>
                        </button>
                        <h4 className="modal-title">Mã giảm giá: </h4>
                    </div>
                    <div className="modal-body custom-overflow">
                        {
                            props.listVoucher.map(value => {
                                return (
                                    <div className="row custom-hover-discount" key={value.id} onClick={() => { props.onClickVoucher(value) }}>
                                        <div style={{ padding: "10px 0px 10px 10px", maxWidth: '100%' }}>
                                            {
                                                checkVoucher(value) == true ?
                                                    <h4 className="text-bold text-success">
                                                        Mã giảm giá: {value.voucherCode} - giảm
                                                        {
                                                            value.salePrice != null ? ` ${numberWithCommas(value.salePrice.toFixed(0))}₫` : ` ${value.salePercent}%`
                                                        }
                                                        <i className="fa fa-check mar-lft" aria-hidden="true"></i>
                                                    </h4>
                                                    :
                                                    <h4 className="text-bold text-danger">
                                                        Mã giảm giá: {value.voucherCode} - giảm
                                                        {
                                                            value.salePrice != null ? ` ${numberWithCommas(value.salePrice.toFixed(0))}₫` : ` ${value.salePercent}%`
                                                        }
                                                        <i className="fa fa-ban  mar-lft" aria-hidden="true"></i>
                                                    </h4>
                                            }
                                            {
                                                value.productQuantity != null ?
                                                    value.productQuantity > listProductQuantity() ?
                                                        <span className="text-danger">Hóa đơn có ít nhất +{value.productQuantity} + sản phẩm. </span>
                                                        :
                                                        <span className="text-success">Hóa đơn có ít nhất +{value.productQuantity} + sản phẩm. </span>
                                                    : ""
                                            }
                                            {
                                                value.totalPrice != null ?
                                                    value.totalPrice > props.totalChildren ?
                                                        <span className="text-danger">Tổng hóa đơn tối thiểu  {numberWithCommas(value.totalPrice.toFixed(0))} + ₫. </span>
                                                        :
                                                        <span className="text-success">Tổng hóa đơn tối thiểu  {numberWithCommas(value.totalPrice.toFixed(0))} + ₫. </span>
                                                    : ""
                                            }
                                            {
                                                value.orderQuantity != null ?
                                                    value.orderQuantity > props.orderQuantityHistory ?
                                                        <span className="text-danger">Đã mua {value.orderQuantity} đơn hàng thành công. </span>
                                                        :
                                                        <span className="text-success">Đã mua {value.orderQuantity} đơn hàng thành công. </span>
                                                    : ""
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Box>
            </Modal>
        </>
    )
}
import { useState, useEffect, useRef } from "react"
import {
    NavLink
} from "react-router-dom";

function InformationAdmin(props) {


    return (
        <div>
            <div class="panel">
                <div class="panel-heading">
                    <h2 className="panel-title">THÔNG TIN CÁ NHÂN</h2>
                    <ol className="breadcrumb">

                        <li style={{ fontSize: 20 }}><NavLink to="/admin/information">Cập nhật thông tin cá nhân --</NavLink></li>
                    </ol>
                </div>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                <div className="container">
                    <div className="col-sm-12">
                        <div className="col-sm-4">
                            <label className="control-label">Hình ảnh</label>
                            {props.photo !== undefined ? <img width={330} height={370} src={props.photo} /> : null}
                            <input type="file" id="img2" onChange={() => { props.upImg1() }} />
                        </div>
                        <div className="col-sm-7">
                            <form id="form" onSubmit={props.handleSubmit(props.onSubmitProfile)}>

                                <div className="col-sm-11">
                                    <div className="form-group">
                                        <label className="control-label">Username</label>
                                        <input name="username" id="username" type="text"
                                            placeholder="Username..." className="form-control"
                                            value={props.profile.username} disabled />
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label">Email</label>
                                        <input name="email" id="email" type="text"
                                            placeholder="Email..." className="form-control"
                                            value={props.profile.email} disabled />
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label">Họ tên</label>
                                        <input name="fullname" id="fullname" type="text"
                                            placeholder="Họ tên..." className="form-control"
                                            value={props.profile.fullname} onChange={props.formInputOnChange}
                                             />
                                             <span id="errorFullname" class="error"></span>
                                        {/* {props.errors.fullname?.type === 'required' && <span className="text-danger">Bạn chưa nhập họ tên !</span>} */}
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label">Số điện thoại</label>
                                        <input name="phone" id="phone" type="text"
                                            placeholder="Số điện thoại..." className="form-control"
                                           value={props.profile.phone} onChange={props.formInputOnChange}
                                             />
                                              <span id="errorPhone" class="error"></span>
                                        {/* {props.errors.phone?.type === 'pattern' && <span className="text-danger">Hãy nhập đúng định dạng số điện thoại !</span>}
                                        {props.errors.phone?.type === 'required' && <span className="text-danger">Bạn chưa nhập số điện thoại !</span>} */}
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label">Địa chỉ</label>
                                        <textarea rows="3" type="text" placeholder="Địa chỉ..." className="form-control"
                                        name="mainAddress" id="mainAddress" 
                                            value={props.profile.mainAddress} onChange={props.formInputOnChange}
                                           />
                                            <span id="errorMainAddress" class="error"></span>
                                        {/* {props.errors.mainAddress?.type === 'required' && <span className="text-danger">Bạn chưa nhập địa chỉ !</span>} */}
                                    </div>
                                    <hr />
                                </div>

                                <button className="btn btn-info mar-lft" type="submit">Cập nhật</button>

                            </form>
                        </div>

                    </div>

                </div>



            </div>




        </div>
    )
}

export default InformationAdmin;
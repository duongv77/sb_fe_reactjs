import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import API from "../../../../api/api";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function AdminRole(props) {
    const checkUser = (listRole) => {
        let check = false;
        if (listRole === undefined) return false
        listRole.map(value => {
            if (value.role.name === "USER") check = true
        })
        return check;
    }

    const checkAdmin = (listRole) => {
        let check = false;
        if (listRole === undefined) return false
        listRole.map(value => {
            if (value.role.name === "ADMIN") check = true
        })
        return check;
    }

    const checkSuper = (listRole) => {
        let check = false;
        if (listRole === undefined) return false
        listRole.map(value => {
            if (value.role.name === "SUPPER_ADMIN") check = true
        })
        return check;
    }

    const onChange = (e, data) => {
        const {value} = e.target
        const roleAccount = { role:{id:+value}, account: {id:data.id} }
        props.callApiChangeRole(roleAccount)
    }

    return (
        <div>
            <button
                title="Chỉnh sửa"
                data-target="#edit-role"
                data-toggle="modal"
                className="btn btn-warning"
            ><i className="fa fa-pencil"></i> Phân quyền</button>
            <div className="modal" id="edit-role" role="dialog" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content ">
                        {/*Modal header*/}
                        <form>
                            <div className="modal-header">
                                <button data-dismiss="modal" className="close" type="button">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h4 className="modal-title">Tài khoản:</h4>
                            </div>
                            {/*Modal body*/}
                            <div className="modal-body custom-modal-body-height">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th width={40}>ID</th>
                                            <th className="text-center">Hình ảnh</th>
                                            <th>Username</th>
                                            <th className="min-tablet" width={100}>Quyền người dùng</th>
                                            <th className="min-tablet" width={100}>Quyền quản lí</th>
                                            <th className="min-desktop" width={100}>Quyền quản lí cấp cao</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.listAccount.map(elm => {
                                                return (
                                                    <tr>
                                                        <td>{elm.id}</td>
                                                        <td className="text-center"><img src={elm.photo} height={60}/></td>
                                                        <td>{elm.username}</td>
                                                        <td className="text-center">
                                                            <Checkbox
                                                                value={3}
                                                                {...label}
                                                                defaultChecked={checkUser(elm.roleAccount)}
                                                                sx={{
                                                                    color: pink[800],
                                                                    '&.Mui-checked': {
                                                                        color: pink[600],
                                                                    },
                                                                }}
                                                                onChange={(e)=>{onChange(e, elm)}}
                                                            />
                                                        </td>
                                                        <td className="text-center">
                                                            <Checkbox
                                                                value={2}
                                                                {...label}
                                                                defaultChecked={checkAdmin(elm.roleAccount)}
                                                                sx={{
                                                                    color: pink[800],
                                                                    '&.Mui-checked': {
                                                                        color: pink[600],
                                                                    },
                                                                }}
                                                                onChange={(e)=>{onChange(e, elm)}}
                                                            />
                                                        </td>
                                                        <td className="text-center">
                                                            <Checkbox
                                                                value={1}
                                                                {...label}
                                                                defaultChecked={checkSuper(elm.roleAccount)}
                                                                sx={{
                                                                    color: pink[800],
                                                                    '&.Mui-checked': {
                                                                        color: pink[600],
                                                                    },
                                                                }}
                                                                onChange={(e)=>{onChange(e, elm)}}
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/*Modal footer*/}
                            <div className="modal-footer">
                                <button data-dismiss="modal" className="btn btn-default" type="button">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminRole;
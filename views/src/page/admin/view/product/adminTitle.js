import { useState, useEffect } from "react";
import API from "../../../../api/api";
import swal from 'sweetalert';
import { toast } from "react-toastify";
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from "react-hook-form";
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
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

const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: pink[600],
        '&:hover': {
            backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: pink[600],
    },
}));

function AdminTitle() {
    const [open, setOpen] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const [titleDetail, setTitleDetail] = useState({})
    const [listTitle, setListTitle] = useState([])

    const callApiListTitle = async () => {
        try {
            const url = "/api/v2/admin/title"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setListTitle(data)
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        callApiListTitle()
    }, [])

    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenAdd = () => {
        setOpenAdd(true)
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const clickDeleteTitle = (id) => {
        swal({
            title: "Ch?? ?? !",
            text: "B???n mu???n x??a ?????u s??ch ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    callApiDeleteTitle(id)
                } else {
                }
            });
    }

    const callApiDeleteTitle = async (id) => {
        try {
            const url = `/api/v2/admin/title/${id}`
            const response = await API.deleteAdmin(url)
            const { messageCode, messageName } = response
            if (messageCode == 200) {
                toast.success("X??a ?????u s??ch !")
                setListTitle(oldValue => {
                    const newValue = oldValue.filter(elm => {
                        return elm.id != id
                    })
                    return newValue
                })
            } else {
                toast.error(messageName)
            }
        } catch (error) {

        }
    }

    const onChangeSwith = (e, id) => {
        const { checked } = e.target
        swal({
            title: "Ch?? ?? !",
            text: "B???n c???p nh???p tr???ng th??i ?????u s??ch ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const value = { id, status: checked == true ? 1 : 0 }
                    callApiUpdateStatus(value)
                } else {
                }
            });

    }

    const callApiUpdateStatus = async (value) => {
        try {
            const url = `/api/v2/admin/title-status`
            const response = await API.putAdmin(url, value)
            const { messageCode, messageName, data } = response
            if (messageCode == 200) {
                toast.success("???? ?????i tr???ng th??i !")
                setListTitle(oldValue => {
                    const newValue = oldValue.map(elm => {
                        return elm.id == data.id ? data : elm
                    })
                    return newValue
                })
                console.log(data)
            } else {
                toast.error(messageName)
            }
        } catch (error) {

        }
    }

    const [openEdit, setOpenEdit] = useState(false)

    const handleOpenEdit = (value) => {
        setOpenEdit(true)
        setTitleDetail(value)
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setTitleDetail({})

    };

    return (
        <>
            <button className="btn btn-success" onClick={handleOpen}>?????u s??ch</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 1000, height: 600 }}>
                    <div className="modal-header" style={{ marginTop: "-20px" }}>
                        <button data-dismiss="modal" className="close" type="button">
                            <span aria-hidden="true" onClick={handleClose}>??</span>
                        </button>
                        <h4 className="modal-title">?????u s??ch: <ModeAdd openAdd={openAdd} handleCloseAdd={handleCloseAdd} handleOpenAdd={handleOpenAdd} listTitle={listTitle} setListTitle={setListTitle} /></h4>
                    </div>
                    <div className="modal-body custom-overflow">
                        <div class="panel-body" style={{ marginBottom: "-35px" }}>
                            <table id="demo-dt-basic" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th width={30}>STT</th>
                                        <th >T??n ?????u s??ch</th>
                                        <th width={100}>S??? l?????ng s???n ph???m</th>
                                        <th width={100}>Tr???ng th??i</th>
                                        <th >M?? t???</th>
                                        <th width={120} >Thao t??c</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listTitle.map((value, index) => {
                                            return (
                                                <tr key={value.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{value.name}</td>
                                                    <td>{value.products == null ? 0 : value.products.length}</td>
                                                    <td>
                                                        <GreenSwitch {...label} checked={value.status == 1 ? true : false} onChange={(e) => { onChangeSwith(e, value.id) }} />
                                                    </td>
                                                    <td>{value.note}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-danger mar-rgt" onClick={() => { clickDeleteTitle(value.id) }}>
                                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                        </button>
                                                        <button className="btn btn-warning" onClick={() => {
                                                            handleOpenEdit(value)
                                                        }}
                                                        >
                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div >
                    </div>
                    <div className="modal-footer" style={{ backgroundColor: "white", position: 'absolute', bottom: '1px', right: '10px', width: '98%' }}>
                        <button onClick={handleClose} className="btn btn-default" type="button">????ng</button>
                    </div>
                </Box>
            </Modal>
            <ModeEdit openEdit={openEdit} setListTitle={setListTitle} handleOpenEdit={handleOpenEdit} handleCloseEdit={handleCloseEdit} titleDetail={titleDetail} setTitleDetail={setTitleDetail}/>
        </>
    )
}

export default AdminTitle;

function ModeAdd(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmitUpdate = (data) => {
        callApiCreateTitle(data)
    }

    const callApiCreateTitle = async (value) => {
        try {
            const url = "/api/v2/admin/title"
            const response = await API.postAdmin(url, value)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                toast.success("???? th??m ?????u s??ch m???i !")
                props.setListTitle([...props.listTitle, data])
                props.handleCloseAdd()
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <button className="btn btn-success" onClick={props.handleOpenAdd}><i class="fa fa-plus" aria-hidden="true"></i></button>
            <Modal
                open={props.openAdd}
                onClose={props.handleCloseAdd}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 600, height: 330 }}>
                    <div className="modal-header" style={{ marginTop: "-20px" }}>
                        <button data-dismiss="modal" className="close" type="button">
                            <span aria-hidden="true" onClick={props.handleCloseAdd}>??</span>
                        </button>
                        <h4 className="modal-title">?????u s??ch: </h4>
                    </div>
                    <form onSubmit={handleSubmit(onSubmitUpdate)}>
                        <div className="modal-body custom-overflow">
                            <div class="panel-body" style={{ marginBottom: "-35px" }}>
                                <div className="form-group">
                                    <label for="titl1e">T??n ?????u s??ch:</label>
                                    <input type="text" id="title1" className="form-control"  {...register("name", { required: true })} />
                                    {errors.name?.type === 'required' && <span className="text-danger col-sm-12">Kh??ng ???????c ????? tr???ng</span>}
                                </div>
                                <div className="form-group">
                                    <label for="note1">M?? t???:</label>
                                    <textarea type="text" id="note1" className="form-control"  {...register("note", { maxLength: 225 })} />
                                    {errors.note?.type === 'maxLength' && <span className="text-danger col-sm-12">D??? li???u kh??ng h???p l???</span>}
                                </div>
                            </div >
                        </div>
                        <div className="modal-footer" style={{ backgroundColor: "white", position: 'absolute', bottom: '1px', right: '10px', width: '98%' }}>
                            <button onClick={props.handleCloseAdd} className="btn btn-default" type="button">????ng</button>
                            <button type="submit" className="btn btn-success">T???o</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

function ModeEdit(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmitEdit = (data) => {
        if(props.titleDetail.name.trim()==""){
            toast.error("Kh??ng ???????c ????? tr???ng t??n ?????u s??ch")
            return
        }
        swal({
            title: "Ch?? ?? !",
            text: "B???n c???p nh???p tr???ng th??i ?????u s??ch ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    callApiUpdateTitle(props.titleDetail)
                } else {
                }
            });
    }

    const callApiUpdateTitle = async (value) => {
        console.log(value)
        try {
            const url = "/api/v2/admin/title"
            const response = await API.putAdmin(url, value)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                toast.success("???? s???a ?????u s??ch !")
                props.setListTitle(oldValue=>{
                    const newValue = oldValue.map(elm=>{
                        return elm.id == data.id ? data:elm
                    })
                    return newValue
                })
                props.handleCloseEdit()
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onChangeValue = (e) =>{
        const {name,value} = e.target
        props.setTitleDetail({...props.titleDetail, [name]:value})
    }

    return (
        <>
            <Modal
                open={props.openEdit}
                onClose={props.handleCloseEdit}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 600, height: 330 }}>
                    <div className="modal-header" style={{ marginTop: "-20px" }}>
                        <button data-dismiss="modal" className="close" type="button">
                            <span aria-hidden="true" onClick={props.handleCloseEdit}>??</span>
                        </button>
                        <h4 className="modal-title">S???a ?????u s??ch: </h4>
                    </div>
                    <form onSubmit={handleSubmit(onSubmitEdit)} id="form-update">
                        <div className="modal-body custom-overflow">
                            <div class="panel-body" style={{ marginBottom: "-35px" }}>
                                <div className="form-group">
                                    <label >T??n ?????u s??ch:</label>
                                    <input type="text" className="form-control"  name="name" value={props.titleDetail.name} onChange={onChangeValue}/>
                                    {errors.name?.type === 'required' && <span className="text-danger col-sm-12">Kh??ng ???????c ????? tr???ng</span>}
                                </div>
                                <div className="form-group">
                                    <label >M?? t???:</label>
                                    <textarea type="text" className="form-control" name="note" value={props.titleDetail.note}  onChange={onChangeValue}/>
                                    {errors.note?.type === 'maxLength' && <span className="text-danger col-sm-12">D??? li???u kh??ng h???p l???</span>}
                                </div>
                            </div >
                        </div>
                        <div className="modal-footer" style={{ backgroundColor: "white", position: 'absolute', bottom: '1px', right: '10px', width: '98%' }}>
                            <button onClick={() => {
                                props.handleCloseEdit()
                            }} className="btn btn-default" type="button">????ng</button>
                            <button type="submit" className="btn btn-success">C???p nh???p</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    )
}
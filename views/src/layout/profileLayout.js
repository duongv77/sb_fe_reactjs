import { Link, NavLink } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import API from "../api/api";
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { toast } from "react-toastify";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import HistoryOrderLogic from "../page/website/logic/profile/historyOrderLogic";
import ProductFavoriteLogic from "../page/website/logic/profile/productFavoriteLogic";
import ProfileLogic from "../page/website/logic/profile/profileLogic";
import { useHistory } from 'react-router';
import Tooltip from '@mui/material/Tooltip'
import firebase from 'firebase/compat/app';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { setAccountValue } from "../Service/service";


const ProfileLayout = (props) => {
    const [profile, setProfile] = useState({})
    const history = useHistory()
    const [image, setImage] = useState(undefined)
    const [loading, setLoading] = useState(false)

    const callApiGetAccount = async () => {
        try {
            const url = "/api/v2/user"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setProfile(data)
                setImage(data.photo)
                console.log(data)
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const upImg = () => {
        setLoading(true)
        try {
            const file = document.getElementById('img').files[0]
            let storagerRef = firebase.storage().ref(`images/${file.name}`);
            storagerRef.put(file).then(function () {
                storagerRef.getDownloadURL().then((url) => {
                    setImage(url)
                    callApiUpdatePhoto({photo: url})
                    setLoading(false)
                })
            })
        } catch (error) {
            console.log(error)
            setLoading(false)

        }
    }

    const callApiUpdatePhoto = async(photo) => {
        try {
            const url = "/api/v2/user/update-photo"
            const response = await API.putAdmin(url, photo)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setProfile(data)
            } else {
                toast.error(messageName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        callApiGetAccount()
    }, [])

    const logout = (e) => {
        e.preventDefault()
        swal({
            title: "Chú ý!",
            text: "Bạn muốn đăng xuất ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    localStorage.removeItem("AccountToken")
                    localStorage.removeItem("AccessToken")
                    history.push("/login")
                    toast.success('Bạn đã đăng xuất');
                } else {
                }
            });
    }

    return (

        <Router>
            <div>
                <div className="container-fluid">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="panel custom-boder">
                                    <div className="custom-center" style={{ marginTop: "30px", marginBottom: "50px" }}>
                                        <div>
                                            <div className="custom-center">
                                                <Tooltip title="Đổi ảnh đại diện" placement="top-start" arrow>
                                                    <label for="img" className="custom-hover-mouse">
                                                        <Stack direction="row" spacing={2} >
                                                            {
                                                                loading ==true?
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <CircularProgress />
                                                                    </Box> 
                                                                    :
                                                                    <Avatar
                                                                        alt=""
                                                                        src={image}
                                                                        sx={{ width: 100, height: 100 }}
                                                                    />
                                                            }
                                                        </Stack>
                                                    </label>
                                                </Tooltip>
                                            </div>
                                            <h3 className="text-center" style={{ fontSize: "20px" }}>{profile.fullname}</h3>
                                        </div>
                                    </div>
                                    <div className="panel-body">
                                        <div className="list-group">
                                            <Link className="list-group-item list-item-lg custom-hover-mouse" to="/profile/order/history"><i className="fa fa-history mar-rgt" aria-hidden="true"></i>Lịch sử mua hàng</Link>
                                            <Link className="list-group-item list-item-lg custom-hover-mouse" to="/profile/product/favorite"><i className="fa fa-heart mar-rgt" aria-hidden="true" />Sản phẩm yêu thích</Link>
                                            <Link className="list-group-item list-item-lg custom-hover-mouse" to="/profile/info"><i className="fa fa-user mar-rgt" aria-hidden="true"></i>Quản lý hồ sơ</Link>
                                            <a className="list-group-item list-item-lg custom-hover-mouse" href="#" onClick={logout}><i className="fa fa-sign-out mar-rgt" aria-hidden="true"></i>Đăng xuất</a>
                                        </div>
                                    </div>
                                    <input id="img" type="file" style={{ opacity: "0" }} onChange={upImg} />
                                </div>
                            </div>
                            <div className="col-lg-9" style={{ backgroundColor: "#FFFFFF", marginTop: "23px", padding: "3px" }}>
                                <Switch>
                                    <Route exact path="/profile/order/history">
                                        <HistoryOrderLogic />
                                    </Route>
                                    <Route exact path="/profile/product/favorite">
                                        <ProductFavoriteLogic />
                                    </Route>
                                    <Route exact path="/profile/info">
                                        <ProfileLogic profile={profile} setProfile={setProfile} callApiGetAccount={callApiGetAccount} />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>

    )
}

export default ProfileLayout;
import axios from 'axios';
import queryString from 'query-string';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify";

const Back = () => {
  let history = useHistory()
  history.push("/login/admin")
}

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
   },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

axiosClient.interceptors.response.use((response) => {
   if (response && response.data) {
    return response.data;
  }
  return response;
}, (error) => {
  try {
    const {status} = error.response
  if(status===401){
    swal({
      title: "Đã xảy ra lỗi!",
      text: "Phiên đăng nhập đã hết hạn!",
      icon: "error",
      button: "Đồng ý!",
    });
    localStorage.removeItem("AccountToken")
    localStorage.removeItem("AccessToken")
    Back()
  }
  if(status==403) toast.error("Error 403: Bạn không có đủ quyền!")
  if(status===500) toast.error("Error 500: Lỗi hệ thống!")
  } catch (error) {
    
  }
  throw error;
});

export default axiosClient;
import axiosClient from "./axiosClient";

const API = {
    get:(url)=>{
        return axiosClient.get(url)
    },
    getAdmin: (url)=>{
        const config ={
            headers: {
                Authorization:'Bearer ' +  localStorage.getItem("AccessToken"),
              },
        }
        return axiosClient.get(url, config)
    },

    post: (url , data)=>{
        return axiosClient.post(url, data)
    },
    postAdmin: (url,data)=>{
        const config ={
            headers: {
                Authorization:'Bearer ' +  localStorage.getItem("AccessToken"),
              },
        }
        return axiosClient.post(url, data, config)
    },

    put: (url , data)=>{
        return axiosClient.put(url, data)
    },
    putAdmin: (url , data)=>{
        const config ={
            headers: {
                Authorization:'Bearer ' +  localStorage.getItem("AccessToken"),
              },
        }
        return axiosClient.put(url, data, config)
    },

    delete:(url)=>{
        return axiosClient.delete(url)
    },
    deleteAdmin:(url)=>{
        const config ={
            headers: {
                Authorization:'Bearer ' +  localStorage.getItem("AccessToken"),
              },
        }
        return axiosClient.delete(url , config)
    },
}

export default API;
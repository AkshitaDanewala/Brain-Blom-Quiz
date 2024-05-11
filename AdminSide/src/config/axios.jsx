import axios from "axios";

const instanceAxios = axios.create({
    baseURL:'http://localhost:8080/',
    withCredentials:true
});

export default instanceAxios
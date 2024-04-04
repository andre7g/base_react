import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = 'http://atracsi.nuntechnologies.com/api/';

export default axiosInstance;



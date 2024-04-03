import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = 'http://wsmuni.nuntechnologies.com/api/';

export default axiosInstance;



import axios from 'axios';

const _AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/Counsellor/'
});

export default _AxiosInstance;
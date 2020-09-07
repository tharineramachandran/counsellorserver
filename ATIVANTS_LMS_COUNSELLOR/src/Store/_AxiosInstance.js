import axios from 'axios';

const _AxiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default _AxiosInstance;
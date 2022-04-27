import axios from 'axios';

const BaseUrl = process.env.REACT_APP_API_BASE_URL;

export default axios.create({
    baseURL: BaseUrl,
    timeout :2500
});

export const axiosPrivate = axios.create({
    baseURL: BaseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout :10000
});
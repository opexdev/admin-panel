import jwt_decode from "jwt-decode";
import {getTokenByRefreshToken} from "js-api-client";

export default function setupAxios(axios, auth, setAuth, timeout = 600000) {
    axios.defaults.baseURL = window.env.REACT_APP_API_BASE_URL;
    axios.defaults.headers.Accept = 'application/json';
    axios.defaults.timeout = timeout;
    axios.interceptors.request.use(
        (config) => {
            const accessToken = auth.accessToken
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
            return config
        },
        (err) => Promise.reject(err)
    )
    axios.interceptors.response.use(
        response => response,
        async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 401 && prevRequest.headers['Authorization'] && !prevRequest?.sent) {
                prevRequest.sent = true;
                const newAccessToken = await refresh(auth, setAuth);
                if (newAccessToken) {
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axios(prevRequest);
                }
            }
            return Promise.reject(error);
        }
    )
}

const refresh = async (auth, setAuth) => {
    let refreshToken = auth.refreshToken || localStorage.getItem("adminRefreshToken");
    if (!refreshToken) return false
    getTokenByRefreshToken(refreshToken)
        .then((res) => {
            const accessToken = res?.data?.access_token;
            refreshToken = res?.data?.refresh_token;
            const session = res?.data?.session_state;
            const {roles} = jwt_decode(accessToken);
            localStorage.setItem("adminRefreshToken", refreshToken)
            setAuth(prev => {
                return {
                    ...prev,
                    refreshToken,
                    accessToken,
                    session,
                    roles
                }
            });
            return accessToken
        })
        .catch(() => false)
}

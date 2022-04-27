import useAuth from './useAuth';
import axios from "../axios";
import jwt_decode from "jwt-decode";

const useRefreshToken = () => {
    let {auth, setAuth} = useAuth();

    return async () => {
        let refreshToken = auth.refreshToken || localStorage.getItem("refreshToken")
        const params = new URLSearchParams();
        params.append('client_id', process.env.REACT_APP_CLIENT_ID);
        params.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refreshToken );

        const response = await axios.post('/auth/realms/opex/protocol/openid-connect/token', params);

        refreshToken = response?.data?.refresh_token;
        const accessToken = response?.data?.access_token;
        const session = response?.data?.session_state;
        const {roles} = jwt_decode(accessToken);

        localStorage.setItem("refreshToken", refreshToken)

        setAuth(prev => {
            return {
                ...prev,
                refreshToken,
                accessToken,
                session,
                roles
            }
        });
        return accessToken;
    };
};

export default useRefreshToken;
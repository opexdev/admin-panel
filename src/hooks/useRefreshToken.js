import useAuth from './useAuth';
import jwt_decode from "jwt-decode";
import {getTokenByRefreshToken} from "js-api-client";

const useRefreshToken = () => {
    let {auth, setAuth} = useAuth();
    return async () => {
        let refreshToken = auth.refreshToken || localStorage.getItem("adminRefreshToken")
        if (!refreshToken) return false
        const response = await getTokenByRefreshToken(refreshToken);
        refreshToken = response?.data?.refresh_token;
        const accessToken = response?.data?.access_token;
        const session = response?.data?.session_state;
        const {roles} = jwt_decode(accessToken);

        localStorage.setItem("refreshToken", refreshToken)
        await setAuth(prev => {
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
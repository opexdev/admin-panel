import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";
import {login} from "../routes/routes"

const useLogout = () => {
    const { setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = async () => {
        setAuth({});
        try {
            await axiosPrivate.post('/auth/realms/opex/user-management/user/logout');
            localStorage.removeItem("refreshToken")
            navigate(login, { from: location , replace: true });
        } catch (err) {
            console.error(err);
        }
    }
    return logout;
}

export default useLogout
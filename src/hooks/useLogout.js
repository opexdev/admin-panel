import useAuth from "./useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import {login} from "../routes/routes"
import {logout} from "js-api-client";


const useLogout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const logoutFunc = async () => {
        setAuth({});
        try {
            await logout()
            localStorage.removeItem("refreshToken")
            navigate(login, { from: location , replace: true });
        } catch (err) {
            console.error(err);
        }
    }
    return logoutFunc;
}

export default useLogout
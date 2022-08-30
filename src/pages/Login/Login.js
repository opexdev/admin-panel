import React, {useContext, useEffect, useRef, useState} from 'react';
import {toAbsoluteUrl} from "../../components/utils";
import AuthContext from "../../context/AuthProvider";
import jwt_decode from "jwt-decode";
import {useLocation, useNavigate} from 'react-router-dom';
import Loading from "../../components/Loading";
import {login} from "js-api-client";

const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const clientSecret = window.env.REACT_APP_CLIENT_SECRET
    const clientId = window.env.REACT_APP_CLIENT_ID

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();

    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setErrMsg("Username and Password must filled!")
            return
        }
        setLoading(true)
        setErrMsg("")

        login({username, password}, 'admin-user', clientId, clientSecret)
            .then(async (res) => {
                const accessToken = res?.data?.access_token;
                const refreshToken = res?.data?.refresh_token;
                const session = res?.data?.session_state;
                const {roles} = jwt_decode(accessToken);
                if (!roles?.includes("admin_finance")) return setErrMsg('Permission denied');
                localStorage.setItem("adminRefreshToken", refreshToken)
                await setAuth({username, accessToken, refreshToken, session, roles});
                navigate(from, {replace: true});
            }).catch(err => {
            if (!err?.response) return setErrMsg('No Server Response');
            if (err.response?.status === 400) return setErrMsg('Missing Username or Password');
            if (err.response?.status === 401) return setErrMsg('Invalid credential');
            return setErrMsg('Login Failed');

        }).finally(() => setLoading(false))
    }


    return (
        <div className="login-container text-color"
             style={{backgroundImage: `url('${toAbsoluteUrl("/media/img/spaceStar.png")}')`}}>
            <div className="login-content text-center">
                <div className="mb-5">
                    <img src={toAbsoluteUrl("media/img/opexLogoPlus.svg")} className="mb-5" alt=""/>
                    <h1 className="fw-bold mt-5">Welcome To Admin Panel</h1>
                </div>
                <form className="this-login-form mt-5" onSubmit={handleSubmit}>
                    {
                        loading ? <Loading/> : <>
                            <div className="d-flex flex-column justify-content-center align-items-center"
                                 style={{width: "75%"}}>
                                <div className="d-flex flex-row login-input">
                                    <span className="">Username</span>
                                    <input className="" value={username} onChange={(e) => setUsername(e.target.value)}
                                           ref={userRef} type="text" autoComplete="username"/>
                                </div>
                                <div className="d-flex flex-row login-input">
                                    <span className="">Password</span>
                                    <input className="" value={password} type="password" autoComplete="current-password"
                                           onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                {errMsg && <div className="d-flex justify-content-start align-items-center mt-2"
                                                style={{width: "100%"}}>
                                    <span className="text-danger">{errMsg}</span>
                                </div>}
                            </div>
                            <div className="login-submit">
                                <button type="submit" className="text-color" disabled={!username || !password}>
                                    Submit
                                </button>
                            </div>
                        </>
                    }
                </form>
            </div>
        </div>
    )
}
export default Login;
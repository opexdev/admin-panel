import React, {useContext, useEffect, useRef, useState} from 'react';
import {toAbsoluteUrl} from "../utils";
import AuthContext from "../../context/AuthProvider";
import {login} from '../../api/api';
import jwt_decode from "jwt-decode";
import {useLocation, useNavigate} from 'react-router-dom';
import Loading from "../Loading";

const Login = () => {
    const { setAuth } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();

    const [loading , setLoading] = useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        /*userRef.current.focus();*/
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password){
            setErrMsg("Username and Password must filled!")
            return
        }
        setLoading(true)
        setErrMsg("")
        try {
            const response = await login({ username, password })
            const accessToken = response?.data?.access_token;
            const refreshToken = response?.data?.refresh_token;
            const session = response?.data?.session_state;

            localStorage.setItem("refreshToken", refreshToken)

            const { roles } = jwt_decode(accessToken);
            setAuth({ username, accessToken, refreshToken, session, roles });
            navigate(from, { replace: true });

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Invalid credential');
            } else {
                setErrMsg('Login Failed');
            }
        }
        setLoading(false)
    }

    const fill = () => {
        setUsername("Finance@opex.dev")
        setPassword("opexadmin")
    }

    return (
        <div className="login-container text-color" style={{ backgroundImage: `url('${toAbsoluteUrl("/media/img/spaceStar.png")}')`}}>


            <div className="login-content text-center">
                <div className="mb-5">
                    <img src={toAbsoluteUrl("media/img/opexLogoPlus.svg")} className="mb-5" alt="" onDoubleClick={fill}/>
                    <h1 className="fw-bold mt-5">Welcome To Admin Panel</h1>
                </div>


                <form className="this-login-form mt-5" onSubmit={handleSubmit}>

                    {
                        loading ? <Loading/> : <>
                            <div className="d-flex flex-column justify-content-center align-items-center" style={{width:"75%"}}>
                                <div className="d-flex flex-row login-input">
                                    <span className="">Username</span>
                                    <input className="" value={username} onChange={(e) => setUsername(e.target.value)}
                                           ref={userRef} type="text"/>
                                </div>
                                <div className="d-flex flex-row login-input">
                                    <span className="">Password</span>
                                    <input className="" value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
                                </div>

                                { errMsg && <div className="d-flex justify-content-start align-items-center mt-2" style={{width:"100%"}}>
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




        {/*<div className="row vh-100">
            <div className="col-lg-8 col-md-6" />

            <div className="col-lg-4 col-md-6 login-form">
                <h1 className="text-center">
                    Login to {process.env.REACT_APP_BRAND_NAME} admin
                </h1>
                {errMsg ?
                    <div className="alert alert-danger mt-3" role="alert">
                        <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                        {errMsg}
                    </div>
                    : ""
                }
                <form onSubmit={handleSubmit} autoComplete="on">
                    <div className='row'>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text"
                                className="form-control" name="username"
                                id="username" autoComplete="username"
                                onChange={(e) => setUsername(e.target.value)}
                                ref={userRef} />
                        </div>
                        <div className="form-group mt-1">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                className="form-control" name="password"
                                id="password" autoComplete="password"
                                onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="d-grid mt-5">
                            <button type="submit" className="btn btn-success" disabled={!username || !password}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>*/}

    </div>
    )
}
export default Login;
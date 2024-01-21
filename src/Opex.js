import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Login from './pages/Login/Login';
import Missing from './components/Missing/Missing';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Unauthorized from './components/Unauthorized/Unauthorized';
import * as RoutesName from "../src/routes/routes";
import Users from "./pages/Users/Users";
import UserInfo from "./pages/Users/UserInfo";
import Withdraws from "./pages/Withdraws/Withdraws";
import {useEffect, useState} from "react";
import WithdrawInfo from "./pages/Withdraws/WithdrawInfo";
import KycUsers from "./pages/KycUsers/KycUsers";
import useAuth from "./hooks/useAuth";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {getTokenByRefreshToken} from "js-api-client";
import setupAxios from "./setupAxios";
import WhiteList from "./pages/WhiteList/WhiteList";
import Wallet from "./pages/Wallet/Wallet";
import ChainAndToken from "./pages/ChainAndToken/ChainAndToken";


function Opex() {
    const {auth, setAuth} = useAuth();
    setupAxios(axios, auth, setAuth)
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const ROLES = {admin: "admin_finance"}

    useEffect(() => {
        let refreshToken = auth.refreshToken || localStorage.getItem("adminRefreshToken")
        if (refreshToken) {
            getTokenByRefreshToken(refreshToken)
                .then(async (response) => {
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
                    if (location.pathname === RoutesName.login) navigate("/")
                })
                .catch(() => navigate(RoutesName.login, {replace: true}))
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false)
        }
    }, [])

    if (isLoading) return <p className="text-dark">Loading...</p>

    return (
        <Routes>
            {/* public routes */}
            <Route path={RoutesName.login} element={<Login/>}/>
            <Route element={<Layout/>}>
                <Route path="/" element={<Dashboard/>}/>
                {/* private routes */}
                <Route element={<RequireAuth allowedRoles={[ROLES.admin]}/>}>
                    <Route path={RoutesName.users} element={<Users/>}/>
                    <Route path={RoutesName.showUser} element={<UserInfo/>}/>
                    <Route path={RoutesName.withdraws} element={<Withdraws/>}/>
                    <Route path={RoutesName.showWithdraw} element={<WithdrawInfo/>}/>
                    <Route path={RoutesName.KYC} element={<KycUsers/>}/>
                    <Route path={RoutesName.WhiteList} element={<WhiteList/>}/>
                    <Route path={RoutesName.Wallet} element={<Wallet/>}/>
                    <Route path={RoutesName.ChainAndToken} element={<ChainAndToken/>}/>
                </Route>
                <Route path="unauthorized" element={<Unauthorized/>}/>
            </Route>
            {/* 404 Not Found */}
            <Route path="*" element={<Missing/>}/>
        </Routes>
    );
}

export default Opex;

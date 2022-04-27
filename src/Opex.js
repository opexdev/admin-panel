import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Login from './components/Login/Login';
import Missing from './components/Missing/Missing';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Unauthorized from './components/Unauthorized/Unauthorized';
import * as RoutesName from "../src/routes/routes";
import Users from "./components/Users/Users";
import UserInfo from "./components/Users/UserInfo";
import Withdraws from "./components/Withdraws/Withdraws";
import {useEffect, useState} from "react";
import useRefreshToken from "./hooks/useRefreshToken";
import WithdrawInfo from "./components/Withdraws/WithdrawInfo";
import KycUsers from "./components/KycUsers/KycUsers";

function Opex() {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const navigate = useNavigate();
    const location = useLocation();

    const ROLES = {
        admin: "finance-admin"
    }

    useEffect(() => {
        refresh()
            .then(() => location.pathname === RoutesName.login ? navigate("/", {replace: true}):null)
            .catch(() => navigate(RoutesName.login, {replace: true})).finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

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
                </Route>
                <Route path="unauthorized" element={<Unauthorized/>}/>
            </Route>
            {/* 404 Not Found */}
            <Route path="*" element={<Missing/>}/>
        </Routes>
    );
}

export default Opex;

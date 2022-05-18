import React from "react";
import {Route, Routes} from "react-router-dom";
import * as RoutesName from "../../../routes/routes";
import Login from "../../Login/Login";
import {showUser, showWithdraw} from "../../../routes/routes";

const Title = () => {

    return (
            <Routes>
                <Route exact path={RoutesName.dashboard} element="Dashboard"/>
                <Route path={RoutesName.users} element="Users"/>
                <Route path={RoutesName.showUser} element="Users"/>
                <Route exact path={RoutesName.KYC} element="KYC"/>
                <Route exact path={RoutesName.withdraws} element="Withdraws"/>
                <Route exact path={RoutesName.showWithdraw} element="Withdraws"/>
            </Routes>
    );
};

export default Title;

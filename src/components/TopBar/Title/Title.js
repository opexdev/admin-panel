import React from "react";
import {Route, Routes} from "react-router-dom";
import * as RoutesName from "../../../routes/routes";

const Title = () => {

    return (
            <Routes>
                <Route path={RoutesName.dashboard} element="Dashboard"/>
                <Route path={RoutesName.users} element="Users"/>
                <Route path={RoutesName.showUser} element="Users"/>
                <Route path={RoutesName.KYC} element="KYC"/>
                <Route path={RoutesName.withdraws} element="Withdraws"/>
                <Route path={RoutesName.showWithdraw} element="Withdraws"/>
                <Route path={RoutesName.WhiteList} element="White List"/>
                <Route path={RoutesName.Wallet} element="Wallet"/>
                <Route path={RoutesName.ChainAndToken} element="Chain And Token"/>
            </Routes>
    );
};

export default Title;

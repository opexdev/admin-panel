import React from "react";
import Loading from "../../components/Loading";
import ScrollBar from "../../components/ScrollBar";
import {useGetUsersByGroup, useGetUsersList, useGetWithdrawsReq} from "../../query";
import Chains from "../ChainAndToken/Chains/Chains";
import Chain from "./Chain/Chain";
import Token from "./Token/Token";

const Dashboard = () => {

    const {data: users} = useGetUsersList(1, 10)
    const {data: withdraws} = useGetWithdrawsReq(null, 1, 10)
    const {data: kycReq} = useGetUsersByGroup("kyc-requested", 1, 10)

    return <ScrollBar>
        <div className="d-flex flex-column justify-content-start align-items-center" style={{minHeight: "100%"}}>

            <div className="d-flex flex-row justify-content-between align-items-center my-5" style={{width: "80%"}}>
                <div className="d-flex justify-content-center align-items-center primary-bg"
                     style={{width: "30%", height: "20vh", borderRadius: "7px"}}>
                    {users !== null ?
                        <div className="d-flex flex-column justify-content-center align-items-center"
                             style={{height: "100%"}}>
                            <h4 className="mb-2">Total Users</h4>
                            <span className="mt-2 text-info" style={{fontSize: "2rem"}}>{users?.total || "-"}</span>
                        </div> : <Loading/>
                    }
                </div>
                <div className="d-flex justify-content-center align-items-center primary-bg"
                     style={{width: "30%", height: "20vh", borderRadius: "7px"}}>
                    {withdraws !== null ?
                        <div className="d-flex flex-column justify-content-center align-items-center"
                             style={{height: "100%"}}>
                            <h4 className="mb-2">Withdraws Req</h4>
                            <span className="mt-2 text-info" style={{fontSize: "2rem"}}>{withdraws?.total || "-"}</span>
                        </div> : <Loading/>
                    }
                </div>
                <div className="d-flex justify-content-center align-items-center primary-bg"
                     style={{width: "30%", height: "20vh", borderRadius: "7px"}}>
                    {kycReq !== null ?
                        <div className="d-flex flex-column justify-content-center align-items-center"
                             style={{height: "100%"}}>
                            <h4 className="mb-2">KYC Req</h4>
                            <span className="mt-2 text-info" style={{fontSize: "2rem"}}>{kycReq?.total || "-"}</span>
                        </div> : <Loading/>
                    }
                </div>
            </div>

            <div className="d-flex flex-row justify-content-between align-items-start my-4 col-12" style={{width: "80%"}}>

                <Chain/>
                <Token/>

            </div>

            {/*<div className="d-flex flex-row justify-content-between align-items-center"
                 style={{width: "80%", height: "30vh"}}>
                <div className="d-flex flex-column justify-content-center align-items-center primary-bg py-4 px-2"
                     style={{width: "46%", borderRadius: "7px"}}>
                    <h4 className="mb-2">Total Orders</h4>
                    <div className="mt-2" style={{width: "100%"}}><OrdersChart/></div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center primary-bg py-4 px-2"
                     style={{width: "46%", borderRadius: "7px"}}>
                    <h4 className="mb-2">Total Trades</h4>
                    <div className="mt-2" style={{width: "100%"}}><TradesChart/></div>
                </div>
            </div>*/}

        </div>
    </ScrollBar>
}


export default Dashboard;
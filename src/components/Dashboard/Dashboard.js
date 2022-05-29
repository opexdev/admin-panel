import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading";
import OrdersChart from "./Charts/OrdersChart";
import ScrollBar from "../ScrollBar";
import TradesChart from "./Charts/TradesChart";

const Dashboard = () => {
    const [users, setUsers] = useState(null);
    const [withdraws, setWithdraws] = useState(null);
    const [kyc, setKYC] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const userController = new AbortController();
        const WController = new AbortController();
        const KYCController = new AbortController();

        axiosPrivate.get('/admin/auth/v1/user', {
            params: {offset: 0, size: 1}
        }, {
            signal: userController.signal
        }).then((res) => {
            isMounted && setUsers(res.data.total);
        }).catch((err) => {
            console.log(err)
        })

        axiosPrivate.get("/wallet/admin/withdraw", {
            params: {offset: 0, size: 1}
        }, {
            signal: WController.signal
        }).then((res) => {
            isMounted && setWithdraws(res.data.total);
        }).catch((err) => {
            console.log(err)
        })

        axiosPrivate.get(`/admin/auth/v1/group/kyc-requested/members`, {
            params: {offset: 0, size: 1}
        }, {
            signal: KYCController.signal
        }).then((res) => {
            isMounted && setKYC(res.data.total);
        }).catch((err) => {
            console.log(err)
        })

        return () => {
            isMounted = false;
            userController.abort();
            KYCController.abort();
            WController.abort();
        }
    }, [])


    return <ScrollBar>
        <div className="d-flex flex-column justify-content-around align-items-center" style={{minHeight: "100%"}}>

            {/* <div className="mb-5 d-flex flex-column justify-content-center align-items-center">
            <img src={toAbsoluteUrl("media/img/opexLogoPlus.svg")} style={{width:"25vw"}} className="mb-5" alt=""/>
            <h1 className="fw-bold mt-1" style={{fontFamily: 'Roboto Flex'}}>Admin Panel</h1>
        </div>
*/}


            <div className="d-flex flex-row justify-content-between align-items-center" style={{width: "80%"}}>
                <div className="d-flex justify-content-center align-items-center primary-bg"
                     style={{width: "30%", height: "20vh", borderRadius: "7px"}}>
                    {users !== null ?
                        <div className="d-flex flex-column justify-content-center align-items-center"
                             style={{height: "100%"}}>
                            <h4 className="mb-2">Total Users</h4>
                            <span className="mt-2 text-info" style={{fontSize:"2rem"}}>{users}</span>
                        </div> : <Loading/>
                    }
                </div>
                <div className="d-flex justify-content-center align-items-center primary-bg"
                     style={{width: "30%", height: "20vh", borderRadius: "7px"}}>
                    {withdraws !== null ?
                        <div className="d-flex flex-column justify-content-center align-items-center"
                             style={{height: "100%"}}>
                            <h4 className="mb-2">Withdraws Req</h4>
                            <span className="mt-2 text-info" style={{fontSize:"2rem"}}>{withdraws}</span>
                        </div> : <Loading/>
                    }
                </div>
                <div className="d-flex justify-content-center align-items-center primary-bg"
                     style={{width: "30%", height: "20vh", borderRadius: "7px"}}>
                    {kyc !== null ?
                        <div className="d-flex flex-column justify-content-center align-items-center"
                             style={{height: "100%"}}>
                            <h4 className="mb-2">KYC Req</h4>
                            <span className="mt-2 text-info" style={{fontSize:"2rem"}}>{kyc}</span>
                        </div> : <Loading/>
                    }
                </div>
            </div>


            <div className="d-flex flex-row justify-content-between align-items-center" style={{width: "80%"}}>
                <div className="d-flex flex-column justify-content-center align-items-center primary-bg py-4 px-2" style={{width:"46%" , borderRadius: "7px"}}>
                    <h4 className="mb-2">Total Orders</h4>
                    <div className="mt-2" style={{width:"100%"}}><OrdersChart/></div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center primary-bg py-4 px-2" style={{width:"46%" , borderRadius: "7px"}}>
                    <h4 className="mb-2">Total Trades</h4>
                    <div className="mt-2" style={{width:"100%"}}><TradesChart/></div>
                </div>

            </div>


            {/* <div className="row mt-3">
            <CounterWidget count={users !== null ? users : <Loading/>} icon="fa-users" name="Total Users"/>
            <CounterWidget count={withdraws !== null ? withdraws : <Loading/>} icon="fa-money-bill-transfer"
                           name="Withdraw Req"/>
            <CounterWidget count={kyc !== null ? kyc : <Loading/>} icon="fa-user" name="KYC Req"/>
        </div>*/}

        </div>
    </ScrollBar>
}


export default Dashboard;
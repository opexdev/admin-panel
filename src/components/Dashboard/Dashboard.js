import {useEffect, useState} from "react";
import CounterWidget from "./CounterWidget";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading";

const Dashboard = () => {
    const [users, setUsers] = useState(0);
    const [withdraws, setWithdraws] = useState(0);
    const [kyc, setKYC] = useState(0);
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


    return <div className="container">
        <div className="row mt-3">
            <CounterWidget count={users ? users : <Loading/>} icon="fa-users" name="Total Users"/>
            <CounterWidget count={withdraws ? withdraws : <Loading/>} icon="fa-money-bill-transfer"
                           name="Withdraw Req"/>
            <CounterWidget count={kyc ? kyc : <Loading/>} icon="fa-user" name="KYC Req"/>
        </div>
    </div>
}


export default Dashboard;
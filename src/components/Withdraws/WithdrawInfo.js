import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import moment from "moment/moment";
import WithdrawStatus from "./WithdrawStatus";

const WithdrawInfo = ({}) => {
    const [error, setError] = useState();
    const [withdraw, setWithdraw] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    let {id} = useParams();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        setIsLoading(true)
        const getWithdraws = async () => {
            await axiosPrivate.get("/wallet/admin/withdraw/?offset=0&size=1&withdraw_id="+id, {
                signal: controller.signal
            }).then((res) => {
                isMounted && setWithdraw(res.data.withdraws[0])
            }).catch((err) => {
                setError(err);
            }).finally(() => setIsLoading(false));
        }
        getWithdraws()

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    return (<div className="container">
        <div className="card mt-3">
            <div className="card-body">
                <div className="row mt-3">
                    {error ?
                        <div className="alert alert-danger mt-3" role="alert">
                            <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                            {error.toString()}
                        </div>
                        : ""
                    }

                    {isLoading ?
                        <div className="col-12 d-flex justify-content-center">
                            <div className="spinner-border text-secondary text-center" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : <>
                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Withdraw id:</span><span>{withdraw.withdrawId}</span>
                            </p>

                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Owner Uuid:</span><span>{withdraw.ownerUuid}</span>
                            </p>
                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Request Date:</span><span>{moment(withdraw.requestDate).format("YYYY/MM/DD hh:mm:ss")}</span>
                            </p>
                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Finalized Date:</span><span>{moment(withdraw.finalizedDate).format("YYYY/MM/DD hh:mm:ss")}</span>
                            </p>
                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Request Transaction:</span><span>{withdraw.requestTransaction}</span>
                            </p>
                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Finalized Transaction:</span><span>{withdraw.finalizedTransaction}</span>
                            </p>
                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Accepted Fee:</span><span>{withdraw.acceptedFee}</span>
                            </p>
                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Applied Fee:</span><span>{withdraw.appliedFee}</span>
                            </p>
                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Amount:</span><span>{withdraw.amount}</span>
                            </p>
                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Destination Amount:</span><span>{withdraw.destAmount}</span>
                            </p>
                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Destination Currency:</span><span>{withdraw.destCurrency}</span>
                            </p>
                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Destination Address:</span><span>{withdraw.destAddress}</span>
                            </p>
                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Destination Note:</span><span>{withdraw.destNote}</span>
                            </p>
                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Destination Transaction Ref:</span><span>{withdraw.destTransactionRef}</span>
                            </p>
                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Status Reason:</span><span>{withdraw.statusReason}</span>
                            </p>
                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Create Date:</span><span>{moment(withdraw.createDate).format("YYYY/MM/DD hh:mm:ss")}</span>
                            </p>
                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Status:</span><span>{withdraw.status}</span>
                            </p>
                            <p className="d-flex col-6 justify-content-between">
                                <span className="fw-bold">Accept Date:</span><span>{moment(withdraw.acceptDate).format("YYYY/MM/DD hh:mm:ss")}</span>
                            </p>
                        </>
                    }
                </div>
            </div>
        </div>
        {withdraw.status === "CREATED" ? <WithdrawStatus id={id}/> :""}
    </div>)
}

export default WithdrawInfo;
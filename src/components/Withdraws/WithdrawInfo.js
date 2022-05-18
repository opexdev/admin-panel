import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import moment from "moment/moment";
import WithdrawStatus from "./WithdrawStatus";
import ScrollBar from "../ScrollBar";
import Loading from "../Loading";
import {toAbsoluteUrl} from "../utils";
import UserImages from "../Users/UserImages";
import UserStatus from "../Users/UserStatus";

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

    const copyToClipboard = (value) => {
        navigator.clipboard.writeText(value)
    }


    return (
        <ScrollBar>

            <div className="col-12" style={{padding:"5vh 3vw"}}>

                {error ?
                    <div className="alert alert-danger mt-3" role="alert">
                        <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                        {error.toString()}
                    </div>
                    : ""
                }

                <div className="col-12 userInfoBox">
                    <h4 className="py-3 primary-bg rounded d-flex justify-content-center align-items-center">Withdraw Information</h4>

                    {isLoading ? <div className="col-12 d-flex justify-content-center align-items-center mt-4" style={{height:"50vh"}}><Loading/></div> : <>
                        <div className="d-flex flex-row">
                            <div className="col-6 pe-3">
                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center rounded-start">Withdraw ID</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.withdrawId || "-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end" style={{cursor:"pointer"}} onClick={() => copyToClipboard(withdraw.withdrawId)}>
                                            <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>
                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Owner Uuid</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.ownerUuid || "-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark d-flex justify-content-center align-items-center rounded-end" style={{cursor:"pointer"}} onClick={() => copyToClipboard(withdraw.ownerUuid)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Request Date</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.requestDate ? moment(withdraw.requestDate).format("YYYY/MM/DD hh:mm:ss") : "-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end" style={{cursor:"pointer"}} onClick={() => copyToClipboard(moment(withdraw.requestDate).format("YYYY/MM/DD hh:mm:ss"))}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Finalized Date</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.finalizedDate ? moment(withdraw.finalizedDate).format("YYYY/MM/DD hh:mm:ss") : "-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end" style={{cursor:"pointer"}} onClick={() => copyToClipboard(moment(withdraw.finalizedDate).format("YYYY/MM/DD hh:mm:ss"))}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Request Transaction</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.requestTransaction || "-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end" style={{cursor:"pointer"}} onClick={() => copyToClipboard(withdraw.requestTransaction)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Finalized Transaction</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.finalizedTransaction || "-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer"}} onClick={() => copyToClipboard(withdraw.finalizedTransaction)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Accepted Fee</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.acceptedFee || "-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer"}} onClick={() => copyToClipboard(withdraw.acceptedFee)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Applied Fee</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.appliedFee || "-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer"}} onClick={() => copyToClipboard(withdraw.appliedFee)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Amount</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.amount || "-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer"}} onClick={() => copyToClipboard(withdraw.amount)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>



                            </div>

                            <div className="col-6 pe-3">

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Destination Amount</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.destAmount || "-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer"}} onClick={() => copyToClipboard(withdraw.destAmount)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center rounded-start">Destination Currency</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.destCurrency || "-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end" style={{cursor:"pointer"}} onClick={() => copyToClipboard(withdraw.destCurrency)}>
                                            <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Destination Address</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.destAddress || "-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark d-flex justify-content-center align-items-center rounded-end" style={{cursor:"pointer"}} onClick={() => copyToClipboard(withdraw.destAddress)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Destination Note</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.destNote || "-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end" style={{cursor:"pointer"}} onClick={() => copyToClipboard(withdraw.destNote)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Destination Ref</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.destTransactionRef || "-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end" style={{cursor:"pointer"}} onClick={() => copyToClipboard(withdraw.destTransactionRef)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Status Reason</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.statusReason || "-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end" style={{cursor:"pointer"}} onClick={() => copyToClipboard(withdraw.statusReason)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Create Date</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.createDate ? moment(withdraw.createDate).format("YYYY/MM/DD hh:mm:ss") :"-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer"}} onClick={() => copyToClipboard(moment(withdraw.createDate).format("YYYY/MM/DD hh:mm:ss"))}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Status</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.status || "-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer"}} onClick={() => copyToClipboard(withdraw.status)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Accept Date</span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.acceptDate ? moment(withdraw.acceptDate).format("YYYY/MM/DD hh:mm:ss") : "-"}</span>
                                    <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer"}} onClick={() => copyToClipboard(moment(withdraw.acceptDate).format("YYYY/MM/DD hh:mm:ss"))}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>


                            </div>
                        </div>

                    </>
                    }
                </div>

                {withdraw.status === "CREATED" ? <WithdrawStatus id={id}/> :""}




            </div>










        </ScrollBar>

    )
}

export default WithdrawInfo;
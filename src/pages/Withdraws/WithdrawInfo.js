import React from "react";
import {useParams} from "react-router-dom";
import moment from "moment/moment";
import WithdrawStatus from "./WithdrawStatus";
import ScrollBar from "../../components/ScrollBar";
import Loading from "../../components/Loading";
import {copyToClipboard, toAbsoluteUrl} from "../../components/utils";
import {useGetWithdrawInfo} from "../../query";
import Date from "../../components/Date/Date";

const WithdrawInfo = () => {
    let {id} = useParams();
    const {data: withdraw, isLoading, error, refetch} = useGetWithdrawInfo(id)

    return (
        <ScrollBar>
            <div className="col-12" style={{padding: "5vh 3vw"}}>
                {error ?
                    <div className="alert alert-danger mt-3" role="alert">
                        <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                        {error.toString()}
                    </div>
                    : ""
                }
                <div className="col-12 userInfoBox">
                    <h4 className="py-3 primary-bg rounded d-flex justify-content-center align-items-center">Withdraw
                        Information</h4>
                    {isLoading ? <div className="col-12 d-flex justify-content-center align-items-center mt-4"
                                      style={{height: "50vh"}}><Loading/></div> : <>
                        <div className="d-flex flex-row">
                            <div className="col-6 pe-3">
                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span
                                        className="col-3 primary-bg d-flex justify-content-center align-items-center rounded-start">Withdraw ID</span>
                                    <span
                                        className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.withdrawId || "-"}</span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end"
                                        style={{cursor: "pointer"}}
                                        onClick={() => copyToClipboard(withdraw.withdrawId)}>
                                            <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")}
                                                 alt="copy"/>
                                    </span>
                                </div>
                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span
                                        className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Owner Uuid</span>
                                    <span
                                        className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.ownerUuid || "-"}</span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark d-flex justify-content-center align-items-center rounded-end"
                                        style={{cursor: "pointer"}} onClick={() => copyToClipboard(withdraw.ownerUuid)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")}
                                             alt="copy"/>
                                    </span>
                                </div>
                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span
                                        className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Request Date</span>
                                    <span
                                        className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.requestDate ? <><Date  date={withdraw.requestDate}/> {moment(withdraw.requestDate).format("hh:mm:ss")}</> : "-"}</span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end"
                                        style={{cursor: "pointer"}}
                                        onClick={() => copyToClipboard(<><Date  date={withdraw.requestDate}/> {moment(withdraw.requestDate).format("hh:mm:ss")}</>)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")}
                                             alt="copy"/>
                                    </span>
                                </div>
                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span
                                        className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Finalized Date</span>
                                    <span
                                        className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.finalizedDate ? <><Date  date={withdraw.finalizedDate}/> {moment(withdraw.finalizedDate).format("hh:mm:ss")}</> : "-"}</span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end"
                                        style={{cursor: "pointer"}}
                                        onClick={() => copyToClipboard(<><Date  date={withdraw.finalizedDate}/> {moment(withdraw.finalizedDate).format("hh:mm:ss")}</>)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")}
                                             alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span
                                        className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Request Transaction</span>
                                    <span
                                        className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.requestTransaction || "-"}</span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end"
                                        style={{cursor: "pointer"}}
                                        onClick={() => copyToClipboard(withdraw.requestTransaction)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")}
                                             alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span
                                        className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Finalized Transaction</span>
                                    <span
                                        className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.finalizedTransaction || "-"}</span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover"
                                        style={{cursor: "pointer"}}
                                        onClick={() => copyToClipboard(withdraw.finalizedTransaction)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")}
                                             alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span
                                        className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Accepted Fee</span>
                                    <span
                                        className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.acceptedFee || "-"}</span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover"
                                        style={{cursor: "pointer"}}
                                        onClick={() => copyToClipboard(withdraw.acceptedFee)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")}
                                             alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span
                                        className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Applied Fee</span>
                                    <span
                                        className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.appliedFee || "-"}</span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover"
                                        style={{cursor: "pointer"}}
                                        onClick={() => copyToClipboard(withdraw.appliedFee)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")}
                                             alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span
                                        className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Amount</span>
                                    <span
                                        className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.amount || "-"}</span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover"
                                        style={{cursor: "pointer"}} onClick={() => copyToClipboard(withdraw.amount)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")}
                                             alt="copy"/>
                                    </span>
                                </div>


                            </div>

                            <div className="col-6 pe-3">

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span
                                        className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Destination Amount</span>
                                    <span
                                        className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.destAmount || "-"}</span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover"
                                        style={{cursor: "pointer"}}
                                        onClick={() => copyToClipboard(withdraw.destAmount)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")}
                                             alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span
                                        className="col-3 primary-bg d-flex justify-content-center align-items-center rounded-start">Destination Currency</span>
                                    <span
                                        className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.destCurrency || "-"}</span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end"
                                        style={{cursor: "pointer"}}
                                        onClick={() => copyToClipboard(withdraw.destCurrency)}>
                                            <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")}
                                                 alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span
                                        className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Destination Address</span>
                                    <span
                                        className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.destAddress || "-"}</span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark d-flex justify-content-center align-items-center rounded-end"
                                        style={{cursor: "pointer"}}
                                        onClick={() => copyToClipboard(withdraw.destAddress)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")}
                                             alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span
                                        className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Destination Note</span>
                                    <span
                                        className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.destNote || "-"}</span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end"
                                        style={{cursor: "pointer"}} onClick={() => copyToClipboard(withdraw.destNote)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")}
                                             alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span
                                        className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Destination Ref</span>
                                    <span
                                        className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.destTransactionRef || "-"}</span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end"
                                        style={{cursor: "pointer"}}
                                        onClick={() => copyToClipboard(withdraw.destTransactionRef)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")}
                                             alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span
                                        className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Status Reason</span>
                                    <span
                                        className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.statusReason || "-"}</span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end"
                                        style={{cursor: "pointer"}}
                                        onClick={() => copyToClipboard(withdraw.statusReason)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")}
                                             alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span
                                        className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Create Date</span>
                                    <span
                                        className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{withdraw.createDate ? <><Date  date={withdraw.createDate}/> {moment(withdraw.createDate).format("hh:mm:ss")}</> : "-"}</span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover"
                                        style={{cursor: "pointer"}}
                                        onClick={() => copyToClipboard(<><Date  date={withdraw.createDate}/> {moment(withdraw.createDate).format("hh:mm:ss")}</>)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")}
                                             alt="copy"/>
                                    </span>
                                </div>

                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Status</span>
                                    <span className={`col-8 secondary-bg p-3 d-flex justify-content-center align-items-center`}>
                                        {withdraw?.status === "CREATED" ? "-" :
                                            <img className="table-img" src={withdraw.status === "DONE" ? toAbsoluteUrl("/media/img/check.svg") : toAbsoluteUrl("/media/img/remove.svg")} alt=""/>}
                                    </span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover"
                                        style={{cursor: "pointer"}} onClick={() => copyToClipboard(withdraw.status)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")}
                                             alt="copy"/>
                                    </span>
                                </div>
                                <div className="d-flex flex-row rounded my-3 inputGroup">
                                    <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">
                                        Accept Date
                                    </span>
                                    <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">
                                        {withdraw.acceptDate ? (<><Date date={withdraw.acceptDate}/> {moment(withdraw.acceptDate).format("hh:mm:ss")}</>)  : "-"}
                                    </span>
                                    <span
                                        className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover"
                                        style={{cursor: "pointer"}}
                                        onClick={() => copyToClipboard(<><Date  date={withdraw.acceptDate}/> {moment(withdraw.acceptDate).format("hh:mm:ss")}</>)}>
                                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                    }
                </div>
                {<WithdrawStatus id={id} withdraw={withdraw} refetch={refetch}/>}
            </div>
        </ScrollBar>

    )
}

export default WithdrawInfo;
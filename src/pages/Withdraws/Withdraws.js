import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {toAbsoluteUrl} from "../../components/utils";
import moment from "moment/moment";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading";
import ScrollBar from "../../components/ScrollBar";
import {useGetWithdrawsReq} from "../../query";

const Withdraws = () => {
    const [paginate, searchParams, setSearchParams] = usePagination();
    const [status, setStatus] = useState(searchParams.get('status') ?? "CREATED");
    const {data: withdraws, isLoading, error} = useGetWithdrawsReq(status, paginate.page, paginate.perPage)

    useEffect(() => {
        setSearchParams({status})
    }, [status])

    return <ScrollBar>
        <div className="col-12 d-flex flex-column justify-content-between align-items-center px-5 py-5">
            <div className="d-flex justify-content-center align-items-center pb-3"
                 onChange={(e) => setStatus(e.target.value)}>
                <div className="form-check form-check-inline">
                    <input className="form-check-input primary-bg" type="radio" name="status" value="CREATED"
                           defaultChecked={status === "CREATED"} id="CREATED"/>
                    <label className="form-check-label" htmlFor="CREATED">Created</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input primary-bg" type="radio" name="status" value="DONE"
                           defaultChecked={status === "DONE"} id="DONE"/>
                    <label className="form-check-label" htmlFor="DONE">Done</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input primary-bg" type="radio" name="status" value="REJECTED"
                           defaultChecked={status === "REJECTED"} id="REJECTED"/>
                    <label className="form-check-label" htmlFor="REJECTED">Rejected</label>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-between align-items-center" style={{width: "100%"}}>
                <table className="table table-bordered rounded text-center col-12 striped">
                    <thead className="py-2 my-2" style={{paddingBottom: "1vh !important"}}>
                    <tr>
                        <th scope="col"/>
                        <th scope="col">Destination Network</th>
                        <th scope="col">Destination Currency</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Accepted Fee</th>
                        <th scope="col">Applied Fee</th>
                        <th scope="col">Note</th>
                        <th scope="col">Create Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Show</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        isLoading ?
                            <tr>
                                <td colSpan="12" className="text-center py-5" style={{height: "50vh"}}>
                                    <Loading/>
                                </td>
                            </tr>
                            : withdraws.withdraws?.length === 0 ? <tr>
                                <td colSpan="12" className="text-center" style={{height: "50vh"}}>No Withdraw Exist</td>
                            </tr> :
                            withdraws.withdraws?.map((withdraw, index) => <tr key={withdraw.withdrawId}>
                                <th scope="row">{(paginate.page - 1) * paginate.perPage + index + 1}</th>
                                <td>{withdraw.destNetwork}</td>
                                <td><img className="table-img"
                                         src={toAbsoluteUrl("media/img/assets/" + withdraw.destCurrency + ".svg")}
                                         alt=""/>
                                </td>
                                <td>{withdraw.amount.toLocaleString()}</td>
                                <td>{withdraw.acceptedFee}</td>
                                <td>{withdraw.appliedFee}</td>
                                <td>{withdraw.destNote}</td>
                                <td>{moment(withdraw.createDate).format("YYYY/MM/DD hh:mm:ss")}</td>
                                <td>
                                    {withdraw?.status === "CREATED" ? "-" :
                                        <img className="table-img"
                                             src={withdraw.status === "DONE" ? toAbsoluteUrl("/media/img/check.svg") : toAbsoluteUrl("/media/img/remove.svg")} alt=""/>}
                                </td>
                                <td>
                                    <Link to={withdraw.withdrawId.toString()}>
                                        <img className="table-img pointer" src={toAbsoluteUrl("media/img/info.svg")}
                                             alt=""/>
                                    </Link>
                                </td>
                            </tr>)
                    }
                    </tbody>
                </table>
                {error ?
                    <div className="alert alert-danger" role="alert">
                        <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                        {error.toString()}
                    </div>
                    : ""
                }
                {(!isLoading && withdraws.total > paginate.perPage) &&
                <div className="mt-2">
                    <Pagination total={withdraws.total} paginate={paginate}/>
                </div>
                }
            </div>
        </div>
    </ScrollBar>
}
export default Withdraws;
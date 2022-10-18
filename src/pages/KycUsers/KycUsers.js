import React, {useState} from "react";
import {Link} from "react-router-dom";
import {toAbsoluteUrl} from "../../components/utils";
import Pagination from "../../components/Pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import {users as userRoute} from "../../routes/routes";
import Loading from "../../components/Loading";
import {toast} from "react-hot-toast";
import ScrollBar from "../../components/ScrollBar";
import {useGetUsersByGroup} from "../../query";
import {adminGetImpersonateLoginToken} from "js-api-client";

const KycUsers = () => {
    const [status, setStatus] = useState("kyc-requested");
    const [paginate] = usePagination();

    const {data: users, isLoading, error} = useGetUsersByGroup(status, paginate.page, paginate.perPage)

    const impersonateLogin = async (userId) => {
        await adminGetImpersonateLoginToken(userId)
            .then((res) => {
                return window.open(window.env.REACT_APP_FRONT_URL + "/login?impersonate=" + res.data.access_token, '_blank');
            }).catch((e) => {
                toast.error(e.response.data.message);
            })
    }

    return <div className="col-12 d-flex flex-column justify-content-between align-items-center px-5 py-5">
        <div className="d-flex justify-content-center align-items-center" style={{height: "12%", width: "100%"}}
             onChange={(e) => setStatus(e.target.value)}>

            <div className="form-check form-check-inline">
                <input className="form-check-input primary-bg" type="radio" name="status" value="kyc-requested"
                       defaultChecked={status === "kyc-requested"} id="kyc-requested"/>
                <label className="form-check-label" htmlFor="kyc-requested">Requested</label>
            </div>

            <div className="form-check form-check-inline">
                <input className="form-check-input primary-bg" type="radio" name="status" value="kyc-accepted"
                       defaultChecked={status === "kyc-accepted"} id="kyc-accepted"/>
                <label className="form-check-label" htmlFor="kyc-accepted">Accepted</label>
            </div>

            <div className="form-check form-check-inline">
                <input className="form-check-input primary-bg" type="radio" name="status" value="kyc-rejected"
                       defaultChecked={status === "kyc-rejected"} id="kyc-rejected"/>
                <label className="form-check-label" htmlFor="kyc-rejected">Rejected</label>
            </div>


            <div className="form-check form-check-inline">
                <input className="form-check-input primary-bg" type="radio" name="status" value="kyc-blocked"
                       defaultChecked={status === "kyc-blocked"} id="kyc-blocked"/>
                <label className="form-check-label" htmlFor="kyc-blocked">Blocked</label>
            </div>

        </div>
        <div className="d-flex flex-column justify-content-between align-items-center"
             style={{height: "88%", width: "100%"}}>
            <ScrollBar>
                <table className="table table-bordered rounded text-center col-12 striped">
                    <thead className="py-2 my-2" style={{paddingBottom: "1vh !important"}}>
                    <tr>
                        <th scope="col"/>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">ID</th>
                        <th scope="col">Enable</th>
                        <th scope="col">Email Verified</th>
                        <th scope="col">Login as user</th>
                        <th scope="col">Detail</th>
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
                            : users?.users?.length === 0 ?
                            <tr>
                                <td colSpan="12" className="text-center" style={{height: "50vh"}}>No User Exist</td>
                            </tr> :
                            users?.users?.map((user, index) => <tr key={user.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.id}</td>
                                <td>
                                    <img className="table-img"
                                         src={user.isEnabled ? toAbsoluteUrl("media/img/check.svg") : toAbsoluteUrl("media/img/remove.svg")}
                                         alt=""/></td>
                                <td>
                                    <img className="table-img"
                                         src={user.isEmailVerified ? toAbsoluteUrl("media/img/check.svg") : toAbsoluteUrl("media/img/remove.svg")}
                                         alt=""/></td>
                                <td>
                                    <img className="table-img pointer" onClick={() => impersonateLogin(user.id)}
                                         src={toAbsoluteUrl("media/img/double-arrow.svg")} alt=""/></td>
                                <td>
                                    <Link to={"/" + userRoute + "/" + user.id}>
                                        <img className="table-img pointer" src={toAbsoluteUrl("media/img/info.svg")}
                                             alt=""/>
                                    </Link>
                                </td>
                            </tr>)
                    }
                    </tbody>
                </table>
            </ScrollBar>
            {error ?
                <div className="alert alert-danger" role="alert">
                    <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                    {error.toString()}
                </div>
                : ""
            }
            {(!isLoading && users?.total > paginate.perPage) &&
            <div className="mt-2">
                <Pagination total={users.total} paginate={paginate}/>
            </div>
            }
        </div>
    </div>
}

export default KycUsers;
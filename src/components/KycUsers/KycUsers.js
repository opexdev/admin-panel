import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {Link} from "react-router-dom";
import {toAbsoluteUrl} from "../utils";
import Pagination from "../Pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import {users as userRoute} from "../../routes/routes";

const KycUsers = () => {
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState({total: 0, users: []});
    const [status, setStatus] = useState("kyc-requested");
    const [error, setError] = useState();
    const [paginate] = usePagination();
    let maxPage = Math.ceil(users.total / paginate.perPage)

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        setIsLoading(true)
        setError(false)
        const getKYCUser = async () => {
            await axiosPrivate.get(`/admin/auth/v1/group/${status}/members`, {
                params: {
                    offset: paginate.perPage * (paginate.page - 1),
                    size: paginate.perPage
                }
            }, {
                signal: controller.signal
            }).then((res) => {
                isMounted && setUsers(res.data);
            }).catch((err) => {
                setError(err);
            }).finally(() => setIsLoading(false));
        }
        getKYCUser()

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [status])

    return <div className="container">
        <div className="row mt-3">
            {error ?
                <div className="alert alert-danger mt-3 col-6" role="alert">
                    <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                    {error.toString()}
                </div>
                : ""
            }
            <div className="col-12" onChange={(e) => setStatus(e.target.value)}>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="status" value="kyc-requested"
                           defaultChecked={status === "kyc-requested"}  id="kyc-requested"/>
                    <label className="form-check-label" htmlFor="kyc-requested">Requested</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="status" value="kyc-rejected"
                           defaultChecked={status === "kyc-rejected"} id="kyc-rejected"/>
                    <label className="form-check-label" htmlFor="kyc-rejected">Rejected</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="status" value="kyc-accepted"
                           defaultChecked={status === "kyc-accepted"} id="kyc-accepted"/>
                    <label className="form-check-label" htmlFor="kyc-accepted">Accepted</label>
                </div>
            </div>
        </div>
        <div className="row mt-3">
            <table className="table table-striped col-12 ">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">isEnabled</th>
                    <th scope="col">isEmailVerified</th>
                    <th scope="col">Login as user</th>
                    <th scope="col">Detail</th>
                </tr>
                </thead>
                <tbody>
                {
                    isLoading ?
                        <tr>
                            <td colSpan="12" className="text-center">
                                <div className="spinner-border text-secondary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </td>
                        </tr>
                        : users?.users?.length === 0 ?
                        <tr><td colSpan="12" className="text-center">No User Exist</td></tr>:
                        users?.users?.map((user, index) => <tr key={user.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <img className="table-img"
                                     src={user.isEnabled ? toAbsoluteUrl("media/img/check.png") : toAbsoluteUrl("media/img/remove.png")}
                                     alt=""/></td>
                            <td>
                                <img className="table-img"
                                     src={user.isEmailVerified ? toAbsoluteUrl("media/img/check.png") : toAbsoluteUrl("media/img/remove.png")}
                                     alt=""/></td>
                            <td>
                                <img className="table-img pointer"
                                     src={toAbsoluteUrl("media/img/double-chevron.png")} alt=""/></td>
                            <td>
                                <Link to={"/"+userRoute+"/"+user.id}>
                                    <img className="table-img pointer" src={toAbsoluteUrl("media/img/info.png")} alt=""/>
                                </Link>
                            </td>
                        </tr>)
                }
                </tbody>
            </table>
            <Pagination maxPage={maxPage} paginate={paginate}/>
        </div>
    </div>
}

export default KycUsers;
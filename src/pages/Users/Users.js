import React from "react";
import {Link} from "react-router-dom";
import {toAbsoluteUrl} from "../../components/utils";
import {toast} from "react-hot-toast";
import Pagination from "../../components/Pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import Loading from "../../components/Loading";
import ScrollBar from "../../components/ScrollBar";
import {useGetUsersList} from "../../query";
import {adminGetImpersonateLoginToken} from "js-api-client";

const Users = () => {

    const [paginate] = usePagination();
    const {data: users, isLoading, error} = useGetUsersList(paginate.page, paginate.perPage)

    const impersonateLogin = async (userId) => {
        await adminGetImpersonateLoginToken(userId)
            .then((res) => {
                return window.open(window.env.REACT_APP_FRONT_URL + "/login?impersonate=" + res.data.access_token, '_blank');
            }).catch((e) => {
                toast.error(e.response.data.message);
            })
    }


    return <ScrollBar>
        <div className="col-12 d-flex flex-column justify-content-between align-items-center px-5 py-5">
            <table className="table table-bordered rounded text-center col-12 striped table-responsive">
                <thead className="py-2 my-2" style={{paddingBottom: "1vh !important"}}>
                <tr className="">
                    <th scope="col my-1" style={{width: "4%"}}/>
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
                        users?.users.map((user, index) => <tr key={user.id}>
                            <th scope="row">{(paginate.page - 1) * paginate.perPage + index + 1}</th>
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
                                <Link to={user.id}>
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
            {(!isLoading && users?.total > paginate.perPage)&&
            <div className="mt-2">
                <Pagination total={users.total} paginate={paginate}/>
            </div>
            }
        </div>
    </ScrollBar>
}

export default Users;
import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {Link} from "react-router-dom";
import {toAbsoluteUrl} from "../utils";
import {toast} from "react-hot-toast";
import Pagination from "../Pagination/Pagination";
import usePagination from "../../hooks/usePagination";

const Users = () => {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState({total: 0, users: []});

    const axiosPrivate = useAxiosPrivate();
    const [paginate] = usePagination();

    let maxPage = Math.ceil(users.total / paginate.perPage)

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        setIsLoading(true)
        const getUser = async () => {
            await axiosPrivate.get('/admin/auth/v1/user', {
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
        getUser()

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [paginate])


    const impersonateLogin = async (user) => {
        const params =
            {
                "clientId": window.env.REACT_APP_CLIENT_ID,
                "clientSecret": window.env.REACT_APP_CLIENT_SECRET,
                "userId": user
            }
        return await axiosPrivate.post('/admin/auth/v1/user/impersonate', params)
            .then((res) => {
                return window.open(window.env.REACT_APP_FRONT_URL + "/login?token=" + res.data.access_token, '_blank');
            }).catch((e) => {
                toast.error(e.response.data.message);
            })
    }

    return <div className="container">
        <div className="row mt-3">
            {error ?
                <div className="alert alert-danger mt-3" role="alert">
                    <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                    {error.toString()}
                </div>
                : ""
            }
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
                        users?.users.map((user, index) => <tr key={user.id}>
                            <th scope="row">{(paginate.page - 1) * paginate.perPage + index + 1}</th>
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
                                <img className="table-img pointer" onClick={() => impersonateLogin(user.id)}
                                     src={toAbsoluteUrl("media/img/double-chevron.png")} alt=""/></td>
                            <td>
                                <Link to={user.id}>
                                    <img className="table-img pointer" src={toAbsoluteUrl("media/img/info.png")}
                                         alt=""/>
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

export default Users;
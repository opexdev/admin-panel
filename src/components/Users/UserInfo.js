import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {toAbsoluteUrl} from "../utils";
import UserStatus from "./UserStatus";

const UserInfo = () => {
    const {id} = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [user, setUser] = useState();
    const [error, setError] = useState();
    const [images, setImages] = useState({
        idCard: "",
        selfie: "",
        acceptForm: "",
    })
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        setIsLoading(true)
        const getUser = async () => {
            await axiosPrivate.get('/admin/auth/v1/user/'+id, {
                signal: controller.signal
            }).then((res) => {
                isMounted && setUser(res.data);
            }).catch((err) => {
                setError(err);
            }).finally(() => setIsLoading(false));
        }
        getUser()

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    useEffect(() => {
        if (user?.attributes?.idCard?.[0]) getImages("idCard", user?.attributes?.idCard?.[0])
        if (user?.attributes?.acceptForm?.[0]) getImages("acceptForm", user?.attributes?.acceptForm?.[0])
        if (user?.attributes?.selfie?.[0]) getImages("selfie", user?.attributes?.selfie?.[0])
    }, [user])

    const attrHandler = (attr) => {
        if (!user.attributes) {
            return "-"
        }
        if (!user.attributes[attr]) {
            return "-"
        }
        return user.attributes[attr][0]
    }

    const getImages = async (name, url) => {
        await axiosPrivate.get(`/storage/admin/download${url}`, {
                responseType: "arraybuffer"
            }
        ).then((res) => {
            const blob = new Blob([res.data], { type: res.headers['content-type'] });
            const imageUrl = URL.createObjectURL(blob);
            setImages({
                ...images,
                [name]: imageUrl
            })
        })
    }

    return (
        <div className="container">
            <div className="card my-5">
                <h5 className="card-header">User Information</h5>
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
                            <div className="spinner-border text-secondary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : <>
                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">User id:</span><span>{user.id}</span>
                                </p>
                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">Email:</span><span>{user.email}</span>
                                </p>
                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">Username:</span><span>{user.username}</span>
                                </p>
                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">Enable:</span><span><img className="table-img" src={user.isEnabled ? toAbsoluteUrl("/media/img/check.png") : toAbsoluteUrl("/media/img/remove.png")} alt=""/></span>
                                </p>
                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">First Name:</span><span>{user.firstName}</span>
                                </p>

                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">Email Verified:</span><span><img className="table-img" src={user.isEmailVerified ? toAbsoluteUrl("/media/img/check.png") : toAbsoluteUrl("/media/img/remove.png")} alt=""/></span>
                                </p>
                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">Last Name:</span><span>{user.lastName}</span>
                                </p>

                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">Nationality:</span><span>{attrHandler("nationality")}</span>
                                </p>
                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">First Name (En):</span><span>{attrHandler("firstNameEn")}</span>
                                </p>
                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">Residence:</span><span>{attrHandler("residence")}</span>
                                </p>
                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">Last Name (En):</span><span>{attrHandler("lastNameEn")}</span>
                                </p>

                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">Passport Number:</span><span>{attrHandler("passportNumber")}</span>
                                </p>
                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">Birthday:</span><span>{attrHandler("birthday")}</span>
                                </p>
                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">Birthday (Alt):</span><span>{attrHandler("birthdayAlt")}</span>
                                </p>
                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">Postal Code:</span><span>{attrHandler("postalCode")}</span>
                                </p>

                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">Telephone:</span><span>{attrHandler("telephone")}</span>
                                </p>
                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">Phone Number:</span><span>{attrHandler("phoneNumber")}</span>
                                </p>
                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">Required Actions:</span><span>{user?.requiredActions ? user?.requiredActions.map((action)=>
                                    <span className="badge bg-warning text-dark mx-2" key={action}>{action}</span>) :"-" }</span>
                                </p>
                                <p className="d-flex col-6 justify-content-between">
                                    <span className="fw-bold">Groups:</span><span>{user?.groups ? user.groups.map((group)=>
                                    <span className="badge bg-primary mx-2" key={group.id}>{group.name}</span>) :"-" }</span>
                                </p>
                                <p className="d-flex col-12 justify-content-between">
                                    <span className="fw-bold">Address:</span><span>{attrHandler("address")}</span>
                                </p>
                        </>
                        }
                    </div>
                </div>
            </div>
            {
                !isLoading && ( images?.acceptForm || images.selfie || images.idCard )?
                    <div className="card">
                        <h5 className="card-header p-2">User Documents</h5>
                        <div className="card-body">
                            <div className="row">
                                {
                                    images.acceptForm ?
                                        <figure className="figure col-6">
                                            <img src={images.acceptForm} className="figure-img img-fluid rounded" alt="User accept form"/>
                                            <figcaption className="figure-caption">User accept form
                                            </figcaption>
                                        </figure> : ""
                                }
                                {
                                    images.selfie ?
                                        <figure className="figure col-6">
                                            <img src={images.selfie} className="figure-img img-fluid rounded" alt="User accept form"/>
                                            <figcaption className="figure-caption">User selfie image
                                            </figcaption>
                                        </figure> : ""
                                }
                                {
                                    images.idCard ?
                                        <figure className="figure col-6">
                                            <img src={images.idCard} className="figure-img img-fluid rounded" alt="User accept form"/>
                                            <figcaption className="figure-caption">User idCard
                                            </figcaption>
                                        </figure> : ""
                                }
                            </div>
                        </div>
                    </div>
                    : ""
            }
            {
                !isLoading && user?.groups.filter((g)=> g.name === "kyc-requested").length > 0  ? <UserStatus id={user.id}/> :""
            }
        </div>
    )
}

export default UserInfo;
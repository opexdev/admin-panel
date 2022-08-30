import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import {adminSetUserGroup, adminSetUserKycStatus} from "js-api-client";

const UserStatus = ({id, initialState, children, refetchFunc}) => {
    const [error, setError] = useState();
    const [status, setStatus] = useState(initialState ?? "kyc-requested")
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [reason, setReason] = useState("");

    useEffect(() => {
        setIsLoading(false)
        setIsSuccess(false)
        setError()
    }, [status])

    const submit = async (e) => {
        e.preventDefault();
        if (isLoading) return
        setIsLoading(true)
        setError(false)
        if (status === "kyc-requested") {
            const group = status.replace('kyc-', '').toUpperCase();
            return adminSetUserGroup(id, group)
                .then(() => {
                    setIsSuccess(true)
                    refetchFunc()
                })
                .catch((err) => setError(err))
                .finally(() => setIsLoading(false))
        }
        adminSetUserKycStatus(id, status, reason)
            .then(() => {
                setIsSuccess(true)
                refetchFunc()
            })
            .catch((err) => setError(err))
            .finally(() => setIsLoading(false))
    }

    return (
        <div className="col-12 userInfoBox">
            <h4 className="py-3 primary-bg rounded d-flex justify-content-center align-items-center">User KYC
                Status</h4>

            <div className="d-flex flex-column  d-flex justify-content-between align-items-center col-12 px-4 py-4"
                 style={{height: "100%"}}>
                {children ? children : <>
                    <div className="col-12 d-flex flex-row justify-content-center align-items-center mb-5"
                         onChange={(e) => setStatus(e.target.value)}>
                        <div className="form-check  form-check-inline">
                            <input className="form-check-input primary-bg" type="radio" name="status" id="kyc-requested"
                                   value="kyc-requested" defaultChecked={initialState === "kyc-requested"}/>
                            <label className="form-check-label" htmlFor="kyc-requested">
                                Requested
                            </label>
                        </div>
                        <div className="form-check  form-check-inline">
                            <input className="form-check-input primary-bg" type="radio" name="status" id="accept"
                                   value="kyc-accepted" defaultChecked={initialState === "kyc-accepted"}/>
                            <label className="form-check-label" htmlFor="accept">
                                Accept
                            </label>
                        </div>
                        <div className="form-check  form-check-inline">
                            <input className="form-check-input primary-bg" type="radio" name="status" id="reject"
                                   value="kyc-rejected" defaultChecked={initialState === "kyc-rejected"}/>
                            <label className="form-check-label" htmlFor="reject">
                                Reject
                            </label>
                        </div>
                        <div className="form-check  form-check-inline">
                            <input className="form-check-input primary-bg" type="radio" name="status" id="blocked"
                                   value="kyc-blocked" defaultChecked={initialState === "kyc-blocked"}/>
                            <label className="form-check-label" htmlFor="blocked">
                                Block
                            </label>
                        </div>
                    </div>

                    <form onSubmit={(e) => submit(e)}
                          className="col-12 d-flex flex-row justify-content-center align-items-end">

                        {(status === "kyc-rejected" || status === "kyc-blocked") &&
                        <div className="col-9">
                            <label htmlFor="extra"
                                   className="form-label">Reason</label>
                            <input type="text" className="form-control secondary-bg py-3"
                                   style={{border: "none"}} id="extra"
                                   onChange={(e) => setReason(e.target.value)}
                                   value={reason}
                                   placeholder="Reason"
                            />
                        </div>
                        }
                        <div className="col-3 d-flex justify-content-center align-items-end">
                            {status !== "requested" &&
                            <button type="submit"
                                    disabled={initialState === status || ((status === "kyc-rejected" || status === "kyc-blocked") && (reason === ""))}
                                    className="btn btn-success px-5 py-2">{isLoading ?
                                <Loading/> : "Submit"}
                            </button>
                            }
                        </div>
                    </form>

                    <div className="col-12 d-flex justify-content-center align-items-center mt-5">
                        {error &&
                        <div className="alert alert-danger" role="alert">
                            <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                            {error.toString()}
                        </div>
                        }
                        {isSuccess &&
                        <div className="alert alert-success" role="alert">
                            User Successfully add to group
                        </div>
                        }
                    </div>
                </>}
            </div>
        </div>
    )
}

export default UserStatus;
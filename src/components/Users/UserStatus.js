import React, {useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading";

const UserStatus = ({id, initialState , children}) => {
    const axiosPrivate = useAxiosPrivate();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [status, setStatus] = useState("")
    const [currentState, setCurrentStatus] = useState(initialState ?? "kyc-requested")



    const [reason, setReason] = useState("");


    const submit = async () => {
        if (isLoading) return
        setIsLoading(true)
        setError(false)
        if (status === "kyc-requested") {

            const group = status.replace('kyc-', '').toUpperCase();
            await axiosPrivate.post(`/admin/auth/v1/user/${id}/join-kyc?kycGroup=${group}`)
                .then(() => {
                    setIsSuccess(true)
                    setCurrentStatus(status)
                })
                .catch((err) => setError(err))
                .finally(() => setIsLoading(false))
        }

        if (status === "kyc-accepted") {
            await axiosPrivate.post(`/admin/auth/v1/user/${id}/kyc/accept`)
                .then(() => {
                    setIsSuccess(true)
                    setCurrentStatus(status)
                })
                .catch((err) => setError(err))
                .finally(() => setIsLoading(false))
        }
        if (status === "kyc-rejected") {

            await axiosPrivate.post(`/admin/auth/v1/user/${id}/kyc/reject?reason=${reason}`)
                .then(() => {
                    setIsSuccess(true)
                    setCurrentStatus(status)
                })
                .catch((err) => setError(err))
                .finally(() => setIsLoading(false))
        }
        if (status === "kyc-blocked") {

            await axiosPrivate.post(`/admin/auth/v1/user/${id}/kyc/block?reason=${reason}`)
                .then(() => {
                    setIsSuccess(true)
                    setCurrentStatus(status)
                })
                .catch((err) => setError(err))
                .finally(() => setIsLoading(false))
        }



    }



    return (
            <div className="col-12 userInfoBox">
            <h4 className="py-3 primary-bg rounded d-flex justify-content-center align-items-center">User KYC Status</h4>
                { children ? children : <div className="d-flex flex-column col-12 secondary-bg card py-4">
                    <div className="d-flex flex-row col-12 ">
                        <div onChange={(e) => setStatus(e.target.value)} className="col-6 d-flex justify-content-between px-4 align-items-center">
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
                            {
                                status === "requested" ? "" :
                                    <div className="form-check-inline">
                                        <button type="button" disabled={currentState === status || ( (status === "kyc-rejected" || status === "kyc-blocked") && (reason === "")) } onClick={submit}
                                                className="btn btn-success">{isLoading ?
                                            <Loading/> : "Submit"}</button>
                                    </div>
                            }
                        </div>
                        <div className="col-6 d-flex justify-content-center align-items-center px-1">
                            {error ?
                                <div className="alert alert-danger" role="alert">
                                    <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                                    {error.toString()}
                                </div>
                                : ""
                            }
                            {isSuccess ?
                                <div className="alert alert-success" role="alert">
                                   {/* <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>*/}
                                    User Successfully add to group
                                </div>
                                : ""
                            }
                        </div>
                    </div>

                    { (status === "kyc-rejected" || status === "kyc-blocked") && <div className="mt-3 col-6 px-4">
                        <div className="input-group">
                            <span className="input-group-text primary-bg text-color" id="basic-addon1" style={{border:"none"}}>Reason</span>
                            <input type="text" className="form-control secondary-bg text-color" style={{border:"none"}} placeholder="" aria-label="Username"
                                   aria-describedby="basic-addon1"
                                   value={reason}
                                   onChange={(e) => setReason(e.target.value)}
                            />
                        </div>
                    </div> }





                </div>}
        </div>
    )
}

export default UserStatus;
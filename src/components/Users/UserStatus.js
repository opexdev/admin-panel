import React, {useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UserStatus = ({id, initialState}) => {
    const axiosPrivate = useAxiosPrivate();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [status, setStatus] = useState("")
    const [currentState, setCurrentStatus] = useState(initialState ?? "kyc-requested")

    const submit = async () => {
        if (isLoading) return
        setIsLoading(true)
        setError(false)
        const group = status.replace('kyc-', '').toUpperCase();
        await axiosPrivate.post(`/admin/auth/v1/user/${id}/join-kyc?kycGroup=${group}`)
            .then(() => {
                setIsSuccess(true)
                setCurrentStatus(status)
            })
            .catch((err) => setError(err))
            .finally(() => setIsLoading(false))
    }


    return (
        <div className="card my-3 col-12">
            <h5 className="card-header">User KYC Status</h5>
            <div className="card-body" style={{minHeight: "20vh"}}>
                <div className="row mt-3">
                    {error ?
                        <div className="alert alert-danger" role="alert">
                            <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                            {error.toString()}
                        </div>
                        : ""
                    }
                    {isSuccess ?
                        <div className="alert alert-success" role="alert">
                            <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                            User Successfully add to group
                        </div>
                        : ""
                    }
                    <div onChange={(e) => setStatus(e.target.value)}>
                        <div className="form-check  form-check-inline">
                            <input className="form-check-input" type="radio" name="status" id="kyc-requested"
                                   value="kyc-requested" defaultChecked={initialState === "kyc-requested"}/>
                            <label className="form-check-label" htmlFor="kyc-requested">
                                Requested
                            </label>
                        </div>
                        <div className="form-check  form-check-inline">
                            <input className="form-check-input" type="radio" name="status" id="accept"
                                   value="kyc-accepted" defaultChecked={initialState === "kyc-accepted"}/>
                            <label className="form-check-label" htmlFor="accept">
                                Accept
                            </label>
                        </div>
                        <div className="form-check  form-check-inline">
                            <input className="form-check-input" type="radio" name="status" id="reject"
                                   value="kyc-rejected" defaultChecked={initialState === "kyc-rejected"}/>
                            <label className="form-check-label" htmlFor="reject">
                                Rejected
                            </label>
                        </div>
                        {
                            status === "requested" ? "" :
                                <div className="mt-5  form-check-inline">
                                    <button type="button" disabled={currentState === status} onClick={submit}
                                            className="btn btn-success">{isLoading ?
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> : "Submit"}</button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserStatus;
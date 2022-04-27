import React, {useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UserStatus = ({id}) => {
    const axiosPrivate = useAxiosPrivate();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("kyc-requested")
    const [isSuccess, setIsSuccess] = useState(false);

    const submit = async () => {
        if (status === "kyc-requested" || isLoading) return
        setIsLoading(true)
        setError(false)
        await axiosPrivate.post(`/admin/auth/v1/user/${id}/kyc/${status}`)
            .then(() => {setIsSuccess(true)})
            .catch((err) => setError(err))
            .finally(() => setIsLoading(false))
    }
    return (
        <div className="card my-5 col-6">
            <h5 className="card-header">User KYC Status</h5>
            <div className="card-body" style={{minHeight: "20vh"}}>
                <div className="row mt-3">
                    {error ?
                        <div className="alert alert-danger mt-3" role="alert">
                            <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                            {error.toString()}
                        </div>
                        : ""
                    }
                    {isSuccess ?
                        <div className="alert alert-danger mt-3" role="alert">
                            <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                            User Successfully add to group
                        </div>
                        : ""
                    }
                    <div onChange={(e) => setStatus(e.target.value)}>
                        <div className="form-check  form-check-inline">
                            <input className="form-check-input" type="radio" name="status" id="kyc-requested"
                                   value="kyc-requested" defaultChecked={status === "kyc-requested"}/>
                            <label className="form-check-label" htmlFor="kyc-requested">
                                Requested
                            </label>
                        </div>
                        <div className="form-check  form-check-inline">
                            <input className="form-check-input" type="radio" name="status" id="accept"
                                   value="accept" defaultChecked={status === "accept"}/>
                            <label className="form-check-label" htmlFor="accept">
                                Accept
                            </label>
                        </div>
                        <div className="form-check  form-check-inline">
                            <input className="form-check-input" type="radio" name="status" id="reject"
                                   value="reject" defaultChecked={status === "reject"}/>
                            <label className="form-check-label" htmlFor="reject">
                                Rejected
                            </label>
                        </div>
                        {
                            status === "requested" ? "" :
                                <div className="d-grid mt-5  form-check-inline">
                                    <button type="button" onClick={submit} className="btn btn-success">{isLoading ?
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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import React, {useState} from "react";

const WithdrawStatus = ({id}) => {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [withdrawState, setWithdrawState] = useState();
    const [withdrawExp, setWithdrawExp] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    const axiosPrivate = useAxiosPrivate();


    const submitFrom = async (e) => {
        e.preventDefault();
        if (isLoading) return
        if (!withdrawState || !withdrawExp) {
            return setError("Transaction Ref or Reason must filled!")
        }
        setError(false)
        setIsLoading(true)

        const controller = new AbortController();
        const params = new URLSearchParams();
        params.append('statusReason', withdrawState);
        params.append('destTransactionRef', withdrawExp);
        if (withdrawState === "accept") {
            params.append('fee', 0);
        }
        await axiosPrivate.post(`/wallet/admin/withdraw/${id}/${withdrawState}`, params, {
            headers: {'Content-Type': "application/x-www-form-urlencoded"},
            signal: controller.signal
        }).then(() => {
            setIsSuccess(true);
        }).catch((err) => {
            setError(err);
            setIsLoading(false)
        });

    }

    return (
        <div className="card mt-3">
            <div className="card-body">
                {error ?
                    <div className="alert alert-danger mt-3" role="alert">
                        <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                        {error.toString()}
                    </div>
                    : ""
                }
                {isSuccess ?
                    <div className="alert alert-success mt-3" role="alert">
                        <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                        Successfully Sent.
                    </div>
                    :
                    <div className="row mt-3">
                        <div onChange={(e) => setWithdrawState(e.target.value)}>
                            <h3>Requests Status :</h3>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="status" id="exampleRadios1"
                                       value="accept"/>
                                <label className="form-check-label" htmlFor="exampleRadios1">
                                    Accept
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="status" id="exampleRadios2"
                                       value="reject"/>
                                <label className="form-check-label" htmlFor="exampleRadios2">
                                    Reject
                                </label>
                            </div>
                        </div>
                        {
                            typeof withdrawState === "undefined" ? "" : <form onSubmit={(e) => submitFrom(e)}>
                                <div className="mb-3">
                                    <label htmlFor="extra"
                                           className="form-label">{withdrawState === "accept" ? "Transaction Ref" : "Reason"}</label>
                                    <input type="text" className="form-control" id="extra"
                                           onChange={(e) => setWithdrawExp(e.target.value)}
                                           value={withdrawExp}
                                           placeholder={withdrawState === "accept" ? "Transaction Ref" : "Reason"}
                                    />
                                </div>
                                <div className="d-grid mt-5">
                                    <button type="submit" className="btn btn-success">{isLoading ?
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> : "Submit"}</button>
                                </div>
                            </form>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default WithdrawStatus;
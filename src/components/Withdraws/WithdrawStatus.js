import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import React, {useState} from "react";
import Loading from "../Loading";

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
            setIsLoading(false)
        }).catch((err) => {
            setError(err);
            setIsLoading(false)
        });
    }

    return (
        <div className="col-12 userInfoBox mt-5">

            <h4 className="py-3 primary-bg rounded d-flex justify-content-center align-items-center">Withdraw Status</h4>

            <div className="d-flex flex-column  d-flex justify-content-between align-items-center col-12 px-4 py-4" style={{height:"100%"}}>


                <div className="col-12 d-flex flex-row justify-content-center align-items-center" onChange={(e) => setWithdrawState(e.target.value)}>
                    <div className="form-check mx-2">
                        <input className="form-check-input primary-bg" type="radio" name="status" id="exampleRadios1"
                               value="accept"/>
                        <label className="form-check-label" htmlFor="exampleRadios1">
                            Accept
                        </label>
                    </div>
                    <div className="form-check mx-2">
                        <input className="form-check-input primary-bg" type="radio" name="status" id="exampleRadios2"
                               value="reject"/>
                        <label className="form-check-label" htmlFor="exampleRadios2">
                            Reject
                        </label>
                    </div>
                </div>

                {
                    typeof withdrawState !== "undefined" &&
                        <form className="col-12 d-flex flex-row justify-content-between my-5" onSubmit={(e) => submitFrom(e)}>
                            <div className="col-9">
                                <label htmlFor="extra"
                                       className="form-label">{withdrawState === "accept" ? "Transaction Ref" : "Reason"}</label>
                                <input type="text" className="form-control secondary-bg py-3" style={{border:"none"}} id="extra"
                                       onChange={(e) => setWithdrawExp(e.target.value)}
                                       value={withdrawExp}
                                       placeholder={withdrawState === "accept" ? "Transaction Ref" : "Reason"}
                                />
                            </div>
                            <div className="col-3 d-flex justify-content-center align-items-end">
                                <button type="submit" className="btn btn-success px-5 py-2">{isLoading ? <Loading/> : "Submit"}</button>
                            </div>

                        </form>
                }


                <div className="col-12 d-flex justify-content-center align-items-center">

                    {error &&
                        <div className="alert alert-danger" role="alert">
                            <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                            {error.toString()}
                        </div>

                    }
                    {isSuccess &&
                        <div className="alert alert-success" role="alert">
                            <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                            Successfully Sent.
                        </div>
                    }
                </div>






            </div>

        </div>
    )
}

export default WithdrawStatus;
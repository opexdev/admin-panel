import React, {useState} from 'react';
import {useGetWalletData} from "../../query";
import Loading from "../../components/Loading";
import ScrollBar from "../../components/ScrollBar";
import {BN} from "../../utils/utils";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";

const Wallet = () => {

    const [params, setParams] = useState({
        "excludeSystem": true,
        "limit": 500,
        "offset": 0
    });

    const {data, isLoading, error} = useGetWalletData(params);

    return (
        <ScrollBar>

            <div className={`d-flex flex-row col-5 col-12  align-items-center px-5 my-5`}>
                <span className={``}>Exclude System Wallets</span>
                <span className={`mx-2`}> </span>
                <ToggleSwitch

                    onchange={ () => {

                        setParams(prevState => {return {
                            ...prevState,
                            excludeSystem: !prevState.excludeSystem
                        }})


                    } }
                    checked={params?.excludeSystem}/>
            </div>
            <div className="col-12 d-flex flex-column justify-content-between align-items-center px-5">
                <table className="table table-bordered rounded text-center col-12 striped table-responsive">
                    <thead className="py-2 my-2" style={{paddingBottom: "1vh !important"}}>
                    <tr className="">
                        <th scope="col my-1" style={{width: "4%"}}/>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Wallet Type</th>
                        <th scope="col">Balance</th>
                        <th scope="col">Currency</th>
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
                            : data?.length === 0 ?
                                <tr>
                                    <td colSpan="12" className="text-center" style={{height: "50vh"}}>No User Exist</td>
                                </tr> :
                                data?.map((wallet, index) => <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{wallet?.title?.slice(wallet?.title.indexOf("-") +1, wallet?.title?.end) }</td>
                                    <td>{wallet?.title?.slice(0, wallet?.title.indexOf("-"))}</td>
                                    <td>{wallet?.walletType}</td>
                                    <td>{new BN(wallet?.balance).toFormat()}</td>
                                    <td>{wallet?.currency}</td>

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
            </div>
        </ScrollBar>
    );
};

export default Wallet;

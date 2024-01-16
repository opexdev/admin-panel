import React, {useState} from 'react';
import {useGetWalletData} from "../../query";
import Loading from "../../components/Loading";
import ScrollBar from "../../components/ScrollBar";

const Wallet = () => {

    const [params, setParams] = useState({
        "limit": 500,
        "offset": 0
    });

    const {data, isLoading, error, refetch} = useGetWalletData(params);



    /*const content = () => {
        if (isLoading) return <div style={{height: "40vh"}}><Loading/></div>
        if (error) return <div style={{height: "40vh"}}>Error</div>
        if (data?.length === 0) return <div style={{height: "40vh"}} className={`flex jc-center ai-center`}>No Data...!</div>


        else return <>
            <WalletList data={data}/>
        </>
    }*/


    return (
        <ScrollBar>
            <div className="col-12 d-flex flex-column justify-content-between align-items-center px-5 py-5">
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
                                    <td>{wallet?.balance?.toLocaleString()}</td>
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
             {/*   {(!isLoading && users?.total > paginate.perPage)&&
                    <div className="mt-2">
                        <Pagination total={users.total} paginate={paginate}/>
                    </div>
                }*/}
            </div>
        </ScrollBar>
    );
};

export default Wallet;

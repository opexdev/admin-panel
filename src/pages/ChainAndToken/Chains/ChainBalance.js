import React, {useEffect, useState} from 'react';
import classes from './Chains.module.css'

import ToggleSwitch from "../../../components/ToggleSwitch/ToggleSwitch";
import {useGetAllBalanceByChain, useGetTotalBalanceByChain} from "../../../query";


const ChainBalance = ({chainId}) => {

    console.log("chainId in chainbalance", chainId)

    const [params, setParams] = useState({
        "excludeZero": false,
    });

    const {data, isLoading, error, refetch} = useGetAllBalanceByChain(chainId, params);
    const {data:total, isLoading:totalIsLoading, error:totalError} = useGetTotalBalanceByChain(chainId);


    useEffect(() => {
        refetch()
    }, [params]);


    console.log("data ChainBalance", data)

    const content = ()=> {

        if (isLoading) return <div className={`d-flex flex-column justify-content-center align-items-center col-12 mt-4 py-5 ${classes.box}`}>
            Loading...
        </div>
        if (error) return <div className={`d-flex flex-column justify-content-center align-items-center col-12 mt-4 py-5 ${classes.box}`}>
            Error!
        </div>
        if (data?.length === 0) return <div className={`d-flex flex-column justify-content-center align-items-center col-12 mt-4 py-5 ${classes.box}`}>
            No Data!
        </div>
        else return <div className={`d-flex flex-column justify-content-center align-items-center col-12 mt-4 py-3 ${classes.box} ${classes.striped}`}>
            {data?.map((balance, index) => <div className={`d-flex flex-row col-12 py-4 px-4 font-size-sm-plus`} key={index}>
                <span className={`col-8`}>{index + 1} <span className={`mx-3`}></span> {balance?.address}</span>
                <span className={`col-4 text-center`} style={{color: '#fff'}}>Balance: <span className={`font-size-md`}>{balance?.balance}</span></span>
            </div>)}
        </div>

    }



    return (

        <>

            <div className={`col-12 my-2 d-flex flex-row justify-content-between col-12 mt-4 py-4 px-4 ${classes.box}`}>
               <div className={`d-flex flex-row col-5`}>
                   <span className={``}>Exclude Zero Balance</span>
                   <span className={`mx-2`}> </span>
                   <ToggleSwitch

                       onchange={ () => {

                           setParams(prevState => {return {
                               ...prevState,
                               excludeZero: !prevState.excludeZero
                           }})


                       } }

                       /*onchange={()=> setQuery({
                           ...query,
                           ascendingByTime: (prevState => !prevState)}
                       )}*/
                       checked={params?.excludeZero}/>
               </div>

                <div className={`d-flex flex-row justify-content-center col-7 text-center`}>
                    <span className={``}>{total?.chain?.toUpperCase()}</span>
                    <span className={`mx-1`}> </span>
                    <span className={``}>Total Balance: </span>
                    <span className={`mx-2`}> </span>
                    <span className={`font-size-md`} style={{color: 'white'}}>{ totalIsLoading ? "Loading..." : total?.balance}</span>
                </div>
            </div>

            {content()}




        </>

    );
};

export default ChainBalance;

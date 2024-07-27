import React, {useEffect, useState} from 'react';
import {useGetTokenAllBalanceById, useGetTokenTotalBalanceById} from "../../../query";
import classes from "../Chains/Chains.module.css";
import ToggleSwitch from "../../../components/ToggleSwitch/ToggleSwitch";
import {BN} from "../../../utils/utils";

const TokensBalance = ({chainId}) => {

    const [params, setParams] = useState({
        "excludeZero": false,
    });

    const {data, isLoading, error, refetch} = useGetTokenAllBalanceById(chainId, params);
    const {data:total, isLoading:totalIsLoading, error:totalError} = useGetTokenTotalBalanceById(chainId);


    useEffect(() => {
        refetch()
    }, [params]);

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
            {data?.map((balance, index) => <div className={`d-flex flex-row col-12 py-4 px-2 font-size-sm`} key={index}>
                <span className={`col-8`}>{index + 1} <span className={`mx-3`}></span> {balance?.address}</span>
                <span className={`col-2 text-center`} style={{color: '#fff'}}>Balance: <span className={``}>{new BN(balance?.balance).toFormat()}</span></span>
                <span className={`col-2 text-center`} style={{color: '#fff'}}> $ { new BN(balance?.balanceUsd).isZero() ? "---" : new BN(balance?.balanceUsd).toFormat()} </span>

            </div>)}
        </div>

    }


    return (
        <>

            <div className={`col-12 my-2 d-flex flex-row justify-content-between align-items-center col-12 mt-4 py-4 px-4 ${classes.box} font-size-sm`}>
                <div className={`d-flex flex-row align-items-center col-5`}>
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

                <div className={`d-flex flex-row justify-content-center align-items-center col-7 text-center`}>
                    <span className={``}>{total?.chain?.toUpperCase()}</span>
                    <span className={`mx-1`}> </span>
                    <span className={``}>Total Balance: </span>
                    <span className={`mx-2`}> </span>
                    <span className={`font-size-md`} style={{color: 'white'}}>{ totalIsLoading ? "Loading..." : new BN(total?.balance).toFormat()}</span>
                </div>
            </div>

            {content()}




        </>
    );
};

export default TokensBalance;

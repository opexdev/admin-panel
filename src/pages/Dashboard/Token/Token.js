import React from 'react';
import classes from './Token.module.css'
import {useGetTotalBalance} from "../../../query";
import {useGetTokenTotalBalance} from "../../../query/hooks/useGetTokenTotalBalance";
import ChainCard from "../Chain/ChainCard";
import TokenCard from "./TokenCard";

const Token = () => {

    const {data, isLoading, error} = useGetTokenTotalBalance();

    const content = () => {
        if (error) return <span>Error</span>
        if (isLoading) return <span>Loading...</span>
        else return <>
            <div className={`d-flex flex-column ${classes.striped} ${classes.box} py-2`}>
                {data?.map((data, index) => <TokenCard data={data} index={index}/>)}

            </div>


        </>

    }
    return (
        <div className={`flex-column justify-content-start`} style={{width: "32%"}}>

            <p className={`font-size-md-plus mb-4`}>Token List</p>

            {
                content()
            }


        </div>
    );
};

export default Token;

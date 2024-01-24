import React from 'react';
import classes from './BriefWallet.module.css'
import {useGetWalletTotalUsers} from "../../../query";
import BriefWalletCard from "./BriefWalletCard";

const BriefWallet = () => {

    const {data, isLoading, error} = useGetWalletTotalUsers();

    const content = () => {
        if (error) return <span>Error</span>
        if (isLoading) return <span>Loading...</span>
        else return <>
            <div className={`d-flex flex-column ${classes.striped} ${classes.box} py-2`}>
                {data?.map((data, index) => <BriefWalletCard data={data} index={index}/>)}

            </div>


        </>

    }

    return (
        <div className={`flex-column justify-content-start`} style={{width: "32%"}}>

            <p className={`font-size-md-plus mb-4`}>Total User Wallets</p>

            {
                content()
            }


        </div>
    );
};

export default BriefWallet;

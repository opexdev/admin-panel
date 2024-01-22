import React from 'react';
import classes from './BriefWallet.module.css'

const BriefWalletCard = ({data, index}) => {
    return (
        <div key={index} className={`d-flex flex-row justify-content-between align-items-center py-3 px-4`}>
            <span className={`col-4`}>{data?.currency}</span>
            <span className={`col-8`}>{data?.balance}</span>
        </div>
    );
};

export default BriefWalletCard;

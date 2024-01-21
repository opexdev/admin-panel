import React from 'react';
import classes from './Token.module.css'

const TokenCard = ({data, index}) => {
    return (
        <div key={index} className={`d-flex flex-row justify-content-between align-items-center py-3 px-4`}>
            <span className={`col-6`}>{data?.name} - {data?.symbol}</span>
            <span className={`col-6`}>{data?.balance}</span>
        </div>
    );
};

export default TokenCard;

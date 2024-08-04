import React from 'react';
import classes from './Chain.module.css'
import {BN} from "../../../utils/utils";

const ChainCard = ({data, index}) => {

    return (
        <div key={index} className={`d-flex flex-row justify-content-between align-items-center py-3 px-4 font-size-sm`}>
            <span className={`col-4`}>{data?.chain}</span>
            <span className={`col-4`}>{new BN(data?.balance).toFormat()}</span>
            <span className={`col-4`}> $ { new BN(data?.balanceUsd).isZero() ? "---" : new BN(data?.balanceUsd).toFormat()} </span>
        </div>
    );
};

export default ChainCard;

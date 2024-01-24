import React from 'react';
import classes from './Token.module.css'
import {BN} from "../../../utils/utils";

const TokenCard = ({data, index}) => {
    return (
        <div key={index} className={`d-flex flex-row justify-content-between align-items-center py-3 px-4`}>
            <span className={`col-8`}>{data?.name} - {data?.symbol}</span>
            <span className={`col-4`}>{new BN(data?.balance).toFormat()}</span>
        </div>
    );
};

export default TokenCard;

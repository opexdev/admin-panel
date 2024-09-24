import React from 'react';
import {BN} from "../../../utils/utils";

const TokenCard = ({data, index}) => {
    return (
        <div key={index} className={`d-flex flex-row justify-content-between align-items-center py-3 px-4 font-size-sm`}>
            <span className={`col-6`}>{data?.name} - {data?.symbol}</span>
            <span className={`col-3`}>{new BN(data?.balance).toFormat()}</span>
            <span className={`col-3`}>$ { new BN(data?.balanceUsd).isZero() ? "---" : new BN(data?.balanceUsd).toFormat()}</span>
        </div>
    );
};

export default TokenCard;

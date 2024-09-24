import React from 'react';
import {BN} from "../../../utils/utils";

const BriefWalletCard = ({data, index}) => {
    return (
        <div key={index} className={`d-flex flex-row justify-content-between align-items-center py-3 px-4 font-size-sm`}>
            <span className={`col-4`}>{data?.currency}</span>
            <span className={`col-8`}>{new BN(data?.balance).toFormat()}</span>
        </div>
    );
};

export default BriefWalletCard;

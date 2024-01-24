import React from 'react';
import classes from './Chain.module.css'
import {BN} from "../../../utils/utils";

const ChainCard = ({data, index}) => {

    console.log("data in", data)

    return (
        <div key={index} className={`d-flex flex-row justify-content-between align-items-center py-3 px-4`}>
            <span className={`col-6`}>{data?.chain}</span>
            <span className={`col-6`}>{new BN(data?.balance).toFormat()}</span>
        </div>
    );
};

export default ChainCard;

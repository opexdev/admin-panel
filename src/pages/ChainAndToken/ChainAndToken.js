import React from 'react';
import classes from './ChainAndToken.module.css'
import Chains from "./Chains/Chains";
import Tokens from "./Tokens/Tokens";

const ChainAndToken = () => {
    return (
        <div className={`col-12 d-flex flex-row`}>
            <div className={`col-6 `}>
                <Chains/>
            </div>
            <div className={`col-6`}>
                <Tokens/>
            </div>

        </div>
    );
};

export default ChainAndToken;

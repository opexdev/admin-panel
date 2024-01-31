import React from 'react';
import classes from './ChainAndToken.module.css'
import Chains from "./Chains/Chains";
import Tokens from "./Tokens/Tokens";

const ChainAndToken = () => {
    return (
        <div className={`d-flex flex-row`}  style={{width: "100%"}}>
            <div className={``} style={{width: "48%"}}>
                <Chains/>
            </div>
            <div className={``}  style={{width: "48%"}}>
                <Tokens/>
            </div>

        </div>
    );
};

export default ChainAndToken;

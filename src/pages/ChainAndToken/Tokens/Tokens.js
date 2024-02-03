import React, {useEffect, useState} from 'react';
import classes from './Tokens.module.css'
import TokensBalance from "./TokensBalance";
import ScrollBar from "../../../components/ScrollBar";
import {useGetTokens} from "../../../query";

const Tokens = () => {

    const {data, isLoading, error, refetch} = useGetTokens();


    const [chainId, setChainId] = useState(null);

    useEffect(() => {
        if (!isLoading && !error) setChainId(data[0]?.id)

    }, [data]);

    const content = () => {
        if (error) return <span>Error</span>
        if (isLoading) return <span>Loading...</span>
        else return <>
            <div className={`d-flex flex-row `}>
                {data?.map((chain, index) => <span key={index} className={`${classes.chainTitle} ${chain?.id === chainId && classes.activeChain}`} onClick={()=>setChainId(chain?.id)}>{chain?.name}</span>)}

            </div>

            {
                (chainId !== null) ?
                    <TokensBalance chainId={chainId}/> : ""
            }
        </>

    }

    return (
        <ScrollBar>
            <div className={`flex-column col-12 justify-content-start px-3 py-4`}>
                <p className={`font-size-md-plus mb-4`}>Token List</p>

                {
                    content()
                }

            </div>
        </ScrollBar>
    );
};

export default Tokens;

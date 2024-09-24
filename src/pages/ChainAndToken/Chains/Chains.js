import React, {useEffect, useState} from 'react';
import classes from "./Chains.module.css"
import ChainBalance from "./ChainBalance";
import ScrollBar from "../../../components/ScrollBar";
import {useGetChains} from "../../../query";

const Chains = () => {

    const {data, isLoading, error} = useGetChains();


    const [chainId, setChainId] = useState(null);




    useEffect(() => {
        if (!isLoading && !error) setChainId(data[0]?.id)

    }, [data]);

    const content = () => {
        if (error) return <span>Error</span>
        if (isLoading) return <span>Loading...</span>
        else return <>
            <div className={`d-flex flex-row font-size-sm`}>
                {data?.map((chain, index) => <span key={index} className={`${classes.chainTitle} ${chain?.id === chainId && classes.activeChain}`} onClick={()=>setChainId(chain?.id)}>{chain?.name}</span>)}

            </div>

            {
                (chainId !== null) ?
                    <ChainBalance chainId={chainId}/> : ""
            }
        </>

    }



    /*console.log("data", data[0]?.id)*/

    return (
        <ScrollBar>
            <div className={`flex-column col-12 justify-content-start px-3 py-4`}>
                <p className={`font-size-md-plus mb-4`}>Chain List</p>

                {
                    content()
                }

            </div>
        </ScrollBar>
    );
};

export default Chains;

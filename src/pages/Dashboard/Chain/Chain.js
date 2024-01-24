import React from 'react';
import {useGetTotalBalance} from "../../../query";
import ChainCard from "./ChainCard";
import classes from "./Chain.module.css"


const Chain = () => {

    const {data, isLoading, error} = useGetTotalBalance();


    console.log("data,", data )


    const content = () => {
        if (error) return <span>Error</span>
        if (isLoading) return <span>Loading...</span>
        else return <>
            <div className={`d-flex flex-column ${classes.striped} ${classes.box} py-2`}>
                {data?.map((data, index) => <ChainCard data={data} index={index}/>)}

            </div>


        </>

    }

    return (
        <div className={`flex-column justify-content-start`} style={{width: "32%"}}>

            <p className={`font-size-md-plus mb-4`}>Chain List</p>

            {
                content()
            }


        </div>
    );
};

export default Chain;

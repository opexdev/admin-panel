import React from 'react';
import classes from './Wallet.module.css'

const walletList = (data, index) => {

    console.log("data in list", data)


    let head = (
        <div className="flex-row justify-content-between col-12 text-gray px-2 py-2" style={{backgroundColor:"var(--tableHeader)"}}>
            <span className="width-5 flex jc-start ai-center">Name</span>
            <span className="width-8 flex jc-start ai-center">Email</span>
            <span className="width-7 flex  jc-start ai-center">Wallet Type</span>
            <span className="width-12 flex jc-start ai-center">Balance</span>
            <span className="width-13 flex jc-start ai-center">Currency</span>
        </div>
    );

    let body = (
        <>
            {data?.data?.map((tr, index) => {


                return (

                    <div className={`column ${classes.striped}`} key={index}>

                        <div className={`${classes.row} row rounded-5 border-bottom px-2 py-2`} key={index}>
                            <span className="width-5 row jc-start ai-center">{index}</span>
                            <span className="width-5 row jc-start ai-center">{data?.name}</span>
                            <span className="width-5 row jc-start ai-center">{data?.title}</span>
                            <span className="width-5 row jc-start ai-center">{data?.walletType}</span>
                            <span className="width-5 row jc-start ai-center">{data?.balance}</span>
                            <span className="width-5 row jc-start ai-center">{data?.currency}</span>



                        </div>


                    </div>



                )
            })}
        </>
    );

    return  <>
        {head}
        {body}
    </>

};

export default walletList;

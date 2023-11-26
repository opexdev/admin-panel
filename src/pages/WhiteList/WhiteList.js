import React, {useState} from 'react';
import classes from './WhiteList.module.css'
import Loading from "../../components/Loading";
import {copyToClipboard, toAbsoluteUrl} from "../../components/utils";
import {Link} from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import ScrollBar from "../../components/ScrollBar";
import {useGetWhiteList} from "../../query";
import {adminDeleteWhiteList, adminUpdateWhiteList} from "js-api-client/admin/whiteList";
import {toast} from "react-hot-toast";

const WhiteList = () => {

    const {data: whiteUsers, isLoading, error, refetch} = useGetWhiteList()

    const [loading, setLoading] = useState(null)
    const [addLoading, setAddLoading] = useState(false)
    const [search, setSearch] = useState(false)

    const [email, setEmail] = useState('');

    const deleteFromWhiteList = (user, index) => {
        setLoading(index)

        const whiteListData = {"data":[`${user}`]}

        adminDeleteWhiteList(whiteListData)
            .then(() => {
                toast.success(`${user} removed from white list`)
                refetch()
            }).catch(() => {
            toast.error("Something went wrong")
        }).finally(() => {
            setLoading(null)
            setSearch(false)
            setEmail("")
        })
    }
    
    const addToWhitelist = () => {

        const whiteUser = whiteUsers?.find( f => f === email)

        if (whiteUser !== undefined) {
            return toast.error("User exist in list")
        }

        setAddLoading(true)

        const whiteListData = {"data":[`${email}`]}

        adminUpdateWhiteList(whiteListData)
            .then(() => {
                toast.success(`${email} added to white list`)
                refetch()
            }).catch(() => {
            toast.error("Something went wrong")
        }).finally(() => {
            setSearch(false)
            setEmail("")
            setAddLoading(false)
        })

    }

    const content = () => {
        if (isLoading) {
            return <tr>
                <td colSpan="12" className="text-center py-5" style={{height: "50vh"}}>
                    <Loading/>
                </td>
            </tr>
        }
        if (whiteUsers?.length === 0 ) {
            return <tr>
                <td colSpan="12" className="text-center" style={{height: "50vh"}}>No User Exist</td>
            </tr>
        }
        if (search) {

            const whiteUser = whiteUsers?.find( f => f === email)

            if (whiteUser === undefined) {
                return <tr>
                    <td colSpan="12" className="text-center" style={{height: "20vh"}}>No User Exist</td>
                </tr>
            }

            return <tr>
                <th scope="row">{1}</th>
                <td>{whiteUser}</td>
                <td className={``} style={{width: "15%"}}>
                    <span className=" border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end"
                          style={{cursor: "pointer"}} onClick={() => copyToClipboard(whiteUser)}>
                    <img className="" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy" style={{width: "8%"}}/>
                    </span>
                </td>
                <td>
                    {
                        loading === 1 ? <Loading/> :
                            <button className={`${classes.button}`} onClick={()=>deleteFromWhiteList(whiteUser, 1)}>Delete</button>
                    }
                </td>
            </tr>
        }
        return whiteUsers?.map((user, index) => <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{user}</td>
            <td className={``} style={{width: "15%"}}>
                <span className=" border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end"
                      style={{cursor: "pointer"}} onClick={() => copyToClipboard(user)}>
                <img className="" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy" style={{width: "8%"}}/>
                </span>
            </td>
            <td>
                {
                    loading === index ? <Loading/> :
                        <button className={`${classes.button}`} onClick={()=>deleteFromWhiteList(user, index)}>Delete</button>
                }
            </td>
        </tr>)
    }
    
    




    return (
        <ScrollBar>
            <div className="col-12 d-flex flex-column justify-content-between align-items-center px-5 py-5">


                <div className={`mb-5 d-flex flex-row justify-content-between align-items-center`} style={{width:"100%"}}>
                    <div className={`d-flex flex-row justify-content-start align-items-center`} style={{width:"70%"}}>
                        <div className="d-flex flex-row login-input" style={{width:"55%"}}>
                            <span className="px-5">Email</span>
                            <input className="text-center" value={email} type="text"
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <button type="button" className={`${classes.findButton} text-color ms-3`} disabled={email === ""}
                                onClick={()=>setSearch(true)}
                        >
                            Find
                        </button>
                        <button type="button" className={`${classes.showAllButton} text-color ms-3`}
                                onClick={()=>{
                                    setSearch(false)
                                    setEmail("")
                                }}
                        >
                            Show All
                        </button>

                        <button type="button" className={`${classes.findButton} text-color ms-3`}
                                disabled={addLoading || (email === "")}
                                onClick={()=>{addToWhitelist()}}
                        >
                            {
                                addLoading ? <Loading/> :
                                    "Add"
                            }
                        </button>
                    </div>

                    <div className={`d-flex flex-row justify-content-end align-items-center`}>
                        <span>Total: <span className={`${classes.total}`}>{whiteUsers?.length}</span></span>
                    </div>

                </div>



                <table className="table table-bordered rounded text-center col-12 striped table-responsive">
                    <thead className="py-2 my-2" style={{paddingBottom: "1vh !important"}}>
                    <tr className="">
                        <th scope="col my-1" style={{width: "4%"}}/>
                        <th scope="col">Email</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        content()
                    }
                    </tbody>
                </table>
                {error ?
                    <div className="alert alert-danger" role="alert">
                        <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                        {error?.toString()}
                    </div>
                    : ""
                }




            </div>
        </ScrollBar>
    );
};

export default WhiteList;

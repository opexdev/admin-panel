import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {toAbsoluteUrl} from "../utils";
import UserStatus from "./UserStatus";
import UserImages from "./UserImages";
import Loading from "../Loading";
import ScrollBar from "../ScrollBar";

const UserInfo = () => {
    const {id} = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [user, setUser] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        setIsLoading(true)
        const getUser = async () => {
            await axiosPrivate.get('/admin/auth/v1/user/'+id, {
                signal: controller.signal
            }).then((res) => {
                isMounted && setUser(res.data);
            }).catch((err) => {
                setError(err);
            }).finally(() => setIsLoading(false));
        }
        getUser()

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])



    const attrHandler = (attr) => {
        if (!user.attributes) {
            return "-"
        }
        if (!user.attributes[attr]) {
            return "-"
        }
        return user.attributes[attr][0]
    }


    const copyToClipboard = (value) => {
        navigator.clipboard.writeText(value)
    }

    return (

        <ScrollBar>

        <div className="col-12"  style={{padding:"5vh 3vw"}}>

            {error ?
                <div className="alert alert-danger mt-3" role="alert">
                    <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                    {error.toString()}
                </div>
                : ""
            }

            <div className="col-12 userInfoBox">
                <h4 className="py-3 primary-bg rounded d-flex justify-content-center align-items-center">User Information</h4>

                {isLoading ? <div className="col-12 d-flex justify-content-center align-items-center mt-4" style={{height:"50vh"}}><Loading/></div> : <>
                    <div className="d-flex flex-row">
                        <div className="col-6 pe-3">
                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center rounded-start">ID</span>
                                <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{user.id}</span>
                                <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end" style={{cursor:"pointer"}} onClick={() => copyToClipboard(user.id)}>
                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                    </span>
                            </div>
                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">User Name</span>
                                <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{user.username}</span>
                                <span className="col-1 secondary-bg border-start border-dark border-dark d-flex justify-content-center align-items-center rounded-end" style={{cursor:"pointer"}} onClick={() => copyToClipboard(user.username)}>
                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                    </span>
                            </div>
                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">First Name</span>
                                <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{user.firstName}</span>
                                <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end" style={{cursor:"pointer"}} onClick={() => copyToClipboard(user.firstName)}>
                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                    </span>
                            </div>
                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Last Name</span>
                                <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{user.lastName}</span>
                                <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end" style={{cursor:"pointer"}} onClick={() => copyToClipboard(user.lastName)}>
                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                    </span>
                            </div>
                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">First Name (En)</span>
                                <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{attrHandler("firstNameEn")}</span>
                                <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end" style={{cursor:"pointer"}} onClick={() => copyToClipboard(user?.attributes["firstNameEn"][0])}>
                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                    </span>
                            </div>
                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Last Name (En)</span>
                                <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{attrHandler("lastNameEn")}</span>
                                <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer"}} onClick={() => copyToClipboard(user?.attributes["lastNameEn"][0])}>
                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                    </span>
                            </div>
                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Birthday (Gregorian)</span>
                                <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{attrHandler("birthdayG")}</span>
                                <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer"}} onClick={() => copyToClipboard(user?.attributes["birthdayG"][0])}>
                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                    </span>
                            </div>

                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Birthday (Jalali)</span>
                                <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{attrHandler("birthdayJ")}</span>
                                <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer"}} onClick={() => copyToClipboard(user?.attributes["birthdayJ"][0])}>
                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                    </span>
                            </div>



                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Postal Code</span>
                                <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{attrHandler("postalCode")}</span>
                                <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer"}} onClick={() => copyToClipboard(user?.attributes["postalCode"][0])}>
                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                    </span>
                            </div>
                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Mobile</span>
                                <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{attrHandler("mobile")}</span>
                                <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer"}} onClick={() => copyToClipboard(user?.attributes["mobile"][0])}>
                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                    </span>
                            </div>

                        </div>
                        <div className="col-6 ps-3">
                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Email</span>
                                <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{user.email}</span>
                                <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end" style={{cursor:"pointer"}} onClick={() => copyToClipboard(user.email)}>
                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                    </span>
                            </div>





                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Nationality</span>
                                <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{attrHandler("nationality")}</span>
                                <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer"}} onClick={() => copyToClipboard(user?.attributes["nationality"][0])}>
                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                    </span>
                            </div>
                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Residence</span>
                                <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{attrHandler("residence")}</span>
                                <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer"}} onClick={() => copyToClipboard(user?.attributes["residence"][0])}>
                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                    </span>
                            </div>
                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Passport Number</span>
                                <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{attrHandler("passportNumber")}</span>
                                <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer"}} onClick={() => copyToClipboard(user?.attributes["passportNumber"][0])}>
                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                    </span>
                            </div>
                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Telephone</span>
                                <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">{attrHandler("telephone")}</span>
                                <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer"}} onClick={() => copyToClipboard(user?.attributes["telephone"][0])}>
                        <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                    </span>
                            </div>
                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Enable</span>
                                <span className="col-9 secondary-bg p-3 d-flex justify-content-center align-items-center">{user?.requiredActions.length > 0 ? user?.requiredActions.map((action)=> <span className="badge bg-warning text-dark mx-2 py-2" key={action}>{action}</span>) :"-" }</span>
                            </div>
                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Email Verified</span>
                                <span className="col-9 secondary-bg p-3 d-flex justify-content-center align-items-center">{user?.requiredActions.length > 0 ? user?.requiredActions.map((action)=> <span className="badge bg-warning text-dark mx-2 py-2" key={action}>{action}</span>) :"-" }</span>
                            </div>
                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Required Actions</span>
                                <span className="col-9 secondary-bg p-3 d-flex justify-content-center align-items-center">{user?.requiredActions.length > 0 ? user?.requiredActions.map((action)=> <span className="badge bg-warning text-dark mx-2 py-2" key={action}>{action}</span>) :"-" }</span>
                            </div>
                            <div className="d-flex flex-row rounded my-3 inputGroup">
                                <span className="col-3 primary-bg d-flex justify-content-center align-items-center  rounded-start">Groups</span>
                                <span className="col-9 secondary-bg p-3 d-flex justify-content-center align-items-center">{user?.groups.length ? user.groups.map((group)=> <span className={`badge ${group.name === "kyc-requested" ? "bg-primary" : (group.name === "kyc-rejected" || group.name === "kyc-blocked") ? "bg-danger" : "bg-success"} mx-2 py-2`} key={group.id}>{group.name.toUpperCase()}</span>) :"-" }</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="d-flex flex-row rounded my-3">
                            <span className="primary-bg d-flex justify-content-center align-items-center text-white rounded-start" style={{width:"12%"}}>Address</span>
                            <span className="secondary-bg p-3 d-flex justify-content-center align-items-center" style={{width:"84%"}}>{attrHandler("address")}</span>
                            <span className="secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover" style={{cursor:"pointer" , width:"4%"}} onClick={() => copyToClipboard(user?.attributes["address"][0])}>
                                 <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                            </span>
                        </div>
                    </div>
                </>
                }
            </div>




            <UserImages attributes={user?.attributes}/>
            {
                !isLoading ? <UserStatus id={user.id} initialState={user?.groups[0]?.name}>

                    { !user?.attributes && <div className="text-danger secondary-bg card text-center py-5">This user has not entered any information</div> }

                    </UserStatus>
                    :""
            }
        </div>

        </ScrollBar>
    )
}

export default UserInfo;
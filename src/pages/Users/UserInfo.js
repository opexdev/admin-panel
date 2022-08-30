import React from "react";
import {useParams} from "react-router-dom";
import {copyToClipboard, toAbsoluteUrl} from "../../components/utils";
import UserStatus from "./UserStatus";
import Loading from "../../components/Loading";
import ScrollBar from "../../components/ScrollBar";
import {useGetUserInfo} from "../../query";
import UserImageBox from "./ShowUserImage";
import UserInfoBox from "./UserInfoBox";

const UserInfo = () => {
    const {id} = useParams();
    const {data: user, isLoading, error, refetch} = useGetUserInfo(id)

    const attrHandler = (attr) => {
        if (!user.attributes) return "-"
        if (!user.attributes[attr]) return "-"
        return user.attributes[attr][0]
    }

    return (
        <ScrollBar>
            <div className="col-12" style={{padding: "5vh 3vw"}}>
                {error ?
                    <div className="alert alert-danger mt-3" role="alert">
                        <i className="fa fa-exclamation-triangle mx-2" aria-hidden="true"/>
                        {error.toString()}
                    </div>
                    : ""
                }
                <div className="col-12 userInfoBox">
                    <h4 className="py-3 primary-bg rounded d-flex justify-content-center align-items-center">User
                        Information</h4>
                    {isLoading ? <div className="col-12 d-flex justify-content-center align-items-center mt-4"
                                      style={{height: "50vh"}}><Loading/></div> : <>
                        <div className="d-flex flex-row">
                            <div className="col-6 pe-3">
                                <UserInfoBox title="ID" value={user.id}/>
                                <UserInfoBox title="User Name" value={user.username}/>
                                <UserInfoBox title="First Name" value={user.firstName}/>
                                <UserInfoBox title="Last Name" value={user.lastName}/>
                                <UserInfoBox title="First Name (En)" value={attrHandler("firstNameEn")}/>
                                <UserInfoBox title="Last Name (En)" value={attrHandler("lastNameEn")}/>
                                <UserInfoBox title="Birthday (Gregorian)" value={attrHandler("birthdayG")}/>
                                <UserInfoBox title="Birthday (Jalali)" value={attrHandler("birthdayJ")}/>
                                <UserInfoBox title="Postal Code" value={attrHandler("postalCode")}/>
                                <UserInfoBox title="Mobile" value={attrHandler("mobile")}/>
                            </div>
                            <div className="col-6 ps-3">
                                <UserInfoBox title="Email" value={user.email}/>
                                <UserInfoBox title="Nationality" value={attrHandler("nationality")}/>
                                <UserInfoBox title="Residence" value={attrHandler("residence")}/>
                                <UserInfoBox title="Passport Number" value={attrHandler("passportNumber")}/>
                                <UserInfoBox title="Telephone" value={attrHandler("telephone")}/>
                                <UserInfoBox title="Email Verified" value={user?.isEmailVerified} isBoolean={true}/>
                                <UserInfoBox title="Enable" value={user?.isEnabled} isBoolean={true}/>
                                <UserInfoBox title="Required Actions"
                                             value={user?.requiredActions.length ? user?.requiredActions.map((action) =>
                                                 <span className="badge bg-warning text-dark mx-2 py-2"
                                                       key={action}>{action}</span>) : "-"}
                                />
                                <UserInfoBox title="Groups" value={user?.groups.length ? user.groups.map((group) =>
                                    <span
                                        className={`badge ${group.name === "kyc-requested" ? "bg-primary" : (group.name === "kyc-rejected" || group.name === "kyc-blocked") ? "bg-danger" : "bg-success"} mx-2 py-2`}
                                        key={group.id}>{group.name.toUpperCase()}</span>) : "-"}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="d-flex flex-row rounded my-3">
                                <span
                                    className="primary-bg d-flex justify-content-center align-items-center text-white rounded-start"
                                    style={{width: "12%"}}>
                                    Address
                                </span>
                                <span className="secondary-bg p-3 d-flex justify-content-center align-items-center"
                                      style={{width: "84%"}}>
                                    {attrHandler("address")}
                                </span>
                                <span
                                    className="secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end hover"
                                    style={{cursor: "pointer", width: "4%"}}
                                    onClick={() => copyToClipboard(user?.attributes["address"][0])}>
                                 <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
                            </span>
                            </div>
                        </div>
                    </>
                    }
                </div>
                <div className="col-12 userInfoBox my-5">
                    <h4 className="py-3 primary-bg rounded d-flex justify-content-center align-items-center">User
                        Documents</h4>
                    <div className="d-flex flex-row col-12">
                        <UserImageBox url={user?.attributes?.acceptFormPath?.[0]} title="Accept form"/>
                        <UserImageBox url={user?.attributes?.selfiePath?.[0]} title="Selfie"/>
                        <UserImageBox url={user?.attributes?.idCardPath?.[0]} title="ID Card"/>
                    </div>
                </div>
                {
                    !isLoading ? <UserStatus id={user.id} initialState={user?.groups[0]?.name} refetchFunc={refetch}>
                            {!user?.attributes &&
                            <div className="text-danger text-center py-5">User has no information</div>}
                        </UserStatus>
                        : ""
                }
            </div>

        </ScrollBar>
    )
}

export default UserInfo;
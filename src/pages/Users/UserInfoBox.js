import React from "react";
import {copyToClipboard, toAbsoluteUrl} from "../../components/utils";

const UserInfoBox = ({title , value , isBoolean = false}) => {
    return <div className="d-flex flex-row rounded my-3 inputGroup">
        <span className="col-3 primary-bg d-flex justify-content-center align-items-center rounded-start">{title}</span>
        <span className="col-8 secondary-bg p-3 d-flex justify-content-center align-items-center">
            {isBoolean ? <img className="table-img" src={value ? toAbsoluteUrl("/media/img/check.svg") : toAbsoluteUrl("/media/img/remove.svg")} alt=""/> :value}
        </span>
        <span className="col-1 secondary-bg border-start border-dark border-dark border-dark d-flex justify-content-center align-items-center rounded-end"
            style={{cursor: "pointer"}} onClick={() => copyToClipboard(value)}>
            <img className="col-4" src={toAbsoluteUrl("/media/img/copy-link.svg")} alt="copy"/>
        </span>
    </div>
}

export default UserInfoBox
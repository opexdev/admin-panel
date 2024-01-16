import {toAbsoluteUrl} from "../utils";
import {NavLink} from "react-router-dom";
import * as Routes from "../../routes/routes";
import Icon from "../Icon/Icon";
import {Wallet, WhiteList} from "../../routes/routes";

const SideBar = ({closeMenu}) => {
    return <div className={`sidebar text-color ${closeMenu ? "close" : "open"}`}>

        <div className="d-flex justify-content-center align-items-center py-5">
            <img src={toAbsoluteUrl('/assets/logo/logo-mini.svg')} alt="logo" className="logo"/>
        </div>

        <ul className="side-menu">
            <li>
                <NavLink to={Routes.dashboard} end>
                    <Icon iconName="icon-layersm text-color font-size-md-plus"/>
                    <span className="">Dashboard</span>
                </NavLink>
            </li>
            <li className="has-child">
                <NavLink to={Routes.users}>
                    <Icon iconName="icon-users text-color font-size-md-plus"/>
                    <span className="">Users</span>
                </NavLink>
            </li>
            <li className="has-child">
                <NavLink to={Routes.withdraws}>
                    <Icon iconName="icon-withdra text-color font-size-md-plus"/>
                    <span className="">Withdraws</span>
                </NavLink>
            </li>
            <li className="has-child">
                <NavLink to={Routes.KYC}>
                    <Icon iconName="icon-kycicon text-color font-size-md-plus"/>
                    <span className="">KYC</span>
                </NavLink>
            </li>
            <li className="has-child">
                <NavLink to={Routes.WhiteList}>
                    <Icon iconName="icon-user_groups text-color font-size-md-plus"/>
                    <span className="">White List</span>
                </NavLink>
            </li>
            <li className="has-child">
                <NavLink to={Routes.Wallet}>
                    <Icon iconName="icon-user_groups text-color font-size-md-plus"/>
                    <span className="">Wallet</span>
                </NavLink>
            </li>
        </ul>

    </div>
}

export default SideBar;
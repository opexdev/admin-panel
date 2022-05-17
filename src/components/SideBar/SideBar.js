import {toAbsoluteUrl} from "../utils";
import {NavLink} from "react-router-dom";
import * as Routes from "../../routes/routes";
import useLogout from "../../hooks/useLogout";

const SideBar = ({closeMenu}) => {
    const logout = useLogout();

    return <div className={`sidebar ${closeMenu ? "close" : "open"}`}>
        <div className="logo-wrapper">
            <img src={toAbsoluteUrl('/media/img/logo.svg')} alt="logo" className="logo"/>
            <div className="logo-text text-center">
                <p className="text-center col">
                    {window.env.REACT_APP_BRAND_NAME}
                </p>
            </div>
        </div>

        <ul className="side-menu mt-5">
            <li>
                <NavLink to={Routes.dashboard}>
                    <i className="fa-solid fa-house"/>
                    <span className="item-title">Dashboard</span>
                    {/*<span className="notification">1</span>*/}
                </NavLink>
            </li>
            <li className="has-child">
                <NavLink to={Routes.users}>
                    <i className="fa-solid fa-users"/>
                    <span className="item-title">Users</span>
                    {/*<span className="notification">1</span>*/}
                </NavLink>
            </li>
            <li className="has-child">
                <NavLink to={Routes.withdraws}>
                    <i className="fa-solid fa-money-bill"/>
                    <span className="item-title">Withdraws</span>
                </NavLink>
            </li>
            <li className="has-child">
                <NavLink to={Routes.KYC}>
                    <i className="fa-solid fa-code-pull-request"/>
                    <span className="item-title">KYC</span>
                </NavLink>
            </li>
        </ul>


        <ul className="side-menu logout">
            <li>
                <span onClick={logout}>
                    <i className="fa-solid fa-door-open"/>
                    <span className="item-title">Logout</span>
                </span>
            </li>
        </ul>
    </div>
}

export default SideBar;
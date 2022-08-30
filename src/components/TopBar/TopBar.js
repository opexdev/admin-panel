import Clock from "./Clock/Clock";
import {toAbsoluteUrl} from "../utils";
import useLogout from "../../hooks/useLogout";
import Title from "./Title/Title";


const TopBar = () => {

    const logout = useLogout();
    return <div className="top-bar d-flex justify-content-between px-5">
        <h4 className="">
            <Title/>
        </h4>
        <div>
            <Clock/>
            <img
                onClick={logout}
                className="ms-3"
                style={{width: "2.5vw", cursor: "pointer"}}
                src={toAbsoluteUrl("/media/img/signOut.svg")}
                alt="Log out"
            />
        </div>

    </div>
}

export default TopBar;
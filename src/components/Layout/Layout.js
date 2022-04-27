import {Outlet} from 'react-router-dom';
import Topbar from '../TopBar/TopBar';
import SideBar from './../SideBar/SideBar';
import React, {useState} from 'react';
import {Toaster} from "react-hot-toast";

const Layout = () => {
    const [closeMenu, setCloseMenu] = useState(false);
    return (
        <div className="layout">
            <SideBar closeMenu={closeMenu}/>
            <div className={`content ${closeMenu ? "close" : "open"}`}>
                <Topbar setCloseMenu={setCloseMenu}/>
                <div className="main"><Outlet/></div>
                <Toaster position="bottom-left" toastOptions={
                    {
                        style: {
                            padding: "0.3vh 0.8vw 0.3vh 0",
                            lineHeight: "3vh",
                            fontSize: "0.8vw",
                            borderRadius: "4px",
                        }
                    }
                }/>
            </div>
        </div>

    )
}

export default Layout
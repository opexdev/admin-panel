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
                <div className="main">
                    <Outlet/>
                </div>
                <Toaster position="bottom-left" toastOptions={
                    {
                        style: {
                            padding: "0.3vh 0.8vw 0.3vh 0",
                            color: "white",
                            lineHeight: "3vh",
                            fontSize: "0.8vw",
                            borderRadius: "4px",
                            background: "#383a59",
                        },
                        success: {
                            style: {
                                background: "#18a979",
                            },
                        },
                        error: {
                            style: {
                                background: "#d73e36",
                            },
                        },
                        custom: {
                            style: {
                                background: "#ff8124",
                            },
                        },
                    }
                }/>
            </div>
        </div>

    )
}

export default Layout
import React, { useState } from "react";
import { MessagesProvider } from "../store";
import LanguageComp from "../components/Template/LanguageComp";
import { Navbar } from "../components/Template/Navbar";
import { Sidebar } from "../components/Template/Sidebar";
import { CloudFone } from "../components/CRM/CloudFone/CloudFone";
import { DEFAULT_SETTING } from "../services";
import { ToastContainer } from "react-toastify";

const MainLayout = ({ children, ...rest }) => {
    //#region Online state
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = (e) => {
        setSidebarCollapsed(e);
    };
    //#endregion
    return (
        <>
            <MessagesProvider>
                <LanguageComp />
                <div id="AppJs" className=" md:h-screen md:overflow-hidden ">
                    <Navbar isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={(e) => toggleSidebar(e)} />
                    <div className=" relative flex flex-1 flex-row w-full overflow-hidden md:overflow-y-auto overflow-x-hidden">
                        <Sidebar isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={(e) => toggleSidebar(e)} />
                        <div className={`lg:w-[80%] md:[&>*:first-child]:p-4 [&>*:first-child]:px-2 w-full h-full `}>
                            {children}
                        </div>
                        {DEFAULT_SETTING.sipstatus === true && <CloudFone />}
                    </div>
                </div>
                <ToastContainer />
            </MessagesProvider>
        </>
    );
};
export default MainLayout;

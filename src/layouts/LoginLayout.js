import React from "react";
import { MessagesProvider } from "../store";
import LanguageComp from "../components/Template/LanguageComp";
import { ToastContainer } from "react-toastify";

const LoginLayout = ({ children, ...rest }) => {
    /* useEffect(() => {
    const _platform = window.navigator.platform;
    
    const is64Bit =
      navigator.userAgent.includes("WOW64") ||
      navigator.userAgent.includes("Win64");
    
    alert(is64Bit ? "64-bit" : "32-bit");
  }, []); */
    return (
        <>
            <MessagesProvider>
                <LanguageComp />
                <div id="AppJs" className="flex flex-col h-screen overflow-hidden ">
                    <div className=" relative flex flex-1 flex-row w-full overflow-y-auto overflow-x-hidden">
                        <div className={`md:[&>*:first-child]:p-4 [&>*:first-child]:px-2 w-full `}>{children}</div>
                        {/* {DEFAULT_SETTING.sipstatus === true && <CloudFone />} */}
                    </div>
                </div>
                <ToastContainer />
            </MessagesProvider>
        </>
    );
};
export default LoginLayout;

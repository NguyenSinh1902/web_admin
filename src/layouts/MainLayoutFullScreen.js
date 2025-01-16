import React, { useState, useMemo, useCallback, useEffect } from "react";
import LanguageComp from "../components/Template/LanguageComp";
import SidebarMiniV2 from "../components/Template/SidebarMiniV2";
import { Outlet } from "react-router-dom";

const MainLayoutFullScreen = () => {

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = useCallback((e) => {
    setSidebarCollapsed(e);
  }, []);

  return (
    <>
      <LanguageComp />
      <div id="AppJs" className="h-screen flex flex-col">
        <div className="relative flex flex-1 flex-row w-full overflow-y-auto overflow-x-hidden">
          <SidebarMiniV2 isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
          <div className="md:w-full md:pl-[77px] md:[&>*:first-child]:p-4 [&>*:first-child]:px-0 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default MainLayoutFullScreen;

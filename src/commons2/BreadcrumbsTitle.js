import React from "react";
import { useNavigate } from "react-router-dom";
import { Loadingbtn } from "./LoadingBtn";
const BreadcrumbsTitleComp = React.forwardRef(
  (
    {
      Title = "Chức năng...",
      showLoading = false,
      titleshowLoading = "Đang xử lý",
      className = "",
      classNameI = "text-cyan-500",
      navi = 0,
      isBack = true,
    },
    ref,
  ) => {
    const navigate = useNavigate();
    return (
      <div className={`${navigator.userAgent.includes("CAK-WebView") ? "hidden" : "flex-1"}`}>
        <div className={"text-gray-600 font-bold text-lg " + className}>
          {isBack && (
            <i
              className={"fa fa-arrow-left h-5 w-5 mt-0.5 mr-2 cursor-pointer " + classNameI}
              onClick={() => {
                navi === 0 && navigate(-1);
              }}
            ></i>
          )}
          {Title} {showLoading && <Loadingbtn Title={titleshowLoading} />}
        </div>
      </div>
    );
  },
);

BreadcrumbsTitleComp.displayName = "BreadcrumbsTitleComp";

export const BreadcrumbsTitle = React.memo(BreadcrumbsTitleComp);

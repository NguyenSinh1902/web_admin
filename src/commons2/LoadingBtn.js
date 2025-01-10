import React from "react";
const LoadingbtnComp = React.forwardRef(({ Title = " Đang xử lý..." }, ref) => {
    return (
        <span className="font-normal text-sm">
            <i className="fas fa-spinner animate-spin fa-spin mr-1"></i> {Title}
        </span>
    );
});
export const Loadingbtn = React.memo(LoadingbtnComp);

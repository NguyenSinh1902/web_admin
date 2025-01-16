import { HeaderMobile } from "../commons/Sample/HeaderMobile";
import { BreadcrumbsTitle } from "../commons/Sample/BreadcrumbsTitle";

export const LayoutComponent = ({
    isBack = true, // có show nút back hay ko trên webview                                             => chỉ có tác dụng trên webview
    onReturnClick = () => {}, // action khi bấm nút back trên webview =>> chưa dùng tới

    titleMobile = "", // title                                                                         => chỉ có tác dụng ở màn hình nhỏ
    title = "CAK", // title hiển thị trên breadcrumbs ở trình duyệt, title trên webview                => tất cả
    showBreadcrumbsTitle = true, // an thanh breadcrumbs tren web                                      => chỉ có tác dụng trên trình duyệt, ko có tác dụng ở điện thoại
    rightLayoutMobile = null, // dùng để show các nút action  trên thanh breadcrumbs của trình duyệt   => chỉ có tác dụng trên trình duyệt điện thoại
    rightLayout = null, // dùng để show các nút action  trên thanh breadcrumbs của trình duyệt         => chỉ có tác dụng trên trình duyệt <> điện thoại

    isChild = false, // có phải là componetn con của 1 component cha nào ko
    modals = null, // là các model như : DragableModal,....
    children,
    contentRef, //ref
}) => {
    return (
        <>
            <div className={`!p-0 h-full ${!isChild && "md:h-full h-screen"}`}>
                <div
                    className={`h-full  w-full flex flex-col gap-2 md:gap-4 ${!isChild && "md:pt-4 pt-0 md:pb-4 pb-2"}`}
                >
                    {/* header moblie (an khi dung lap hoac pc hoac khi su dung webview ) */}
                    {!isChild && (
                        <HeaderMobile
                            title={titleMobile != "" ? titleMobile : title}
                            onreturnclick={() => {
                                onReturnClick();
                                navigate(-1);
                                try {
                                    window.ReactNativeWebView.postMessage("openkeyboard"); // mở lại footer
                                } catch (error) {}
                            }}
                            rightLayout={rightLayoutMobile}
                        />
                    )}
                    {/* an khi dung dien thoai */}
                    {showBreadcrumbsTitle && (
                        <div
                            className={` md:flex flex-col md:flex-row md:items-center  gap-4 md:gap-0 ${
                                !isChild && "md:px-4 px-0 hidden justify-between"
                            }`}
                        >
                            {!isChild && <BreadcrumbsTitle isBack={isBack} Title={title} />}
                            <div className={`flex flex-row justify-end gap-4 ${isChild && "w-full"}`}>
                                {rightLayout}
                            </div>
                        </div>
                    )}
                    <div
                        ref={contentRef}
                        className={`relative !rounded-none  ${
                            isChild ? "md:px-0" : "md:px-4"
                        } py-0  flex-grow overflow-auto `}
                    >
                        {children}
                    </div>
                </div>
                {modals}
            </div>
        </>
    );
};

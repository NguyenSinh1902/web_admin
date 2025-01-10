import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { ButtonClose, ButtonSave, ButtonConfirm, ButtonSearch } from "./Button";
import I18n from "i18n-js";
import useIsMobile from "../hooks/useIsMobile";

export const DragableModal = ({
    title = "",
    w = "w-[50%]",
    isOpen = false,
    onClose = () => {},
    showActionSave = false,
    onSave = () => {},
    showActionSearch = false,
    onSearch = () => {},
    showActionConfirm = false,
    onConfirm = () => {},
    actionConfirmName = "",
    actionSaveName = I18n.t("System.Lưu"),
    content = <></>,
    iconactionConfirm = "fas fa-save mr-2",
    margintop = "top-0",
    disabled = false,
    zIndex = 50,
}) => {
    const dragRef = useRef();
    const drawerRef = useRef();
    const isMobile = useIsMobile();
    const [CheckWithScreen, setCheckWithScreen] = useState(0);
    useEffect(() => {
        const dragHandle = dragRef.current;
        const drawerElement = drawerRef.current;
        let isResizing = false;
        let startX;
        let startWidth;

        const onMouseDown = (e) => {
            isResizing = true;
            startX = e.clientX;
            startWidth = drawerElement.offsetWidth;
        };

        const onMouseMove = (e) => {
            if (!isResizing) return;
            const width = startWidth - e.clientX + startX;
            drawerElement.style.width = `${Math.min(
                Math.max(window.innerWidth * 0.3, width),
                document.body.offsetWidth - 100,
            )}px`;
        };

        const onMouseUp = () => {
            isResizing = false;
        };
        setCheckWithScreen(window.innerWidth);
        dragHandle.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);

        return () => {
            dragHandle.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
    }, []);
    return (
        <div
            ref={drawerRef}
            className={` fixed !top-0 right-0 h-full ${isMobile ? "w-full" : w}  bg-white shadow-lg 
            transform transition-transform duration-300 ease-in-out 
            ${isOpen ? "translate-x-0" : "translate-x-full"} 
            select-none ${margintop} z-[${zIndex}]  flex`}
        >
            {isOpen && !isMobile && (
                <div
                    onClick={() => onClose(false)}
                    className=" shadow-md bg-white font-semibold text-xl  cursor-pointer absolute -left-12 z-0 py-4 px-5  text-gray-500 rounded-l-md"
                >
                    <i className="fas fa-chevron-right"></i>
                </div>
            )}
            {!isMobile && (
                <div ref={dragRef} className="relative w-2 cursor-ew-resize bg-transparent">
                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 w-auto h-48 bg-gray-400 rounded overflow-visible z-30"></div>
                </div>
            )}

            <Card className=" relative h-full w-full overflow-auto">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="flex m-0 items-center justify-between p-2 md:p-4 bg-transparent "
                >
                    <span className=" grow text-blue-500 text-lg font-bold uppercase">{title}</span>
                    <div className=" space-x-2">
                        {showActionSave && (
                            <ButtonSave
                                onClick={onSave}
                                buttonName={CheckWithScreen <= 430 ? "" : actionSaveName}
                                icon={iconactionConfirm}
                                disabled={disabled}
                            />
                        )}
                        {showActionConfirm && (
                            <ButtonConfirm
                                buttonName={CheckWithScreen <= 430 ? "" : actionConfirmName}
                                onClick={onConfirm}
                                icon={iconactionConfirm}
                                disabled={disabled}
                            />
                        )}
                        {showActionSearch && (
                            <ButtonSearch
                                buttonName={CheckWithScreen <= 430 ? "" : actionConfirmName}
                                icon={iconactionConfirm}
                                disabled={disabled}
                                onClick={onSearch}
                            />
                        )}
                        <ButtonClose
                            onClick={() => {
                                onClose(false);
                            }}
                            buttonName={CheckWithScreen <= 430 ? "" : I18n.t("System.Close", "Đóng")}
                        />
                    </div>
                </CardHeader>
                {isOpen && (
                    <CardBody
                        className={`p-1 lg:p-4 border-t border-gray-100 bg-white  rounded-b-lg overflow-y-auto max-h-screen h-full ${
                            isMobile && "no-scrollbar"
                        }`}
                    >
                        {content}
                    </CardBody>
                )}
            </Card>
        </div>
    );
};

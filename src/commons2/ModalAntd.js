import { Modal } from "antd";

export const ModalAntd = ({
    showCloseIcon = true,
    isOpen = false,
    onClose = () => {},
    title = "",
    className = "w-screen h-full ", // set độ rộng, cao cho modal: ex: w-1/2 h-1/2 || w-screen h-full
    children,
    footer = null,
    classNames = null,
}) => {
    return (
        <Modal
            closeIcon={showCloseIcon}
            classNames={
                classNames || {
                    content: "h-full flex flex-col !px-0 !py-6",
                    body: "flex-grow !px-5 overflow-y-auto",
                    header: "!px-5",
                }
            }
            className={`fix-Modal ${className}`}
            footer={footer}
            title={title}
            centered
            open={isOpen}
            onCancel={onClose}
        >
            {children}
        </Modal>
    );
};

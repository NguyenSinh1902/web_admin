import { FileImageOutlined, FilePdfOutlined } from "@ant-design/icons";
import { ModalAntd } from "./ModalAntd";

export const FileViewer = ({ fileUrl, isOpen, setIsOpen }) => {
    if (!fileUrl) return null;

    const fileType = fileUrl.split(".").pop().toLowerCase();

    return (
        <div className="flex flex-col items-center">
            {/* Modal hiển thị file */}
            <ModalAntd
                title="Xem File"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                footer={null}
                className="!w-[90%] max-h-[90%] h-full"
                bodyStyle={{
                    height: fileType === "pdf" ? 800 : "auto",
                    overflow: fileType === "pdf" ? "auto" : "visible",
                }}
                width={fileType === "pdf" ? "60%" : "50%"}
            >
                {fileType === "png" || fileType === "jpg" || fileType === "jpeg" ? (
                    <div className="flex flex-col items-center">
                        <FileImageOutlined className="text-4xl text-blue-500 mb-2" />
                        <img
                            src={fileUrl}
                            alt="Uploaded File"
                            className="w-full h-auto rounded-lg border border-gray-300"
                        />
                    </div>
                ) : fileType === "pdf" ? (
                    <div className="flex flex-col items-center">
                        <FilePdfOutlined className="text-4xl text-red-500 mb-2" />
                        <iframe
                            src={fileUrl}
                            className="w-full h-[700px] border rounded-lg"
                            title="PDF Viewer"
                        ></iframe>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">Không hỗ trợ loại file này.</p>
                )}
            </ModalAntd>
        </div>
    );
};

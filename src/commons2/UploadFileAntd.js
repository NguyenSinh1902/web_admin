import { Upload, message, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useRef } from "react";
import I18n from "i18n-js";
import { callApi, Show_IMAGES } from "../services";
import { FileViewer } from "./FileViewer";
import { ModalAntd } from "./ModalAntd";

const UploadFileAntdComp = ({
    onUploadSuccess,
    label = "Hình ảnh",
    isRequired = false,
    imageConfirm = "",
    fileType = ["pdf", "png", "jpg", "jpeg", "mp4"],
    showVideo = false,
    onFileUpload = () => {},
    onDeleteFile = () => {},
    isMultiple = false,
    title = "UPLOAD FILE",
}) => {
    const [uploadedFile, setUploadedFile] = useState("");
    const [openFileViewer, setOpenFileViewer] = useState(false);
    const [fileViewer, setFileViewer] = useState("");
    const videoRef = useRef(null); // Tham chiếu đến thẻ video

    useEffect(() => {
        setUploadedFile(imageConfirm?.trim() || "");
    }, [imageConfirm]);

    const handleBeforeUpload = async (file) => {
        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (!fileType.includes(fileExtension)) {
            message.error(`Định dạng file không hợp lệ. Chỉ chấp nhận: ${fileType.join(", ")}`);
            return false;
        }

        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const byteString = atob(e.target.result.split(",")[1]);
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([ab], { type: file.type });

                const formData = new FormData();
                formData.append("files", blob, `${Date.now()}.${fileExtension}`);

                const data = await callApi.UploadFiles_V2(formData);
                const fileUrl = data.replaceAll('"', "").replace("[", "").replace("]", "").split(";")[0];

                setUploadedFile(Show_IMAGES + fileUrl);

                onUploadSuccess?.(Show_IMAGES + fileUrl);
                onFileUpload?.(Show_IMAGES + fileUrl);

                message.success("Tải lên thành công");
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error(error);
            message.warning("Có lỗi khi upload file");
        }
        return false;
    };

    const handleDeleteFile = () => {
        setUploadedFile("");
        onDeleteFile?.("");
    };

    return (
        <div>
            {label && (
                <p className="font-medium text-gray-700 mb-1">
                    {label} {isRequired && <span className="text-red-500">*</span>}
                </p>
            )}

            {uploadedFile ? (
                <div className="relative w-full h-48 overflow-hidden rounded-lg border border-gray-300 flex items-center justify-center">
                    {uploadedFile.match(/\.(pdf)$/) ? (
                        <>
                            <span
                                onClick={() => {
                                    setOpenFileViewer(true);
                                    setFileViewer(Show_IMAGES + uploadedFile);
                                }}
                                className="text-blue-500 hover:underline ml-2 cursor-pointer"
                            >
                                {I18n.t("CMS.view")} file
                            </span>

                            {openFileViewer && (
                                <FileViewer
                                    fileUrl={fileViewer}
                                    isOpen={openFileViewer}
                                    setIsOpen={setOpenFileViewer}
                                />
                            )}
                        </>
                    ) : //  uploadedFile.match(/\.(mp4)$/) &&
                    showVideo ? (
                        <>
                            <button
                                onClick={() => setOpenFileViewer(true)}
                                className="text-blue-500 hover:underline ml-2 cursor-pointer"
                            >
                                {I18n.t("CMS.view")} Video
                            </button>

                            <ModalAntd
                                isOpen={openFileViewer}
                                className="!w-[90%] max-h-[90%] h-full"
                                onClose={() => {
                                    setOpenFileViewer(false);
                                    if (videoRef.current) {
                                        videoRef.current.pause(); // Dừng video khi modal đóng
                                    }
                                }}
                                footer={null}
                                centered
                            >
                                <video ref={videoRef} controls className="w-full">
                                    <source src={Show_IMAGES + uploadedFile} type="video/mp4" />
                                    Trình duyệt của bạn không hỗ trợ video.
                                </video>
                            </ModalAntd>
                        </>
                    ) : (
                        <Image src={uploadedFile} alt="Uploaded Image" className="w-full h-full object-cover" />
                    )}
                    <button
                        onClick={handleDeleteFile}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                    >
                        {I18n.t("TMS.Xóa")}
                    </button>
                </div>
            ) : (
                <Upload
                    accept={fileType.map((ext) => `.${ext}`).join(",")}
                    className="w-full block [&_.ant-upload]:!block [&_.ant-upload-select]:!block"
                    showUploadList={false}
                    beforeUpload={handleBeforeUpload}
                    multiple={isMultiple}
                >
                    <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange-500 transition-colors cursor-pointer h-48">
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                                <PlusOutlined className="text-orange-500 text-xl" />
                            </div>
                            <div className="text-center">
                                <p className="text-base font-medium text-gray-700">{title}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {I18n.t("System.Chấp nhận")}: {fileType.join(", ")}
                                </p>
                            </div>
                        </div>
                    </div>
                </Upload>
            )}
        </div>
    );
};

export const UploadFileAntd = React.memo(UploadFileAntdComp);

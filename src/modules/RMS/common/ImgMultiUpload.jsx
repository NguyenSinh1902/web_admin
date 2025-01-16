"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";

const ImgMutilUploadComp = ({
  data = "",
  onData = () => {},
  onImageUpload = () => {},
  flag = 0,
  isReset = 0,
  isMutil = false,
  readOnly = false,
  label = "Tải hình ảnh",
}) => {
  const inputRef = useRef(null);

  const [ImageUpload, setImageUpload] = useState([]); // Chứa các ảnh đã chọn
  const [i, setI] = useState([]); // Chứa các ảnh hiện tại đã lưu

  // Khi có thay đổi dữ liệu (ảnh đã có trước đó), cập nhật state
  useEffect(() => {
    if (data !== undefined) {
      const arr = data?.split(",").filter((p) => p !== "" && p !== "undefined");
      setI(arr);
    } else {
      setI([]);
    }
  }, [data]);

  // Khi có reset, xóa dữ liệu
  useEffect(() => {
    if (isReset !== 0) {
      inputRef.current.value = "";
      setImageUpload([]);
    }
  }, [isReset]);

  // Xóa các ảnh đã upload khi flag thay đổi
  useEffect(() => {
    if (flag === 1) {
      setImageUpload([]);
    }
  }, [flag]);

  // Hàm xử lý khi người dùng chọn file
  const handleChangeFileAndImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files); // Lấy danh sách file từ input

      let check = files.every((file) => {
        const exName = file.name.slice(
          (Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1
        );
        return ["jpg", "jpeg", "png", "gif"].includes(exName);
      });

      if (check) {
        if (!isMutil) {
          setI([]); // Nếu chỉ chọn 1 file thì clear các file trước
          setImageUpload(files);
        } else {
          setImageUpload((prev) => [...prev, ...files]); // Nếu chọn nhiều file
        }
        onImageUpload(files); // Gọi callback để lưu file
      } else {
        alert(
          'File không đúng định dạng! Vui lòng chọn lại file có định dạng "jpg", "jpeg", "png", "gif"'
        );
      }
    }
  };

  // Hàm gọi API để upload ảnh lên Cloudinary khi cần

  // Hàm xóa ảnh
  const onFileDelete = (filename) => {
    if (window.confirm("Bạn có chắc muốn xóa ảnh này?")) {
      const updatedFiles = i.filter((file) => file !== filename);
      setI(updatedFiles);
      onData(updatedFiles.join(","));
    }
  };

  return (
    <>
      <div className="form-group ">
        {!readOnly && (
          <>
            <label className="image-collapse-label2 flex items-center gap-2 w-full cursor-pointer ">
              <input
                type="file"
                className="image-collapse-file cursor-pointer hidden "
                onChange={handleChangeFileAndImage}
                accept="image/*"
                multiple={isMutil}
                ref={inputRef}
                readOnly={readOnly}
              />
              <div className="flex items-center gap-2 p-2 ">
                <img src="/assets/img/showimg.png" alt="" width={28} height={28} />
                <div className="text-gray-600 text-sm">{label}</div>
              </div>
            </label>
          </>
        )}

        {/* Hiển thị các ảnh đã chọn mà chưa upload */}
        <div className="grid grid-cols-4 gap-2">
          {ImageUpload.map((file, ix) => (
            <div className="shadow-lg relative rounded-sm p-2" key={ix}>
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="w-[200px] max-h-[150px] object-contain"
              />
              <i
                className="fa fa-times p-2 text-danger cursor-pointer absolute top-0 right-0 btn-curso"
                onClick={() =>
                  setImageUpload((prev) =>
                    prev.filter((_, index) => index !== ix)
                  )
                }
              ></i>
            </div>
          ))}
        </div>

        {/* Hiển thị các ảnh đã upload */}
        <div className="grid grid-cols-4 gap-2">
          {i.length > 0 &&
            i.map((item, ix) => (
              <div className="shadow-lg relative rounded-sm" key={ix}>
                <img
                  src={item}
                  alt=""
                  className="w-[200px] max-h-[150px] object-contain"
                />
                {!readOnly && (
                  <i
                    className="fa fa-times p-2 text-danger cursor-pointer absolute top-0 right-0 btn-cursor"
                    onClick={() => onFileDelete(item)}
                  ></i>
                )}
              </div>
            ))}
        </div>

        {/* Nút upload các ảnh đã chọn */}
      </div>
    </>
  );
};

export default ImgMutilUploadComp;

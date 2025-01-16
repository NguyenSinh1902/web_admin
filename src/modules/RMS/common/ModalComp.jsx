import { SaveOutlined, StopOutlined } from "@ant-design/icons";
import { Modal, Tabs } from "antd";
import React, { useState, useEffect, useRef } from "react";

const ModalComp = ({
  isOpen,
  onClose,
  children,
  title = "Thêm mới",
  onSave = () => {},
  width = 600,
  className = "",
}) => {
  return (
    // <div ref={drawerRef} className={`drawer ${isOpen ? 'open' : ''} d-flex flex-row`}>
    //     <div
    //         ref={dragRef}
    //         style={{
    //             width: '5px',
    //             backgroundColor: 'grey',
    //             cursor: 'ew-resize',
    //         }}
    //     ></div>
    //     <div className="drawer-container">
    //         <div class="d-flex align-items-center justify-content-between p-2 border" style={{ position: 'sticky', zIndex: 1000, top: 0, backgroundColor: 'white' }}>
    //             <h4 class="font-weight-bold text-success">{title}</h4>

    //             <div className="">
    //                 <button className="btn btn-success mr-2" onClick={onSave}>
    //                     <i className="fa fa-save pr-2 "></i>
    //                     Lưu
    //                 </button>
    //                 <button className="btn btn-danger " onClick={onClose}>
    //                     x
    //                 </button>
    //             </div>
    //         </div>
    //         <div className="drawer-content">{children}</div>
    //     </div>
    // </div>
    <Modal
      open={isOpen}
      width={width}
      footer={null}
      className={`${className} custom-modal`}
      title={<h2 className="text-xl font-semibold ">{title}</h2>}
      onCancel={onClose}
    >
      <div className="">
        <div className="drawer-content">{children}</div>

        <div className="p-4 flex items-center gap-2 justify-end  ">
          <button className="bg-green-600 text-white p-2 rounded-md flex items-center gap-1 text-sm font-normal">
            <SaveOutlined />
            Thêm mới
          </button>
          <button className="bg-red-600 text-white p-2 rounded-md flex items-center gap-1 text-sm font-normal">
            <StopOutlined />
            Hủy
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComp;
